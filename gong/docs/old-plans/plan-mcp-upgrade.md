## MCP Upgrade Plan — Get Call Brief + Outline

### Goals
- Add two new MCP tools that return structured, ready-to-use metadata beyond the raw transcript:
  - `get_call_brief`: A compact brief for one or more calls (recap, key points, next steps, entities, tracker hits, source links).
  - `get_call_outline`: A hierarchical, timestamped outline summarizing the call flow (sections, bullets, action items, participants).

### Scope and Assumptions
- We will use Gong’s `POST /v2/calls/transcript` as the primary source. Our tenant returns:
  - `interactionsSummary` (brief-like recap/sections)
  - `entities` (named entities, topics)
  - `trackers` (tracker matches and timestamps)
- If `interactionsSummary` is missing for a call, we will degrade gracefully by deriving a lightweight outline from sentences + trackers. We will not invoke LLMs within MCP for V1.
- No changes to auth: continue using `Authorization: Basic ...` and `X-Gong-*` signature headers as implemented.

### Transcript-Absent Retrieval Strategy (Critical)
Some calls do not expose transcript blocks, yet still surface outlines/briefs in Gong’s UI. To ensure coverage, we will:

1) Prefer summary-first fetch when transcript is absent
   - Attempt `POST /v2/calls/transcript` as today.
   - If `transcripts.length === 0`, still parse the response body for non-transcript fields (some tenants return `interactionsSummary`, `entities`, `trackers` even when sentence blocks are not present). Extract briefs/outlines from those fields.

2) Add a summaries-only endpoint path (if available in tenant docs)
   - Investigate availability of any of the following (names indicative):
     - Call analytics/summary endpoint returning sections/recap without raw sentences
     - Comments/scorecards endpoints for decisions/next steps enrichment
     - Tracker catalog lookup for context labels
   - Confirmed `/v2/calls/extensive` with `contentSelector.exposedFields.content.{brief,keyPoints,outline,trackers,topics}` returns rich summaries even when transcripts are empty; use as summary-first data source.
   - If present, add a secondary client method: `retrieveSummaries(callIds: string[])` used as a fallback when transcripts are empty.

3) Outline synthesis without transcripts
   - When neither transcript sentences nor `interactionsSummary` are available, construct a minimal outline using:
     - Call metadata from `GET /v2/calls` (title, time, participants if available)
     - Tracker hits (names + timestamps) as section anchors
     - Entities as topic chips
   - This yields a non-empty outline object so downstream UIs don’t break; clearly flag `derived: true`.

4) Tool behavior changes
   - `get_call_brief`:
     - Returns `source: 'summary-only' | 'transcript+summary' | 'derived'` and `hasTranscript: boolean`.
   - `get_call_outline`:
     - Same flags; ensures at least one section when trackers/entities exist or a metadata-only section otherwise.

5) Acceptance criteria updates
   - For calls with no transcript but with summaries available: both tools return populated objects (recap or at least sections based on trackers/entities).
   - For calls with neither transcript nor summaries: tools return a metadata-derived outline with clear `derived: true` and no failures.
   - Dashboard can display badges: “Summary-only”, “Derived outline”, “Rich (Transcript)”.

### Deliverables
1) MCP tools (server additions in `gong-mcp`):
   - `get_call_brief({ callIds: string[] })` → returns normalized per-call brief objects
   - `get_call_outline({ callIds: string[] })` → returns normalized per-call outline objects
2) Optional CLI helpers (scripts):
   - `scripts/getBrief.js <CALL_ID>` → writes `gong/transcripts/<CALL_ID>.brief.json`
   - `scripts/getOutline.js <CALL_ID>` → writes `gong/transcripts/<CALL_ID>.outline.json`
3) Docs updates:
   - `gong/gong-mcp/README.md` (new tools + examples)
   - `Gong-dash-docs.md` (how dashboard should render briefs/outlines)

### Data Shapes (V1)
- Brief (per call):
  - `callId: string`
  - `title?: string`
  - `recap?: string`
  - `keyPoints?: string[]` (3–10 bullets)
  - `nextSteps?: string[]`
  - `entities?: { type: string; value: string }[]`
  - `trackers?: { name: string; matches: { start: number; end?: number; text?: string }[] }[]`
  - `links?: { kind: 'call' | 'page'; url: string }[]`

- Outline (per call):
  - `callId: string`
  - `title?: string`
  - `participants?: { id?: string; name?: string; role?: string }[]`
  - `sections: { heading: string; start?: number; end?: number; bullets?: string[] }[]`
  - `actionItems?: { text: string; assignee?: string; due?: string; start?: number }[]`
  - `topics?: string[]` (from trackers/entities)

### Extraction Strategy
- Source payload: `POST /v2/calls/transcript` with flags:
  - `includeInteractionsSummary: true`
  - `includeEntities: true`
  - `includeTrackers: true`
- Brief mapping:
  - `recap`: primary paragraph or summary from `interactionsSummary` (if present)
  - `keyPoints`: top bullets/sections from `interactionsSummary`
  - `nextSteps`: decisions / follow-ups parsed from `interactionsSummary` or sentences containing common action phrases (fallback)
  - `entities`: normalized from `entities` block
  - `trackers`: passthrough with matched spans/timestamps
  - `links`: construct call URL from `callId` if available in `listCalls()` data; otherwise omit
