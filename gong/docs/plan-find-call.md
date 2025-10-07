# find_call MCP Tool — Design Plan

## Goal
Enable one-shot retrieval of the “best matching” Gong call for a natural-language request (e.g., “Tripadvisor last week” or “DV360 working group from Friday”), then optionally return a compact brief/outline for handoff to downstream flows.


🚀 Lean Plan: Prompt-First Search + Simple Scoring

  You're absolutely right - the titles are already good! Let's use prompts to make the 
  LLM smart instead of overengineering the server.

  ---
  Approach: Prompt-Driven Multi-Query Search

  The Core Idea

  1. LLM generates search variations (via prompt guidance)
  2. MCP server does simple exact/substring matching + scoring
  3. LLM picks the winner from ranked results

  ---
  Phase 1: Smart Prompt Template

  File: src/prompts.ts (MODIFY)

  {
    name: "find-company-call",
    description: "Find a Gong call by company/topic using smart search strategies",
    arguments: [
      { name: "company", required: true },
      { name: "timeframe", required: false }
    ]
  }

  Prompt text (guides LLM behavior):
  To find a Gong call for "{company}" {timeframe}:

  1. Generate search variations:
     - Exact name: "{company}"
     - Common abbreviations: extract first letters (e.g., "Display & Video 360" →
  "DV360")
     - Email domain: "@{company}.com" (lowercase)
     - Brand variants: (e.g., "Disney" → "Disney+", "Hulu")

  2. Call find_call tool with EACH variation:
     find_call({query: "{company}", fromDateTime: "...", toDateTime: "..."})
     find_call({query: "DV360", ...})
     find_call({query: "@{company}.com", ...})

  3. Combine results, dedupe by callId, show top 5 ranked by:
     - Title exact match (highest)
     - Title contains query (high)
     - Participant email domain match (medium)
     - Recency (tiebreaker)

  4. If multiple matches with similar scores, ask user to disambiguate.

  Example queries to try:
  - "Disney" → also try "Disney+", "@disney.com", "DIS"
  - "Tripadvisor" → also try "@tripadvisor.com", "Trip Advisor"
  - "DV360" → also try "Display & Video 360", "@google.com", "GV360"

  Result: LLM automatically tries variations WITHOUT server code.

  ---
  Phase 2: Simple find_call Tool

  File: src/callFinder.ts (NEW, ~100 lines)

  interface FindCallArgs {
    query: string;
    fromDateTime?: string;
    toDateTime?: string;
    maxResults?: number;
  }

  interface ScoredCall {
    callId: string;
    title: string;
    started: string;
    participants: string[];
    score: number;
    matchReasons: string[];  // ["title-exact", "participant-domain"]
  }

  export async function findCall(
    args: FindCallArgs,
    gongClient: GongClient
  ): Promise<ScoredCall[]> {

    // 1. Fetch calls in window
    const timeWindow = parseTimeWindow(args.fromDateTime, args.toDateTime);
    const calls = await gongClient.listCalls(timeWindow.from, timeWindow.to);

    // 2. Score each call
    const scored = calls.map(call => {
      const score = scoreCallSimple(call, args.query);
      return {
        callId: call.id,
        title: call.title,
        started: call.started,
        participants: call.participants?.map(p => p.emailAddress) || [],
        score: score.total,
        matchReasons: score.reasons
      };
    });

    // 3. Sort by score, return top N
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, args.maxResults || 10);
  }

  function scoreCallSimple(call: GongCall, query: string): {total: number, reasons:
  string[]} {
    const q = query.toLowerCase().trim();
    const title = (call.title || '').toLowerCase();
    const participants = call.participants?.map(p => p.emailAddress?.toLowerCase()) ||
  [];

    let score = 0;
    const reasons: string[] = [];

    // Exact title match (case-insensitive)
    if (title === q) {
      score += 10;
      reasons.push('title-exact');
    }
    // Title contains query
    else if (title.includes(q)) {
      score += 5;
      reasons.push('title-contains');
    }
    // Title words match query words (e.g., "DV360" matches "Magnite-DV360 Working 
  Group")
    else if (title.split(/\s+/).some(word => word.includes(q))) {
      score += 3;
      reasons.push('title-word-match');
    }

    // Participant email domain match
    if (participants.some(email => email.includes(q))) {
      score += 4;
      reasons.push('participant-domain');
    }

    // Recency boost
    const daysAgo = daysSince(call.started);
    if (daysAgo <= 3) score += 2;
    else if (daysAgo <= 7) score += 1;

    return { total: score, reasons };
  }

  Key: Simple substring matching. No fuzzy logic (yet). Let the LLM handle variations.

  ---
  Phase 3: Add Tool to MCP Server

  File: src/index.ts (MODIFY, +50 lines)

  const FIND_CALL_TOOL: Tool = {
    name: "find_call",
    description: "Search Gong calls by query string (company name, keyword, email 
  domain). Returns ranked matches.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term (company, keyword, @domain.com)"
        },
        fromDateTime: { type: "string" },
        toDateTime: { type: "string" },
        maxResults: { type: "number", default: 10 }
      },
      required: ["query"]
    }
  };

  // In CallToolRequestSchema handler:
  case "find_call": {
    const results = await findCall(args, gongClient);
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ matches: results }, null, 2)
      }],
      isError: false
    };
  }

  ---
  Phase 4: Date Parser (Helper)

  File: src/dateParser.ts (NEW, ~60 lines)

  export function parseTimeWindow(from?: string, to?: string): {from: string, to: string}
   {
    // Default: last 7 days
    const now = new Date();
    const defaultFrom = new Date(now);
    defaultFrom.setDate(now.getDate() - 7);

    return {
      from: from || defaultFrom.toISOString(),
      to: to || now.toISOString()
    };
  }

  // Parse "last week", "Friday", etc. (optional Phase 2)
  export function parseRelativeDate(hint: string): {from: Date, to: Date} {
    const now = new Date();

    if (/last\s+week/i.test(hint)) {
      const from = new Date(now);
      from.setDate(now.getDate() - 7);
      return { from, to: now };
    }

    if (/yesterday/i.test(hint)) {
      const from = new Date(now);
      from.setDate(now.getDate() - 1);
      from.setHours(0, 0, 0, 0);
      const to = new Date(from);
      to.setHours(23, 59, 59, 999);
      return { from, to };
    }

    // Default: last 7 days
    return parseTimeWindow();
  }

  ---
  How It Works in Practice

  User: "Find my Disney call from last week"

  LLM (using find-company-call prompt):
  1. Tries: find_call({query: "Disney", fromDateTime: "2025-09-29T00:00:00Z"})
    - Returns: 3 matches (scores: 8, 5, 3)
  2. Tries: find_call({query: "Disney+"})
    - Returns: 1 match (score: 10)
  3. Tries: find_call({query: "@disney.com"})
    - Returns: 2 matches (scores: 7, 4)

  LLM dedupes by callId, picks highest score (10), returns:
  "Found your Disney+ Integration call from Oct 3rd. Here's the brief: ..."

  If ambiguous:
  "I found 3 Disney calls last week:
  1. Disney+ Integration (Oct 3, high confidence)
  2. Disney Ad Tech Review (Oct 1, medium confidence)
  3. Hulu Programmatic (Sep 30, low confidence)

  Which one?"

  ---
  Optional: Light Fuzzy Matching (Phase 5)

  Only if needed for typos ("Tripadvisro" → "Tripadvisor"):

  import leven from 'fastest-levenshtein';  // 6KB

  function fuzzyScore(call: GongCall, query: string): number {
    const distance = leven.distance(call.title.toLowerCase(), query.toLowerCase());
    const similarity = 1 - (distance / Math.max(call.title.length, query.length));

    if (similarity > 0.8) return 3;  // 80%+ match
    return 0;
  }

  Add to scoreCallSimple only if substring matching fails.

  ---
  Summary: Why This Works

  ✅ Prompt does the heavy lifting (synonym expansion, variations)✅ Server is simple
  (substring matching + scoring)✅ LLM handles disambiguation (shows alternatives, asks
  user)✅ No hard-coded company list (works for any company)✅ Fast (simple scoring, no
  complex NLP)

  Total code: ~210 lines across 3 files.

  ---
  Files Needed

  NEW:
  - src/callFinder.ts (~100 lines)
  - src/dateParser.ts (~60 lines)

  MODIFY:
  - src/index.ts (+50 lines for find_call tool)
  - src/prompts.ts (+30 lines for find-company-call prompt)

  TOTAL: ~240 lines

  Ready to build? 🚀

  -------
