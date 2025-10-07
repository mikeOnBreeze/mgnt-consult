# Gong MCP Server v0.2.0

A **first-class Model Context Protocol (MCP) server** for Gong, exposing call data through MCP primitives: **Tools**, **Resources**, and **Prompts**. Designed for seamless integration with Cursor, Claude Desktop, and other MCP-compatible AI applications.

---

## 🎯 Overview

This server transforms your Gong calls into AI-accessible context:
- **Tools** for actions (search, retrieve, summarize)
- **Resources** for addressable data (briefs, outlines, transcripts as URIs)
- **Prompts** for reusable workflows (find DV360 calls, compare calls)

### Key Features

✅ **MCP-First Design**: All functionality exposed via standard MCP primitives
✅ **No Transcripts? No Problem**: Works with summary-only calls (common in Magnite)
✅ **Rich Provenance**: Every response includes `source` flags (transcript+summary, summary-only, derived)
✅ **Enterprise-Ready**: Structured logging, retry/backoff, 30s timeouts, error envelopes
✅ **Cursor/Claude Native**: Reference calls as `gong://call/{id}/brief.json` resources

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- Gong API credentials ([How to obtain](https://app.gong.io/settings/api))

### Setup

```bash
# 1. Clone and install
cd gong-mcp
npm install

# 2. Configure credentials
cp .env.example .env
# Edit .env with your GONG_ACCESS_KEY and GONG_ACCESS_SECRET

# 3. Build
npm run build

# 4. Verify
node dist/index.js
# Should start the MCP server (Ctrl+C to exit)
```

---

## 🔌 Connecting to Cursor/Claude

### Cursor Configuration

Add to your Cursor MCP config (`~/.cursor/mcp.json` or via UI):

```json
{
  "gong": {
    "command": "node",
    "args": ["/absolute/path/to/gong-mcp/dist/index.js"],
    "env": {
      "GONG_ACCESS_KEY": "your_key",
      "GONG_ACCESS_SECRET": "your_secret"
    }
  }
}
```

### Claude Desktop Configuration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gong": {
      "command": "node",
      "args": ["/absolute/path/to/gong-mcp/dist/index.js"],
      "env": {
        "GONG_ACCESS_KEY": "your_key",
        "GONG_ACCESS_SECRET": "your_secret"
      }
    }
  }
}
```

---

## 🛠️ MCP Primitives

### Tools (7 available)

| Tool | Description | Use Case |
|------|-------------|----------|
| `list_calls` | List calls by date range | "Show me October calls" |
| `retrieve_transcripts` | Get raw transcript data | Detailed analysis |
| `get_call_brief` | Magnite-formatted brief | Quick recap, key points, next steps |
| `get_call_outline` | Hierarchical outline | Sections, action items, participants |
| `get_call_assets` | **Combined payload** | Brief + outline + metadata in one call |
| `search_calls` | **Search by query/keywords** | "Find DV360 calls last week" |
| `health` | Server health check | Verify credentials/connectivity |

#### Example Tool Usage (Cursor)

```typescript
// In Cursor, invoke via MCP:
{
  "tool": "search_calls",
  "arguments": {
    "query": "DV360",
    "fromDateTime": "2025-10-01T00:00:00Z",
    "toDateTime": "2025-10-06T23:59:59Z"
  }
}

// Returns:
{
  "calls": [
    { "id": "123...", "title": "DV360 Q4 Review", "started": "2025-10-03..." }
  ],
  "count": 1
}
```

---

### Resources (4 templates)

Resources let you **reference** Gong calls as URIs in your conversations:

| Resource URI | Content | MIME Type |
|--------------|---------|-----------|
| `gong://call/{callId}/brief.json` | Call brief (recap, key points, next steps) | `application/json` |
| `gong://call/{callId}/outline.json` | Call outline (sections, action items) | `application/json` |
| `gong://call/{callId}/transcript.txt` | Flattened transcript (if available) | `text/plain` |
| `gong://call/{callId}/assets.json` | **Combined**: brief + outline + metadata | `application/json` |

