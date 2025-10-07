#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  InitializeRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import {
  buildBrief,
  buildOutline,
  CallBrief,
  CallOutline,
  CallContext,
  GongCallData,
  GongTranscriptMonologue,
  InteractionsSummaryPayload,
  GongTrackerEntry,
  GongTopicEntry,
} from './normalizers.js';
import { logger } from './logger.js';
import { formatErrorResponse, withRetry, withTimeout, GongMcpError } from './errors.js';
import { RESOURCE_TEMPLATES, readResource, parseResourceUri } from './resources.js';
import { PROMPTS, getPrompt } from './prompts.js';
import { findCall, isFindCallArgs } from './callFinder.js';

// Redirect all console output to stderr
const originalConsole = { ...console };
console.log = (...args) => originalConsole.error(...args);
console.info = (...args) => originalConsole.error(...args);
console.warn = (...args) => originalConsole.error(...args);

dotenv.config();

const GONG_API_URL = 'https://api.gong.io/v2';
const GONG_ACCESS_KEY = process.env.GONG_ACCESS_KEY;
const GONG_ACCESS_SECRET = process.env.GONG_ACCESS_SECRET;

// Check for required environment variables
if (!GONG_ACCESS_KEY || !GONG_ACCESS_SECRET) {
  console.error("Error: GONG_ACCESS_KEY and GONG_ACCESS_SECRET environment variables are required");
  process.exit(1);
}

// Type definitions
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

interface GongCallTranscriptBlock {
  callId?: string;
  transcript?: GongTranscriptMonologue[];
  interactionsSummary?: InteractionsSummaryPayload | null;
  trackers?: GongTrackerEntry[];
  topics?: GongTopicEntry[];
}

interface GongRetrieveTranscriptsResponse {
  callTranscripts?: GongCallTranscriptBlock[];
  transcripts?: GongTranscriptMonologue[];
  interactionsSummary?: InteractionsSummaryPayload[];
  trackers?: Array<{
    callId?: string;
    trackers?: GongTrackerEntry[];
    tracker?: GongTrackerEntry;
  }>;
  topics?: Array<{
    callId?: string;
    topics?: GongTopicEntry[];
  }>;
}

interface GongCallsExtensiveResponse {
  calls?: GongCallData[];
}

type TrackerBlock = NonNullable<GongRetrieveTranscriptsResponse['trackers']>[number];
type TopicBlock = NonNullable<GongRetrieveTranscriptsResponse['topics']>[number];

interface GongListCallsArgs {
  [key: string]: string | undefined;
  fromDateTime?: string;
  toDateTime?: string;
}

interface GongRetrieveTranscriptsArgs {
  callIds: string[];
}

// Gong API Client
class GongClient {
  private accessKey: string;
  private accessSecret: string;

  constructor(accessKey: string, accessSecret: string) {
    this.accessKey = accessKey;
    this.accessSecret = accessSecret;
  }

