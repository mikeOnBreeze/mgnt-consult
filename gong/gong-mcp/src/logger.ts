/**
 * Structured logger for Gong MCP server
 * All logs go to stderr (stdout reserved for MCP protocol)
 * Follows repo style: emoji prefixes, single-line JSON when appropriate
 */

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  level: LogLevel;
  event: string;
  [key: string]: unknown;
}

const EMOJI_MAP: Record<LogLevel, string> = {
  INFO: '🔧',
  WARN: '⚠️',
  ERROR: '❌',
};

export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private formatLog(level: LogLevel, event: string, meta?: Record<string, unknown>): string {
    const emoji = EMOJI_MAP[level];
    const entry: LogEntry = {
      level,
      event,
      ...meta,
    };

    // For simple messages without metadata, use human-readable format
    if (!meta || Object.keys(meta).length === 0) {
      return `${emoji} ${level} [${this.name}] ${event}`;
    }

    // For structured data, use single-line JSON
    return `${emoji} ${level} [${this.name}] ${JSON.stringify(entry)}`;
  }

  info(event: string, meta?: Record<string, unknown>): void {
    console.error(this.formatLog('INFO', event, meta));
  }

  warn(event: string, meta?: Record<string, unknown>): void {
    console.error(this.formatLog('WARN', event, meta));
  }

  error(event: string, meta?: Record<string, unknown>): void {
    console.error(this.formatLog('ERROR', event, meta));
  }

  // Redact sensitive fields from metadata before logging
  static redact(obj: Record<string, unknown>, sensitiveKeys: string[] = ['password', 'secret', 'key', 'token', 'authorization']): Record<string, unknown> {
    const redacted = { ...obj };
    for (const key of sensitiveKeys) {
      if (key in redacted) {
        redacted[key] = '[REDACTED]';
      }
    }
    return redacted;
  }

  // Log tool execution with timing
  logToolCall(tool: string, args: Record<string, unknown>, latencyMs: number, status: 'success' | 'error', error?: string): void {
    const meta: Record<string, unknown> = {
      tool,
      latencyMs: Math.round(latencyMs),
      status,
    };

    // Include relevant args (IDs only, never content)
    if ('callIds' in args && Array.isArray(args.callIds)) {
      meta.callIds = args.callIds;
    }
    if ('fromDateTime' in args) {
      meta.fromDateTime = args.fromDateTime;
    }
    if ('toDateTime' in args) {
      meta.toDateTime = args.toDateTime;
    }

    if (error) {
      meta.error = error;
      this.error(`Tool ${tool} failed`, meta);
    } else {
      this.info(`Tool ${tool} completed`, meta);
    }
  }
}

// Default logger instance
export const logger = new Logger('gong-mcp');