#### Example Resource Usage (Cursor)

```typescript
// In Cursor prompt:
"Summarize the call at gong://call/7264530111852323899/brief.json"

// Cursor will:
// 1. Read the resource via MCP
// 2. Pass the brief JSON to the LLM
// 3. Generate a summary
```

**Why Resources?** They enable:
- **Lazy loading**: Only fetch data when needed
- **Consistent references**: `gong://call/{id}` is portable across sessions
- **Rich context**: Attach call data to conversations without manual copy/paste

---

### Prompts (3 templates)

Reusable prompt templates for common workflows:

| Prompt | Arguments | Description |
|--------|-----------|-------------|
| `find-dv360-call` | `query`, `fromDateTime`, `toDateTime` | Search DV360-related calls |
| `summarize-call` | `callId`, `format` (`brief`\|`outline`\|`assets`) | Generate call summary |
| `compare-calls` | `callIds` (array) | Compare multiple calls for patterns |

#### Example Prompt Usage (Cursor)

```typescript
// Invoke prompt via MCP:
{
  "prompt": "find-dv360-call",
  "arguments": {
    "query": "Display & Video 360",
    "fromDateTime": "2025-10-01T00:00:00Z"
  }
}

// Returns a structured prompt that guides the LLM to:
// 1. Use search_calls tool
// 2. Filter by query
// 3. Display results in a table
// 4. Offer to generate briefs
```

---

## 📖 Usage Examples

### 1. Search for Recent DV360 Calls

**Cursor Prompt:**
```
Find all DV360-related Gong calls from the last 7 days
```

**Behind the scenes:**
1. Cursor invokes `search_calls` tool with `query: "DV360"` and date range
2. MCP server filters Gong calls by title
3. Cursor displays results with IDs, titles, dates

---

### 2. Get a Call Brief

**Cursor Prompt:**
```
Show me the brief for call 7264530111852323899
```

**Behind the scenes:**
1. Cursor invokes `get_call_brief` with `callIds: ["7264530111852323899"]`
2. MCP server fetches transcript + summary, normalizes to Magnite format
3. Returns JSON with `recap`, `keyPoints`, `nextSteps`, `trackers`, `source` flags
4. Cursor formats for display

---

### 3. Compare Two Calls

**Cursor Prompt:**
```
Compare calls 7264530111852323899 and 7264530111852323900
```

**Behind the scenes:**
1. Cursor invokes `get_call_assets` for both IDs (parallel fetch)
2. MCP server returns combined brief+outline for each
3. Cursor's LLM analyzes differences in topics, action items, participants

---

### 4. Reference a Call as Context

**Cursor Prompt:**
```
Using the data from gong://call/7264530111852323899/assets.json, draft a follow-up email
```

**Behind the scenes:**
1. Cursor reads the resource URI via `resources/read`
2. MCP server returns combined JSON payload
3. LLM uses brief/outline to draft email with context

---

## 🧪 Testing the Server

### Health Check

```bash
# Via MCP Inspector (install: npm install -g @modelcontextprotocol/inspector)
npx @modelcontextprotocol/inspector node dist/index.js

# Then in browser:
# 1. Call "health" tool
# Expected: { "status": "healthy", "message": "Gong API is accessible..." }
```

### Example CLI Scripts

Located in `examples/cli/`:

```bash
# Get brief for a call
node examples/cli/getBrief.js 7264530111852323899

# Get outline for multiple calls
node examples/cli/getOutline.js 7264530111852323899 7264530111852323900
```

These scripts **use the MCP server** (not direct HTTP) to demonstrate integration patterns.

---

## 🔍 Observability

### Structured Logging

All logs go to **stderr** (stdout reserved for MCP protocol):