- Outline mapping:
  - `sections`: use headings/segments from `interactionsSummary` when present; else synthesize by grouping sentences around tracker hits and temporal buckets (e.g., 0–5 min intro, etc.)
  - `actionItems`: from summary/action bullets; fallback by regex on sentences (e.g., “we will”, “next step”, “action”, “assign”) — conservative V1
  - `participants`: populate if `list_calls` provides participant info in your tenant; otherwise omit
  - `topics`: unique tracker names + top entity labels

### Server Changes (gong/gong-mcp)
1) Add normalization utilities under `src/` (e.g., `normalize.ts`):
   - `buildBriefFromTranscript(apiResponse)`
   - `buildOutlineFromTranscript(apiResponse)`
   - Keep pure, side-effect free; input = Gong response; output = our V1 shapes

2) Extend client (reuse existing):
   - Continue using `retrieveTranscripts(callIds: string[])` — already sets needed flags

3) Add tools:
   - `get_call_brief` tool
     - Input: `{ callIds: string[] }`
     - Output: `{ briefs: Brief[] }`
   - `get_call_outline` tool
     - Input: `{ callIds: string[] }`
     - Output: `{ outlines: Outline[] }`

4) Handlers:
   - Fetch once per tool call and transform with the utility functions
   - Validate inputs; return structured JSON (pretty-printed text payloads for MCP response)

### Scripts (optional, for dev/ops)
- `scripts/getBrief.js`:
  - Calls `POST /v2/calls/transcript` (same signing), runs `buildBriefFromTranscript`, writes `gong/transcripts/<id>.brief.json`
- `scripts/getOutline.js`:
  - Same as above, writes `gong/transcripts/<id>.outline.json`
- Logging: prefix with emojis per repo rule (e.g., `🔎`, `✅`, `💾`, `❌`).

### Dashboard Hooks (future)
- Brief card: title, recap, 3–6 bullets, next steps, tracker chips, link to Gong
- Outline view: left sidebar sections (with timestamps), main pane shows bullets; jump-to-time support
- Styling per `magnite-style-guide.md`

### Rate Limits & Reliability
- Respect 3 rps / 10k day
- On 429, honor `Retry-After` and backoff
- Timeouts: 15–30s; retry idempotent reads
- Degrade gracefully when `interactionsSummary` absent

### Security & Config
- Env vars: `GONG_ACCESS_KEY`, `GONG_ACCESS_SECRET`
- Keep secrets out of VCS; `.env` local only
- Same signature headers as existing client

### Acceptance Criteria
- `get_call_brief` returns non-empty objects for calls that have `interactionsSummary`
- `get_call_outline` returns at least 2 sections when summaries exist, else a fallback outline grouped by time/tracker clusters
- CLI scripts save JSON files to `gong/transcripts/` with correct filenames
- README documents both tools and example invocations

### Open Questions
- Confirm whether our tenant exposes participants via `GET /calls` and if call-page URLs can be built reliably per callId
- Verify presence/shape of `interactionsSummary` across calls; define safe fallbacks
- Consider adding `list_trackers`, `get_call_comments`, `get_call_scorecards` later for richer briefs

### Implementation Steps & Timeline (V1)
1) Utilities + Shapes (0.5 day)
2) Tool handlers + schemas (0.5 day)
3) CLI scripts + logging (0.25 day)
4) README/docs updates (0.25 day)
5) Dry run on 2–3 real callIds; adjust mappings (0.25 day)

### Rollout
- Ship MCP tools first (consumed by agent)
- Add persistence via scripts (optional)
- Prioritize dashboard rendering next


### Implementation Notes -- 2025-10-06
- Added normalization utilities to synthesize briefs/outlines using `/v2/calls/transcript` data plus `/v2/calls/extensive` content selectors (brief, keyPoints, outline, trackers, topics).
- Implemented MCP tools `get_call_brief` and `get_call_outline`; each returns source flags (`summary-only`, `transcript+summary`, `derived`) and respects transcript-absent fallbacks.
- Integrated fallback heuristics: 5-minute transcript buckets, tracker-derived metadata sections, and action-item sniffing when summaries are missing.
- Updated `gong/gong-mcp/README.md` with new tool descriptions and sample payloads.
 - Ran CLI helpers from `gong/gong-mcp/` to ensure dotenv loads `.env`. Generated artifacts for call `4424082687121865095`:
   - `gong/transcripts/4424082687121865095.outline.json`
   - `gong/transcripts/4424082687121865095.brief.json`

### Implementation Notes — Cursor MCP Config (2025-10-06)
- Cursor expects project-level MCP config as an object with `mcpServers`.
- Our Gong server entry lives under `mcpServers.gong` with `command`, `args`, and `env`.
- Example applied in this repo: `.cursor/mcp.json` now contains `{ "mcpServers": { "gong": { command: "node", args: ["/Users/breez/openai-demo/Magnite/gong/gong-mcp/dist/index.js"], env: { GONG_ACCESS_KEY, GONG_ACCESS_SECRET } } } }`.
- This resolves the error: "Invalid config: mcpServers must be an object".

### Implementation Notes — MCP dotenv preload (2025-10-06)
- Project config now preloads dotenv: Node is launched with `-r dotenv/config`.
- `DOTENV_CONFIG_PATH` points to `/Users/breez/openai-demo/Magnite/gong/gong-mcp/.env` so the Gong server can start from any CWD.
- Secrets no longer live in `.cursor/mcp.json`.
