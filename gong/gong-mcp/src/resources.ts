/**
 * MCP Resources implementation for Gong calls
 * Exposes call data (brief, outline, transcript, combined assets) as URI-addressable resources
 */

import { Resource, ResourceTemplate } from '@modelcontextprotocol/sdk/types.js';
import { buildBrief, buildOutline, CallContext } from './normalizers.js';
import { logger } from './logger.js';
import { GongMcpError } from './errors.js';

// Resource templates exposed by the server
export const RESOURCE_TEMPLATES: ResourceTemplate[] = [
  {
    uriTemplate: 'gong://call/{callId}/brief.json',
    name: 'call-brief',
    description: 'Magnite-formatted call brief with recap, key points, next steps, and trackers',
    mimeType: 'application/json',
  },
  {
    uriTemplate: 'gong://call/{callId}/outline.json',
    name: 'call-outline',
    description: 'Hierarchical call outline with sections, participants, action items, and topics',
    mimeType: 'application/json',
  },
  {
    uriTemplate: 'gong://call/{callId}/transcript.txt',
    name: 'call-transcript',
    description: 'Flattened plain-text transcript of the call (if available)',
    mimeType: 'text/plain',
  },
  {
    uriTemplate: 'gong://call/{callId}/assets.json',
    name: 'call-assets',
    description: 'Combined payload: metadata, brief, outline, participants, trackers, and topics',
    mimeType: 'application/json',
  },
];

// Parse a Gong resource URI
export function parseResourceUri(uri: string): { type: 'brief' | 'outline' | 'transcript' | 'assets'; callId: string } | null {
  const match = uri.match(/^gong:\/\/call\/([^/]+)\/(brief|outline|transcript|assets)\.(json|txt)$/);
  if (!match) {
    return null;
  }

  const [, callId, type] = match;
  return {
    type: type as 'brief' | 'outline' | 'transcript' | 'assets',
    callId,
  };
}

// Flatten transcript monologues into plain text
function flattenTranscriptToText(context: CallContext): string {
  if (!context.monologues || context.monologues.length === 0) {
    return '[No transcript available]';
  }

  const lines: string[] = [];
  for (const mono of context.monologues) {
    const speakerId = mono.speakerId ? `[Speaker ${mono.speakerId}]` : '[Unknown Speaker]';
    const sentences = mono.sentences || [];
    for (const sentence of sentences) {
      if (sentence.text) {
        const timestamp = sentence.start !== undefined ? `[${Math.floor(sentence.start)}s]` : '';
        lines.push(`${timestamp} ${speakerId}: ${sentence.text.trim()}`);
      }
    }
  }

  return lines.length > 0 ? lines.join('\n') : '[No transcript sentences found]';
}

// Build combined assets payload
function buildAssets(context: CallContext): Record<string, unknown> {
  const brief = buildBrief(context);
  const outline = buildOutline(context);

  return {
    callId: context.callId,
    metadata: context.callData?.metaData || {},
    brief,
    outline,
    participants: outline.participants,
    trackers: brief.trackers,
    topics: outline.topics,
    source: brief.source,
    hasTranscript: brief.hasTranscript,
  };
}

// Read resource content given a parsed URI and CallContext
export async function readResource(
  uri: string,
  context: CallContext | undefined
): Promise<{ contents: Array<{ uri: string; mimeType: string; text: string }> }> {
  const parsed = parseResourceUri(uri);
  if (!parsed) {
    logger.error('Invalid resource URI', { uri });
    throw new GongMcpError('INVALID_URI', `Invalid Gong resource URI: ${uri}`);
  }

  if (!context) {
    logger.error('No context found for call', { callId: parsed.callId, uri });
    throw new GongMcpError('CALL_NOT_FOUND', `No data found for call ID: ${parsed.callId}`);
  }

  let mimeType: string;
  let text: string;

  switch (parsed.type) {
    case 'brief': {
      const brief = buildBrief(context);
      mimeType = 'application/json';
      text = JSON.stringify(brief, null, 2);
      break;
    }

    case 'outline': {
      const outline = buildOutline(context);
      mimeType = 'application/json';
      text = JSON.stringify(outline, null, 2);
      break;
    }

    case 'transcript': {
      mimeType = 'text/plain';
      text = flattenTranscriptToText(context);
      break;
    }

    case 'assets': {
      const assets = buildAssets(context);
      mimeType = 'application/json';
      text = JSON.stringify(assets, null, 2);
      break;
    }

    default:
      throw new GongMcpError('UNKNOWN_RESOURCE_TYPE', `Unknown resource type: ${parsed.type}`);
  }

  logger.info('Resource read', { uri, callId: parsed.callId, type: parsed.type, sizeBytes: text.length });

  return {
    contents: [
      {
        uri,
        mimeType,
        text,
      },
    ],
  };
}