# OLD PLAN

## Primary User Stories
- As a user, I can say “Pull my Tripadvisor meeting from last week” and get the top call plus summary.
- As a PM/exec, I can ask “Find the DV360 working group call from last week” and receive the best match with confidence and quick context.
- As an agent, I can pass hints (participant emails, keywords) to increase precision without manually paging results.

## Inputs
- query: free text (company, initiative, product, nickname) e.g., "Tripadvisor last week", "DV360 working group".
- fromDateTime / toDateTime: ISO windows; default last 7 days if omitted.
- hints (optional):
  - participants: emails or domains to bias ranking (e.g., ["@tripadvisor.com", "nick@magnite.com"]).
  - includeKeywords: explicit keywords to boost (e.g., ["DV360","Display & Video 360"]).
  - excludePrivate: boolean (default true) to avoid private calls.
  - scope: e.g., External | Internal | All (default: All).
  - maxResults: integer (default 25).

## Output
```json
{
  "resolved": true,
  "callId": "7264530111852323899",
  "confidence": 0.86,
  "rankingFeatures": {
    "titleExact": true,
    "titleKeywordHits": ["DV360"],
    "participantDomainHits": ["@google.com"],
    "entitiesHits": ["Live"],
    "recencyBoostDays": 3,
    "hasTranscript": true,
    "durationSeconds": 1804
  },
  "brief": { /* optional compact brief */ },
  "outline": { /* optional compact outline */ },
  "alternatives": [
    { "callId": "...", "confidence": 0.62, "title": "...", "started": "..." }
  ]
}
```

