#!/usr/bin/env node

import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const GONG_API_URL = 'https://api.gong.io/v2';

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function toBasicAuth(key, secret) {
  return `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`;
}

function signRequest(secret, method, pathStr, timestamp, payloadOrParams) {
  const body = payloadOrParams ? JSON.stringify(payloadOrParams) : '';
  const stringToSign = `${method}\n${pathStr}\n${timestamp}\n${body}`;
  return crypto.createHmac('sha256', secret).update(stringToSign).digest('base64');
}

function formatTimestamp(totalSeconds) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const minutes = Math.floor(seconds / 60);
  const rem = seconds % 60;
  const remStr = rem.toString().padStart(2, '0');
  return `[${minutes}:${remStr}]`;
}

async function fetchTranscript(callId) {
  const accessKey = getEnv('GONG_ACCESS_KEY');
  const accessSecret = getEnv('GONG_ACCESS_SECRET');

  const method = 'POST';
  const pathStr = '/calls/transcript';
  const timestamp = new Date().toISOString();
  const payload = {
    filter: {
      callIds: [callId],
      includeEntities: true,
      includeInteractionsSummary: true,
      includeTrackers: true,
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': toBasicAuth(accessKey, accessSecret),
    'X-Gong-AccessKey': accessKey,
    'X-Gong-Timestamp': timestamp,
    'X-Gong-Signature': signRequest(accessSecret, method, pathStr, timestamp, payload),
  };

  const url = `${GONG_API_URL}${pathStr}`;
  const { data } = await axios.post(url, payload, { headers });
  return data;
}

function toPlainText(transcripts) {
  const lines = [];
  if (!Array.isArray(transcripts)) return '';
  for (const t of transcripts) {
    const speakerId = t && t.speakerId ? String(t.speakerId) : 'unknown';
    const sentences = Array.isArray(t?.sentences) ? t.sentences : [];
    for (const s of sentences) {
      const ts = formatTimestamp(s?.start);
      const text = (s?.text ?? '').toString().trim();
      if (text.length === 0) continue;
      lines.push(`${ts} ${speakerId}: ${text}`);
    }
  }
  return lines.join('\n');
}

async function main() {
  const [, , callIdArg] = process.argv;
  if (!callIdArg) {
    console.error('❌ Usage: node scripts/fetchTranscript.js <CALL_ID>');
    process.exit(1);
  }

  try {
    console.error(`🔎 Fetching transcript for call ${callIdArg}...`);
    const result = await fetchTranscript(callIdArg);
    const transcripts = result?.transcripts ?? [];

    if (!transcripts || transcripts.length === 0) {
      console.error('⚠️ No transcripts returned by Gong API. Saving empty file.');
    } else {
      console.error(`✅ Received ${transcripts.length} transcript block(s). Formatting...`);
    }

    const outputText = toPlainText(transcripts);

    // Resolve absolute path to gong/transcripts folder
    const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
    const gongDir = path.resolve(scriptsDir, '..', '..'); // .../gong
    const transcriptsDir = path.resolve(gongDir, 'transcripts');
    const outputFile = path.resolve(transcriptsDir, `${callIdArg}.txt`);

    fs.mkdirSync(transcriptsDir, { recursive: true });
    fs.writeFileSync(outputFile, outputText, 'utf8');

    console.error(`💾 Saved transcript to ${outputFile}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Error fetching transcript: ${message}`);
    process.exit(1);
  }
}

await main();


