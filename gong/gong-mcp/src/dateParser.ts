/**
 * Date parsing utilities for find_call tool
 * Handles relative dates like "last week", "yesterday", "Friday", etc.
 */

/**
 * Parse time window with defaults
 * @param from ISO datetime string (optional)
 * @param to ISO datetime string (optional)
 * @returns Object with from/to ISO datetime strings (defaults to last 7 days)
 */
export function parseTimeWindow(from?: string, to?: string): { from: string; to: string } {
  const now = new Date();
  const defaultFrom = new Date(now);
  defaultFrom.setDate(now.getDate() - 7);

  return {
    from: from || defaultFrom.toISOString(),
    to: to || now.toISOString(),
  };
}

/**
 * Parse relative date hints like "last week", "yesterday", etc.
 * @param hint Natural language date hint
 * @returns Object with from/to Date objects
 */
export function parseRelativeDate(hint: string): { from: Date; to: Date } {
  const now = new Date();

  // Last week (7 days ago to now)
  if (/last\s+week/i.test(hint)) {
    const from = new Date(now);
    from.setDate(now.getDate() - 7);
    return { from, to: now };
  }

  // Yesterday (full day)
  if (/yesterday/i.test(hint)) {
    const from = new Date(now);
    from.setDate(now.getDate() - 1);
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  }

  // Last 3 days
  if (/last\s+3\s+days/i.test(hint)) {
    const from = new Date(now);
    from.setDate(now.getDate() - 3);
    return { from, to: now };
  }

  // Last month
  if (/last\s+month/i.test(hint)) {
    const from = new Date(now);
    from.setMonth(now.getMonth() - 1);
    return { from, to: now };
  }

  // This week (Monday 00:00 to now)
  if (/this\s+week/i.test(hint)) {
    const from = new Date(now);
    const dayOfWeek = from.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, Monday = 1
    from.setDate(from.getDate() - daysToMonday);
    from.setHours(0, 0, 0, 0);
    return { from, to: now };
  }

  // Today
  if (/today/i.test(hint)) {
    const from = new Date(now);
    from.setHours(0, 0, 0, 0);
    return { from, to: now };
  }

  // Default: last 7 days
  const defaultFrom = new Date(now);
  defaultFrom.setDate(now.getDate() - 7);
  return { from: defaultFrom, to: now };
}

/**
 * Calculate days since a given ISO datetime string
 * @param isoDate ISO datetime string
 * @returns Number of days since the date
 */
export function daysSince(isoDate: string): number {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