## Building Blocks (existing MCP)
- search_calls: free-text + date window + optional keyword filters.
- get_call_assets or get_call_brief / get_call_outline: enrich selected candidates.
- list_calls: pagination fallback when search is broad or empty.

## Strategy
1) Normalize + extract signals from query:
   - Tokens, quoted phrases, date hints ("yesterday", "last week", weekday names).
   - Company/product synonyms (e.g., DV360 | DB360 | Display & Video 360 | GV360; TripAdvisor | Tripadvisor).
   - Participant-like tokens (emails, domains).
2) Build one or more search_calls queries:
   - Primary: title/participants with includeKeywords from synonyms.
   - If 0 results: widen the time window (→ 2 weeks → 4 weeks) and relax keyword set.
3) Score candidates using weighted features:
   - Title exact/phrase match (strong weight).
   - Title keyword hits (moderate).
   - Participant domain/email hits (moderate).
   - Entities/trackers (if available via assets) keyword hits (moderate-low).
   - Recency within window (decaying boost).
   - Duration ≥ 10 min and hasTranscript flags (small boosts).
4) If top scores are close or < threshold:
   - Enrich top K (e.g., K=5) with get_call_assets; rescore using entities/topics.
5) Return the winner with confidence and top alternatives; optionally include compact brief/outline for UX immediacy.

## Scoring Heuristics (initial weights)
- titleExact: +5.0
- titleKeyword: +3.0 per unique keyword
- participantDomain/email: +3.0 per matched hint
- entityKeyword: +1.5 per unique keyword
- recencyBoost: +0.5 if ≤ 3 days old, +0.25 if ≤ 7 days, else 0
- durationBoost: +0.5 if ≥ 600s
- transcriptBoost: +0.25 if hasTranscript=true
- penaltyNoMatches: −10 if zero hits across title/keywords/participants

Confidence = sigmoid(sum(weights)) bounded [0,1]. Threshold (e.g., 0.6) to decide if resolved; otherwise return alternatives and a prompt to refine.

