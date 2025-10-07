#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

dotenv.config();

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const [, , callIdArg] = process.argv;
  if (!callIdArg) {
    console.error('❌ Usage: node scripts/callRetrieveTranscripts.js <CALL_ID>');
    process.exit(1);
  }

  // Resolve paths
  const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
  const gongDir = path.resolve(scriptsDir, '..', '..'); // .../gong
  const transcriptsDir = path.resolve(gongDir, 'transcripts');
  const outputFile = path.resolve(transcriptsDir, `${callIdArg}.txt`);

  const command = 'node';
  const args = [path.resolve(gongDir, 'gong-mcp', 'dist', 'index.js')];

  const env = {
    ...process.env,
    GONG_ACCESS_KEY: getEnv('GONG_ACCESS_KEY'),
    GONG_ACCESS_SECRET: getEnv('GONG_ACCESS_SECRET'),
  };

  const client = new Client({ name: 'gong-mcp-client', version: '1.0.0' });
  const transport = new StdioClientTransport({ command, args, env });

  try {
    console.error(`🔗 Connecting to Gong MCP server via stdio...`);
    await client.connect(transport);

    console.error(`🧰 Listing tools...`);
    const tools = await client.listTools();
    const toolNames = tools.tools?.map(t => t.name) || [];
    if (!toolNames.includes('retrieve_transcripts')) {
      throw new Error('retrieve_transcripts tool not available');
    }

    console.error(`📞 Calling retrieve_transcripts for ${callIdArg}...`);
    const result = await client.callTool({
      name: 'retrieve_transcripts',
      arguments: { callIds: [String(callIdArg)] },
    });

    const content = result?.content || [];
    const textChunk = content.find(c => c.type === 'text');
    const jsonText = textChunk && 'text' in textChunk ? textChunk.text : '';

    let transcriptsText = '';
    try {
      const parsed = JSON.parse(jsonText);
      const transcripts = parsed?.transcripts || [];
      // Convert to plain text like the other script
      const lines = [];
      for (const t of transcripts) {
        const speakerId = t && t.speakerId ? String(t.speakerId) : 'unknown';
        const sentences = Array.isArray(t?.sentences) ? t.sentences : [];
        for (const s of sentences) {
          const seconds = Math.max(0, Math.floor(Number(s?.start) || 0));
          const minutes = Math.floor(seconds / 60);
          const rem = seconds % 60;
          const ts = `[${minutes}:${String(rem).padStart(2, '0')}]`;
          const text = (s?.text ?? '').toString().trim();
          if (text.length === 0) continue;
          lines.push(`${ts} ${speakerId}: ${text}`);
        }
      }
      transcriptsText = lines.join('\n');
    } catch {
      transcriptsText = jsonText || '';
    }

    fs.mkdirSync(transcriptsDir, { recursive: true });
    fs.writeFileSync(outputFile, transcriptsText, 'utf8');
    console.error(`💾 Saved transcript to ${outputFile}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ MCP error: ${message}`);
    process.exit(1);
  } finally {
    try { await client.close?.(); } catch {}
  }
}

await main();