```
🔧 INFO [gong-mcp] Client initializing
🔧 INFO [gong-mcp] {"event":"Tool get_call_brief completed","tool":"get_call_brief","latencyMs":1245,"callIds":["123..."],"status":"success"}
⚠️ WARN [gong-mcp] get_call_brief failed, retrying
❌ ERROR [gong-mcp] {"event":"Tool health failed","tool":"health","latencyMs":10023,"status":"error","error":"timeout"}
```

**No PII or secrets** are logged—only call IDs, timestamps, and latency.

---

## 🛡️ Error Handling

- **Consistent envelopes**: All errors return `{ error: { code, message, retryAfter? } }`
- **Automatic retries**: Transient failures (429, 502, 503, 504) retry with exponential backoff (3 attempts max)
- **Timeouts**: 30s per Gong request, 10s for health checks
- **Graceful degradation**: Calls without transcripts return `"source": "summary-only"` or `"derived"`

---

## 🗂️ Directory Structure

```
gong-mcp/
├── src/
│   ├── index.ts           # Main MCP server + tool handlers
│   ├── normalizers.ts     # Brief/outline builders (unchanged)
│   ├── resources.ts       # Resource templates + read logic
│   ├── prompts.ts         # Prompt definitions
│   ├── logger.ts          # Structured logging (emoji-prefixed)
│   └── errors.ts          # Error envelopes, retry, timeout
├── examples/
│   └── cli/               # Example Node scripts (getBrief, getOutline)
├── dist/                  # Compiled JS (git-ignored)
├── README.md              # This file
└── package.json
```

---

## 🚀 Roadmap

- [ ] `export_brief_markdown` tool (transform JSON → Markdown)
- [ ] Notifications: emit `tools/list_changed` on dynamic updates
- [ ] Unit tests for normalizers (fixtures: transcript-only, summary-only)
- [ ] Integration tests with mock Gong HTTP adapter
- [ ] Docker Compose example with env file

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "feat: add search_calls pagination"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📜 License

MIT License – see [LICENSE](LICENSE) for details.

---

## 💬 Support

For issues or questions:
- GitHub Issues: [link to repo issues]
- Internal Magnite Slack: `#gong-mcp-support`

---

**Built with ❤️ for Magnite. Powered by MCP.**

---

## ⚡ Quick Cursor Setup (Beginner-Friendly)

Use this if you just want to run the Gong MCP inside Cursor without building anything.

### 1) Prepare your .env

- Copy `.env.example` to `.env`
- Fill in your credentials:

```env
GONG_ACCESS_KEY=your_access_key_here
GONG_ACCESS_SECRET=your_access_secret_here
```

Do NOT commit `.env`.

### 2) Cursor is already configured (relative paths)

This repo includes `.cursor/mcp.json` pre-wired with relative paths. If you open the repo root in Cursor, no path editing is required.

```json
{
  "mcpServers": {
    "gong": {
      "command": "node",
      "args": [
        "-r",
        "dotenv/config",
        "./gong/gong-mcp/dist/index.js"
      ],
      "env": {
        "DOTENV_CONFIG_PATH": "./gong/gong-mcp/.env"
      }
    }
  }
}
```

Tip: If your workspace root is not the repo root, relative paths may not resolve. In that case, you can switch these to absolute paths.

### 3) Reload Cursor

- Restart Cursor or disable/enable the MCP server in settings so it picks up the change.

### 4) Verify it works

- In Cursor, run the MCP tool `health` (via MCP UI/Inspector) and expect:

```json
{ "status": "healthy", "message": "Gong API is accessible..." }
```

### 5) Troubleshooting

- "Cannot find module": relative paths not resolving (ensure you opened the repo root) or adjust to absolute paths
- "ENV not loaded": verify `DOTENV_CONFIG_PATH` points to your `.env`
- Still stuck? Try running from terminal to see logs:

```bash
node -r dotenv/config ./gong/gong-mcp/dist/index.js
```

### Do I need npm install / build?

- If `gong/gong-mcp/dist/` exists (as in this repo), you can use the steps above without building.
- If `dist/` is missing or you pulled fresh sources, then run:

```bash
cd gong/gong-mcp
npm install
npm run build
```