  private async generateSignature(method: string, path: string, timestamp: string, params?: unknown): Promise<string> {
    const stringToSign = `${method}\n${path}\n${timestamp}\n${params ? JSON.stringify(params) : ''}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.accessSecret);
    const messageData = encoder.encode(stringToSign);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      messageData
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }

  private async request<T>(method: string, path: string, params?: Record<string, string | undefined>, data?: Record<string, unknown>): Promise<T> {
    const timestamp = new Date().toISOString();
    const url = `${GONG_API_URL}${path}`;
    
    const response = await axios({
      method,
      url,
      params,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${this.accessKey}:${this.accessSecret}`).toString('base64')}`,
        'X-Gong-AccessKey': this.accessKey,
        'X-Gong-Timestamp': timestamp,
        'X-Gong-Signature': await this.generateSignature(method, path, timestamp, data || params)
      }
    });

    return response.data as T;
  }

  async listCalls(fromDateTime?: string, toDateTime?: string): Promise<GongListCallsResponse> {
    const params: GongListCallsArgs = {};
    if (fromDateTime) params.fromDateTime = fromDateTime;
    if (toDateTime) params.toDateTime = toDateTime;

    return this.request<GongListCallsResponse>('GET', '/calls', params);
  }

  async retrieveTranscripts(callIds: string[]): Promise<GongRetrieveTranscriptsResponse> {
    return this.request<GongRetrieveTranscriptsResponse>('POST', '/calls/transcript', undefined, {
      filter: {
        callIds,
        includeEntities: true,
        includeInteractionsSummary: true,
        includeTrackers: true
      }
    });
  }

  async retrieveCallDetails(callIds: string[]): Promise<GongCallsExtensiveResponse> {
    return this.request<GongCallsExtensiveResponse>('POST', '/calls/extensive', undefined, {
      filter: {
        callIds,
      },
      contentSelector: {
        exposedFields: {
          content: {
            brief: true,
            keyPoints: true,
            outline: true,
            trackers: true,
            topics: true,
            highlights: true,
          },
          parties: true,
        },
      },
    });
  }
}

const gongClient = new GongClient(GONG_ACCESS_KEY, GONG_ACCESS_SECRET);

function dedupeCallIds(callIds: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const id of callIds) {
    const normalized = String(id);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(normalized);
  }
  return unique;
}

function asString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return undefined;
}

function arrayOf<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }
  if (value === undefined || value === null) {
    return [];
  }
  return [value as T];
}

async function gatherCallContexts(callIds: string[]): Promise<Map<string, CallContext>> {
  const uniqueIds = dedupeCallIds(callIds);
  const [transcriptsResp, detailsResp] = await Promise.all([
    gongClient.retrieveTranscripts(uniqueIds),
    gongClient.retrieveCallDetails(uniqueIds),
  ]);

  const contexts = new Map<string, CallContext>();

  const callDataMap = new Map<string, GongCallData>();
  for (const call of arrayOf<GongCallData>(detailsResp?.calls)) {
    const meta = call?.metaData;
    const callId = meta ? asString(meta.id) : undefined;
    if (!callId) continue;
    callDataMap.set(callId, call);
  }

  const transcriptBlocks = arrayOf<GongCallTranscriptBlock>(transcriptsResp?.callTranscripts);
  for (const block of transcriptBlocks) {
    const callId = asString(block?.callId);
    if (!callId) continue;
    const existing = contexts.get(callId) ?? {
      callId,
      callData: callDataMap.get(callId),
      monologues: [] as GongTranscriptMonologue[],
    };
    const monologues = arrayOf<GongTranscriptMonologue>(block?.transcript);
    if (monologues.length) {
      existing.monologues = existing.monologues.concat(monologues);
    }
    if (block?.interactionsSummary) {
      existing.summary = block.interactionsSummary;
    }
    if (block?.trackers?.length) {
      existing.trackers = block.trackers;
    }
    if (block?.topics?.length) {
      existing.topics = block.topics;
    }
    contexts.set(callId, existing);
  }

  for (const summary of arrayOf<InteractionsSummaryPayload>(transcriptsResp?.interactionsSummary)) {
    const callId = asString(summary?.callId);
    if (!callId) continue;
    const existing = contexts.get(callId) ?? {
      callId,
      callData: callDataMap.get(callId),
      monologues: [] as GongTranscriptMonologue[],
    };
    existing.summary = summary;
    contexts.set(callId, existing);
  }

  for (const trackerBlock of arrayOf<TrackerBlock>(transcriptsResp?.trackers ?? [])) {
    const callId = asString(trackerBlock?.callId);
    if (!callId) continue;
    const trackers = arrayOf<GongTrackerEntry>(trackerBlock?.trackers ?? (trackerBlock?.tracker ? [trackerBlock.tracker] : []));
    if (!trackers.length) continue;
    const existing = contexts.get(callId) ?? {
      callId,
      callData: callDataMap.get(callId),
      monologues: [] as GongTranscriptMonologue[],
    };
    existing.trackers = trackers;
    contexts.set(callId, existing);
  }

  for (const topicBlock of arrayOf<TopicBlock>(transcriptsResp?.topics ?? [])) {
    const callId = asString(topicBlock?.callId);
    if (!callId) continue;
    const topics = arrayOf<GongTopicEntry>(topicBlock?.topics);
    if (!topics.length) continue;
    const existing = contexts.get(callId) ?? {
      callId,
      callData: callDataMap.get(callId),
      monologues: [] as GongTranscriptMonologue[],
    };
    existing.topics = topics;
    contexts.set(callId, existing);
  }

  if (!transcriptBlocks.length && Array.isArray(transcriptsResp?.transcripts) && uniqueIds.length === 1) {
    const callId = uniqueIds[0];
    const existing = contexts.get(callId) ?? {
      callId,
      callData: callDataMap.get(callId),
      monologues: [] as GongTranscriptMonologue[],
    };
    existing.monologues = existing.monologues.concat(arrayOf<GongTranscriptMonologue>(transcriptsResp.transcripts));
    contexts.set(callId, existing);
  }

  for (const callId of uniqueIds) {
    if (!contexts.has(callId)) {
      contexts.set(callId, {
        callId,
        callData: callDataMap.get(callId),
        monologues: [],
      });
    } else {
      const context = contexts.get(callId)!;
      if (!context.callData) {
        context.callData = callDataMap.get(callId);
      }
    }
  }

  return contexts;
}

function ensureContext(map: Map<string, CallContext>, callId: string): CallContext {
  return map.get(callId) ?? {
    callId,
    callData: undefined,
    monologues: [],
  };
}

// Tool definitions
const LIST_CALLS_TOOL: Tool = {
  name: "list_calls",
  description: "List Gong calls with optional date range filtering. Returns call details including ID, title, start/end times, participants, and duration.",
  inputSchema: {
    type: "object",
    properties: {
      fromDateTime: {
        type: "string",
        description: "Start date/time in ISO format (e.g. 2024-03-01T00:00:00Z)"
      },
      toDateTime: {
        type: "string",
        description: "End date/time in ISO format (e.g. 2024-03-31T23:59:59Z)"
      }
    }
  }
};

const RETRIEVE_TRANSCRIPTS_TOOL: Tool = {
  name: "retrieve_transcripts",
  description: "Retrieve transcripts for specified call IDs. Returns detailed transcripts including speaker IDs, topics, and timestamped sentences.",
  inputSchema: {
    type: "object",
    properties: {
      callIds: {
        type: "array",
        items: { type: "string" },
        description: "Array of Gong call IDs to retrieve transcripts for"
      }
    },
    required: ["callIds"]
  }
};

const GET_CALL_BRIEF_TOOL: Tool = {
  name: "get_call_brief",
  description: "Return Magnite-formatted call briefs including recap, key points, next steps, trackers, and source flags.",
  inputSchema: {
    type: "object",
    properties: {
      callIds: {
        type: "array",
        items: { type: "string" },
        description: "Array of Gong call IDs to summarize",
      },
    },
    required: ["callIds"],
  },
};

const GET_CALL_OUTLINE_TOOL: Tool = {
  name: "get_call_outline",
  description: "Return hierarchical outlines for Gong calls with sections, action items, participants, and motion flags.",
  inputSchema: {
    type: "object",
    properties: {
      callIds: {
        type: "array",
        items: { type: "string" },
        description: "Array of Gong call IDs to outline",
      },
    },
    required: ["callIds"],
  },
};

const SEARCH_CALLS_TOOL: Tool = {
  name: "search_calls",
  description: "Search Gong calls by title, participants, time window, and optional keyword filters.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Free text search in call title or participants",
      },
      participants: {
        type: "array",
        items: { type: "string" },
        description: "Filter by participant names or emails",
      },
      fromDateTime: {
        type: "string",
        description: "Start date/time in ISO format",
      },
      toDateTime: {
        type: "string",
        description: "End date/time in ISO format",
      },
      includeKeywords: {
        type: "array",
        items: { type: "string" },
        description: "Filter calls containing these keywords in title",
      },
    },
  },
};

const GET_CALL_ASSETS_TOOL: Tool = {
  name: "get_call_assets",
  description: "Return combined payload: metadata, brief, outline, participants, trackers, topics, and provenance flags.",
  inputSchema: {
    type: "object",
    properties: {
      callIds: {
        type: "array",
        items: { type: "string" },
        description: "Array of Gong call IDs",
      },
    },
    required: ["callIds"],
  },
};

const HEALTH_TOOL: Tool = {
  name: "health",
  description: "Check Gong API connectivity and credentials. Returns server health status.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

const FIND_CALL_TOOL: Tool = {
  name: "find_call",
  description: "Search Gong calls by query string (company name, keyword, email domain). Returns ranked matches with scores and match reasons.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search term (company name, keyword, topic, etc.)",
      },
      fromDateTime: {
        type: "string",
        description: "Start date/time in ISO format (defaults to 7 days ago)",
      },
      toDateTime: {
        type: "string",
        description: "End date/time in ISO format (defaults to now)",
      },
      maxResults: {
        type: "number",
        description: "Maximum number of results to return (default: 10)",
      },
    },
    required: ["query"],
  },
};

// Server implementation
const server = new Server(
  {
    name: "example-servers/gong",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {
        listChanged: true,
      },
      resources: {
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
    },
  },
);

logger.info('Gong MCP server initialized', { version: '0.2.0' });

// Type guards
function isGongListCallsArgs(args: unknown): args is GongListCallsArgs {
  return (
    typeof args === "object" &&
    args !== null &&
    (!("fromDateTime" in args) || typeof (args as GongListCallsArgs).fromDateTime === "string") &&
    (!("toDateTime" in args) || typeof (args as GongListCallsArgs).toDateTime === "string")
  );
}

function isCallIdsArgs(args: unknown): args is GongRetrieveTranscriptsArgs {
  return (
    typeof args === "object" &&
    args !== null &&
    "callIds" in args &&
    Array.isArray((args as GongRetrieveTranscriptsArgs).callIds) &&
    (args as GongRetrieveTranscriptsArgs).callIds.every(id => typeof id === "string")
  );
}

// Initialize handler
server.setRequestHandler(InitializeRequestSchema, async (request) => {
  logger.info('Client initializing', {
    clientName: request.params.clientInfo?.name,
    clientVersion: request.params.clientInfo?.version,
    protocolVersion: request.params.protocolVersion,
  });

  return {
    protocolVersion: "2024-11-05",
    capabilities: {
      tools: {
        listChanged: true,
      },
      resources: {
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
    },
    serverInfo: {
      name: "gong-mcp",
      version: "0.2.0",
    },
  };
});

// Resource handlers
server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
  logger.info('Listing resource templates');
  return {
    resourceTemplates: RESOURCE_TEMPLATES,
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  // No static resources, only templates
  logger.info('Listing resources (none - templates only)');
  return {
    resources: [],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  logger.info('Reading resource', { uri });

  try {
    const parsed = parseResourceUri(uri);
    if (!parsed) {
      throw new GongMcpError('INVALID_URI', `Invalid resource URI: ${uri}`);
    }

    // Fetch context for the call
    const contexts = await gatherCallContexts([parsed.callId]);
    const context = contexts.get(parsed.callId);

    return await readResource(uri, context);
  } catch (error) {
    logger.error('Failed to read resource', { uri, error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
});

// Prompt handlers
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  logger.info('Listing prompts');
  return {
    prompts: PROMPTS,
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  logger.info('Getting prompt', { name, hasArgs: !!args });

  try {
    return getPrompt(name, args);
  } catch (error) {
    logger.error('Failed to get prompt', { name, error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
});

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    LIST_CALLS_TOOL,
    RETRIEVE_TRANSCRIPTS_TOOL,
    GET_CALL_BRIEF_TOOL,
    GET_CALL_OUTLINE_TOOL,
    SEARCH_CALLS_TOOL,
    GET_CALL_ASSETS_TOOL,
    FIND_CALL_TOOL,
    HEALTH_TOOL,
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments?: unknown } }) => {
  const { name, arguments: args } = request.params;
  const startTime = Date.now();

  try {
    if (!args && name !== "health") {
      throw new GongMcpError("MISSING_ARGUMENTS", `No arguments provided for ${name}`);
    }

    switch (name) {
      case "list_calls": {
        if (!isGongListCallsArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for list_calls");
        }
        const { fromDateTime, toDateTime } = args;
        const response = await withRetry(
          () => withTimeout(() => gongClient.listCalls(fromDateTime, toDateTime), 30000, "list_calls"),
          { name: "list_calls", meta: { fromDateTime, toDateTime } }
        );
        logger.logToolCall("list_calls", args as Record<string, unknown>, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify(response, null, 2)
          }],
          isError: false,
        };
      }

      case "retrieve_transcripts": {
        if (!isCallIdsArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for retrieve_transcripts");
        }
        const callIds = dedupeCallIds(args.callIds);
        const response = await withRetry(
          () => withTimeout(() => gongClient.retrieveTranscripts(callIds), 30000, "retrieve_transcripts"),
          { name: "retrieve_transcripts", meta: { callIds } }
        );
        logger.logToolCall("retrieve_transcripts", { callIds }, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify(response, null, 2)
          }],
          isError: false,
        };
      }

      case "get_call_brief": {
        if (!isCallIdsArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for get_call_brief");
        }
        const callIds = dedupeCallIds(args.callIds);
        const contexts = await withRetry(
          () => withTimeout(() => gatherCallContexts(callIds), 30000, "get_call_brief"),
          { name: "get_call_brief", meta: { callIds } }
        );
        const briefs: CallBrief[] = callIds.map(callId => buildBrief(ensureContext(contexts, callId)));
        logger.logToolCall("get_call_brief", { callIds }, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ briefs }, null, 2),
          }],
          isError: false,
        };
      }

      case "get_call_outline": {
        if (!isCallIdsArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for get_call_outline");
        }
        const callIds = dedupeCallIds(args.callIds);
        const contexts = await withRetry(
          () => withTimeout(() => gatherCallContexts(callIds), 30000, "get_call_outline"),
          { name: "get_call_outline", meta: { callIds } }
        );
        const outlines: CallOutline[] = callIds.map(callId => buildOutline(ensureContext(contexts, callId)));
        logger.logToolCall("get_call_outline", { callIds }, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ outlines }, null, 2),
          }],
          isError: false,
        };
      }

      case "search_calls": {
        if (!isGongListCallsArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for search_calls");
        }
        const { fromDateTime, toDateTime, query, participants, includeKeywords } = args as Record<string, unknown>;

        // Fetch calls within date range
        const response = await withRetry(
          () => withTimeout(() => gongClient.listCalls(fromDateTime as string | undefined, toDateTime as string | undefined), 30000, "search_calls"),
          { name: "search_calls", meta: { fromDateTime, toDateTime, query } }
        );

        // Filter by query, participants, and keywords
        let filtered = response.calls || [];

        if (query && typeof query === 'string') {
          const lowerQuery = query.toLowerCase();
          filtered = filtered.filter(call =>
            call.title?.toLowerCase().includes(lowerQuery)
          );
        }

        if (includeKeywords && Array.isArray(includeKeywords)) {
          filtered = filtered.filter(call => {
            const title = (call.title || '').toLowerCase();
            return includeKeywords.some(keyword =>
              typeof keyword === 'string' && title.includes(keyword.toLowerCase())
            );
          });
        }

        logger.logToolCall("search_calls", { query, fromDateTime, toDateTime }, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ calls: filtered, count: filtered.length }, null, 2),
          }],
          isError: false,
        };
      }

      case "get_call_assets": {
        if (!isCallIdsArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for get_call_assets");
        }
        const callIds = dedupeCallIds(args.callIds);
        const contexts = await withRetry(
          () => withTimeout(() => gatherCallContexts(callIds), 30000, "get_call_assets"),
          { name: "get_call_assets", meta: { callIds } }
        );

        const assets = callIds.map(callId => {
          const context = ensureContext(contexts, callId);
          const brief = buildBrief(context);
          const outline = buildOutline(context);

          return {
            callId,
            metadata: context.callData?.metaData || {},
            brief,
            outline,
            participants: outline.participants,
            trackers: brief.trackers,
            topics: outline.topics,
            source: brief.source,
            hasTranscript: brief.hasTranscript,
          };
        });

        logger.logToolCall("get_call_assets", { callIds }, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ assets }, null, 2),
          }],
          isError: false,
        };
      }

      case "find_call": {
        if (!isFindCallArgs(args)) {
          throw new GongMcpError("INVALID_ARGUMENTS", "Invalid arguments for find_call");
        }
        const results = await withRetry(
          () => withTimeout(() => findCall(args, gongClient), 30000, "find_call"),
          { name: "find_call", meta: { query: args.query } }
        );
        logger.logToolCall("find_call", { query: args.query }, Date.now() - startTime, "success");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ matches: results }, null, 2),
          }],
          isError: false,
        };
      }

      case "health": {
        try {
          // Simple health check: list calls for the last day
          const toDateTime = new Date().toISOString();
          const fromDateTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

          await withTimeout(
            () => gongClient.listCalls(fromDateTime, toDateTime),
            10000,
            "health_check"
          );

          logger.logToolCall("health", {}, Date.now() - startTime, "success");
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                status: "healthy",
                message: "Gong API is accessible and credentials are valid",
                timestamp: new Date().toISOString(),
              }, null, 2),
            }],
            isError: false,
          };
        } catch (error) {
          logger.logToolCall("health", {}, Date.now() - startTime, "error", error instanceof Error ? error.message : String(error));
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                status: "unhealthy",
                message: error instanceof Error ? error.message : String(error),
                timestamp: new Date().toISOString(),
              }, null, 2),
            }],
            isError: false, // Health check failures are not tool errors
          };
        }
      }

      default:
        throw new GongMcpError("UNKNOWN_TOOL", `Unknown tool: ${name}`);
    }
  } catch (error) {
    logger.logToolCall(name, (args as Record<string, unknown>) || {}, Date.now() - startTime, "error", error instanceof Error ? error.message : String(error));
    return formatErrorResponse(error);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
}); 