## Pseudocode
```pseudo
function find_call(input):
  window = resolveWindow(input.fromDateTime, input.toDateTime, default=last7Days)
  synonyms = expandSynonyms(input.query, input.includeKeywords)
  participantHints = extractParticipants(input.query) ∪ input.participants

  candidates = search_calls({
    query: buildQueryString(input.query, synonyms),
    fromDateTime: window.from,
    toDateTime: window.to,
    includeKeywords: synonyms.keywords,
    scope: input.scope
  })

  if empty(candidates):
    for widened in [last14Days, last28Days]:
      candidates = search_calls({...window: widened, includeKeywords: synonyms.relaxed})
      if not empty(candidates): break

  scored = []
  for call in head(candidates, input.maxResults or 25):
    s = baseScore(call, synonyms, participantHints)
    scored.append({call, score: s})

  top = topK(scored, 5)
  if needEnrichment(top):
    assets = get_call_assets({ callIds: ids(top) })
    rescored = rescoreWithEntities(top, assets, synonyms, participantHints)
    top = topK(rescored, 5)

  winner = top[0]
  confidence = sigmoid(winner.score)
  if confidence < 0.6:
    return { resolved: false, alternatives: summarize(top) }

  briefOutline = maybeFetchBriefOutline(winner.call)
  return {
    resolved: true,
    callId: winner.call.id,
    confidence,
    rankingFeatures: winner.features,
    brief: briefOutline.brief,
    outline: briefOutline.outline,
    alternatives: summarize(top[1:])
  }
```

## Synonym & Alias Map (seed)
- DV360: ["DV360","DB360","Display & Video 360","GV360"]
- TripAdvisor: ["Tripadvisor","Trip Advisor"]
- Disney: ["Disney","DIS","Disney+","Hulu" (contextual)]
- Common domains: google.com (DV360), magnite.com, tripadvisor.com, amazon.com

Note: Keep map small and maintainable; allow external injection via config.

## Edge Cases
- Empty transcript but non-empty brief/outline (common): don’t penalize too hard; rely on brief/entities.
- Multiple near-duplicates in the window: return winner + top alternatives with clear titles/times.
- Private/internal calls: respect excludePrivate flag.
- Very short calls (< 5 min): small penalty unless strong title exact match.

## Errors & Resilience
- Timeouts/rate limits: retry with backoff; cap total wall time (e.g., 10s).
- Partial data: proceed with available fields; degrade gracefully.
- Logging: emoji-prefixed structured logs, no PII.

## Acceptance Criteria
- Given “DV360 last week”, tool returns `7264530111852323899` with confidence ≥ 0.7 and includes brief title "Magnite-DV360 Working Group: Live & Formats".
- Given “Tripadvisor last week”, returns the top TripAdvisor call within the window with confidence ≥ 0.6 or provides 3 alternatives if < 0.6.
- Widening works: if no results in 7 days, retries 14 then 28 days.
- Ranking explains itself via `rankingFeatures` (title/keyword/participant hits, recency, duration, transcript).

## Example Requests
```json
{
  "tool": "find_call",
  "args": {
    "query": "Tripadvisor last week",
    "scope": "External",
    "participants": ["@tripadvisor.com"],
    "maxResults": 25
  }
}
```

```json
{
  "tool": "find_call",
  "args": {
    "query": "DV360 working group Friday",
    "includeKeywords": ["DV360","Display & Video 360"],
    "fromDateTime": "2025-09-29T00:00:00Z",
    "toDateTime": "2025-10-05T23:59:59Z"
  }
}
```

## Implementation Notes
- Start as a resolver inside the MCP server that orchestrates existing tools.
- Keep `maxResults` small to minimize API calls; enrich only top K.
- Return compact brief/outline objects (trim heavy fields) for responsiveness.
- Make synonym map injectable/configurable; ship with a small default.

## Testing
- Golden tests with static fixtures (DV360 call → id 7264530111852323899).
- Fuzzy tests where title variants/aliases still resolve.
- Negative tests: zero results → returns alternatives + guidance.

## Future Extensions
- Trend finder: search + aggregate trackers/entities over a window to output an exec summary with top topics, objections, and next steps.
- Learning-to-rank: persist feedback on chosen calls to tune weights.


