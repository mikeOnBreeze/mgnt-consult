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

function dedupe(ids) {
  const seen = new Set();
  const result = [];
  for (const id of ids) {
    const normalized = String(id).trim();
    if (!normalized) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }
  return result;
}

async function main() {
  const [, , ...callIdArgs] = process.argv;
  if (callIdArgs.length === 0) {
    console.error('❌ Usage: node scripts/getOutline.js <CALL_ID> [<CALL_ID> ...]');
    process.exit(1);
  }

  const callIds = dedupe(callIdArgs);
  if (callIds.length === 0) {
    console.error('❌ No valid call IDs provided.');
    process.exit(1);
  }

  const cliDir = path.dirname(fileURLToPath(import.meta.url));
  const gongMcpDir = path.resolve(cliDir, '..', '..');
  const gongDir = path.resolve(gongMcpDir, '..');
  const transcriptsDir = path.resolve(gongDir, 'transcripts');
  fs.mkdirSync(transcriptsDir, { recursive: true });

  const command = 'node';
  const args = [path.resolve(gongMcpDir, 'dist', 'index.js')];
  const env = {
    ...process.env,
    GONG_ACCESS_KEY: getEnv('GONG_ACCESS_KEY'),
    GONG_ACCESS_SECRET: getEnv('GONG_ACCESS_SECRET'),
  };

  const client = new Client({ name: 'gong-mcp-client', version: '1.0.0' });
  const transport = new StdioClientTransport({ command, args, env });

  try {
    console.error('🔗 Connecting to Gong MCP server via stdio...');
    await client.connect(transport);

    console.error('🧰 Listing tools...');
    const tools = await client.listTools();
    const toolNames = tools.tools?.map(t => t.name) || [];
    if (!toolNames.includes('get_call_outline')) {
      throw new Error('get_call_outline tool not available');
    }

    console.error(`🧱 Generating outlines for ${callIds.join(', ')}...`);
    const result = await client.callTool({
      name: 'get_call_outline',
      arguments: { callIds },
    });

    const textChunk = result?.content?.find(c => c.type === 'text');
    const payload = textChunk && 'text' in textChunk ? textChunk.text : '';
    const parsed = payload ? JSON.parse(payload) : { outlines: [] };

    for (const outline of parsed.outlines || []) {
      const id = outline?.callId ? String(outline.callId) : null;
      if (!id) continue;
      const outputPath = path.resolve(transcriptsDir, `${id}.outline.json`);
      fs.writeFileSync(outputPath, JSON.stringify(outline, null, 2), 'utf8');
      console.error(`💾 Saved outline to ${outputPath}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ MCP error: ${message}`);
    process.exit(1);
  } finally {
    try {
      await client.close?.();
    } catch (err) {
      if (err) console.error(`⚠️ Close error: ${err}`);
    }
  }
}

await main();
