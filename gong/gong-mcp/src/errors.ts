/**
 * Error handling and retry logic for Gong MCP server
 * Provides consistent error envelopes and exponential backoff
 */

import { logger } from './logger.js';

export interface McpError {
  code: string;
  message: string;
  retryAfter?: number;
}

export class GongMcpError extends Error {
  code: string;
  retryAfter?: number;

  constructor(code: string, message: string, retryAfter?: number) {
    super(message);
    this.name = 'GongMcpError';
    this.code = code;
    this.retryAfter = retryAfter;
  }

  toMcpError(): McpError {
    return {
      code: this.code,
      message: this.message,
      retryAfter: this.retryAfter,
    };
  }
}

export function formatErrorResponse(error: unknown): { content: Array<{ type: 'text'; text: string }>; isError: true } {
  if (error instanceof GongMcpError) {
    const errorObj = error.toMcpError();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorObj }, null, 2),
        },
      ],
      isError: true,
    };
  }

  const message = error instanceof Error ? error.message : String(error);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            error: {
              code: 'INTERNAL_ERROR',
              message,
            },
          },
          null,
          2
        ),
      },
    ],
    isError: true,
  };
}

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 10000;
const JITTER_FACTOR = 0.1;

function calculateBackoff(attempt: number): number {
  const exponential = Math.min(INITIAL_BACKOFF_MS * Math.pow(2, attempt), MAX_BACKOFF_MS);
  const jitter = exponential * JITTER_FACTOR * Math.random();
  return exponential + jitter;
}

function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    // Axios errors with retry-able status codes
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status) {
      const status = axiosError.response.status;
      // Retry on 429 (rate limit), 502, 503, 504 (transient server errors)
      return [429, 502, 503, 504].includes(status);
    }

    // Network errors
    const message = error.message.toLowerCase();
    if (
      message.includes('timeout') ||
      message.includes('econnreset') ||
      message.includes('enotfound') ||
      message.includes('network')
    ) {
      return true;
    }
  }

  return false;
}

function getRetryAfter(error: unknown): number | undefined {
  const axiosError = error as { response?: { headers?: { 'retry-after'?: string } } };
  const retryAfterHeader = axiosError.response?.headers?.['retry-after'];

  if (retryAfterHeader) {
    const seconds = parseInt(retryAfterHeader, 10);
    if (!isNaN(seconds)) {
      return seconds * 1000; // Convert to milliseconds
    }
  }

  return undefined;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  context: { name: string; meta?: Record<string, unknown> }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error)) {
        throw error;
      }

      if (attempt < MAX_RETRIES - 1) {
        const retryAfter = getRetryAfter(error);
        const backoffMs = retryAfter || calculateBackoff(attempt);

        logger.warn(`${context.name} failed, retrying`, {
          attempt: attempt + 1,
          maxRetries: MAX_RETRIES,
          backoffMs: Math.round(backoffMs),
          error: error instanceof Error ? error.message : String(error),
          ...context.meta,
        });

        await new Promise(resolve => setTimeout(resolve, backoffMs));
      }
    }
  }

  logger.error(`${context.name} failed after all retries`, {
    attempts: MAX_RETRIES,
    error: lastError instanceof Error ? lastError.message : String(lastError),
    ...context.meta,
  });

  throw lastError;
}

// Timeout wrapper with 30s default
export async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number = 30000,
  context?: string
): Promise<T> {
  return Promise.race([
    operation(),
    new Promise<T>((_, reject) =>
      setTimeout(() => {
        const message = context ? `Operation ${context} timed out after ${timeoutMs}ms` : `Operation timed out after ${timeoutMs}ms`;
        reject(new GongMcpError('TIMEOUT', message));
      }, timeoutMs)
    ),
  ]);
}
