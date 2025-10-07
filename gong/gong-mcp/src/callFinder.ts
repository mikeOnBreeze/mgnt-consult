/**
 * Call finder with simple substring scoring
 * Supports natural language queries like "Disney last week"
 */

import { parseTimeWindow, daysSince } from './dateParser.js';
import { logger } from './logger.js';

// Type definitions
export interface FindCallArgs {
  query: string;
  fromDateTime?: string;
  toDateTime?: string;
  maxResults?: number;
}

export interface ScoredCall {
  callId: string;
  title: string;
  started: string;
  participants: string[];
  score: number;
  matchReasons: string[];
}

interface GongCall {
  id: string;
  title: string;
  scheduled?: string;
  started?: string;
  duration?: number;
  direction?: string;
  system?: string;
  scope?: string;
  media?: string;
  language?: string;
  url?: string;
}

interface GongListCallsResponse {
  calls: GongCall[];
}

interface GongClient {
  listCalls(fromDateTime?: string, toDateTime?: string): Promise<GongListCallsResponse>;
}

/**
 * Score a single call against a query using simple substring matching
 */
function scoreCallSimple(call: GongCall, query: string): { total: number; reasons: string[] } {
  const q = query.toLowerCase().trim();
  const title = (call.title || '').toLowerCase();

  let score = 0;
  const reasons: string[] = [];

  // Title exact match (case-insensitive)
  if (title === q) {
    score += 10;
    reasons.push('title-exact');
  }
  // Title contains query
  else if (title.includes(q)) {
    score += 5;
    reasons.push('title-contains');
  }
  // Title words match query words (e.g., "DV360" matches "Magnite-DV360 Working Group")
  else {
    const titleWords = title.split(/\s+/);
    const queryWords = q.split(/\s+/);

    // Check if any title word contains any query word
    const hasWordMatch = titleWords.some(titleWord =>
      queryWords.some(queryWord => titleWord.includes(queryWord))
    );

    if (hasWordMatch) {
      score += 3;
      reasons.push('title-word-match');
    }
  }

  // Recency boost
  if (call.started) {
    const daysAgo = daysSince(call.started);
    if (daysAgo <= 3) {
      score += 2;
      reasons.push('recency-3days');
    } else if (daysAgo <= 7) {
      score += 1;
      reasons.push('recency-7days');
    }
  }

  return { total: score, reasons };
}

/**
 * Find and rank calls matching a query
 * @param args Search arguments (query, time window, max results)
 * @param gongClient Gong API client
 * @returns Scored and ranked calls
 */
export async function findCall(
  args: FindCallArgs,
  gongClient: GongClient
): Promise<ScoredCall[]> {
  const startTime = Date.now();

  // 1. Parse time window (defaults to last 7 days)
  const timeWindow = parseTimeWindow(args.fromDateTime, args.toDateTime);

  logger.info('Finding calls', {
    query: args.query,
    from: timeWindow.from,
    to: timeWindow.to,
    maxResults: args.maxResults || 10,
  });

  // 2. Fetch calls in window
  const response = await gongClient.listCalls(timeWindow.from, timeWindow.to);
  const calls = response.calls || [];

  logger.info('Fetched calls', {
    count: calls.length,
    latencyMs: Date.now() - startTime,
  });

  // 3. Score each call
  const scored: ScoredCall[] = calls.map(call => {
    const scoreResult = scoreCallSimple(call, args.query);

    return {
      callId: call.id,
      title: call.title,
      started: call.started || call.scheduled || '',
      participants: [], // Will be enriched by get_call_assets if needed
      score: scoreResult.total,
      matchReasons: scoreResult.reasons,
    };
  });

  // 4. Sort by score (highest first), then by recency (most recent first)
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tiebreaker: more recent calls first
    return b.started.localeCompare(a.started);
  });

  // 5. Return top N results
  const maxResults = args.maxResults || 10;
  const results = scored.slice(0, maxResults);

  logger.info('Scored calls', {
    query: args.query,
    totalCalls: calls.length,
    scoredCalls: scored.filter(c => c.score > 0).length,
    topScore: results[0]?.score || 0,
    returnedCount: results.length,
    latencyMs: Date.now() - startTime,
  });

  return results;
}

/**
 * Type guard for FindCallArgs
 */
export function isFindCallArgs(args: unknown): args is FindCallArgs {
  return (
    typeof args === 'object' &&
    args !== null &&
    'query' in args &&
    typeof (args as FindCallArgs).query === 'string' &&
    (!('fromDateTime' in args) || typeof (args as FindCallArgs).fromDateTime === 'string') &&
    (!('toDateTime' in args) || typeof (args as FindCallArgs).toDateTime === 'string') &&
    (!('maxResults' in args) || typeof (args as FindCallArgs).maxResults === 'number')
  );
}
