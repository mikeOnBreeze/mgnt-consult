## Gong MCP v2 Plan

### Goals
- Make MCP the first-class interface for Gong: all functionality exposed as MCP tools; clients (Cursor, CLI, agents) call tools directly.
- Eliminate direct HTTP scripts from normal workflows; retain only as examples that themselves invoke MCP.
- Improve DX: discoverable tools, clear schemas, structured logs, deterministic outputs, and strong acceptance tests.

### Current State (v1)
- MCP Server exposes tools: `list_calls`, `retrieve_transcripts`, `get_call_brief`, `get_call_outline`.
- Two thin Node clients (`scripts/getBrief.js`, `scripts/getOutline.js`) connect to MCP and save JSON artifacts locally.
- One legacy script (`scripts/fetchTranscript.js`) calls Gong HTTP directly (non-MCP path) — to be deprecated or re-routed through MCP.

### v2 Principles
- MCP-first: all new features are MCP tools with explicit JSON schemas; no file I/O in server unless essential. Artifact writing is a client concern.
- Deterministic outputs: stable fields, explicit provenance flags, and strict error envelopes.
- Observability: structured, minimal logs with clear emoji prefixes and levels to match repo style.
- Backwards-friendly: keep v1 tools stable; add new tools rather than breaking changes.

### MCP Lifecycle & Capabilities (Alignment)
- Transport: continue using STDIO transport for local development; keep design portable to Streamable HTTP.
- Lifecycle: implement proper `initialize` and advertise capabilities with `tools`, and add `resources` and `prompts` in v2.
- Capabilities: enable `tools.listChanged` to support notifications; add `resources` and `prompts` listings.
- Notifications: emit `notifications/tools/list_changed` (and `resources/list_changed` if applicable) when server tool/resource set changes.

### Tooling: v2 Additions
1) Search Calls (semantic+filters)
```json
{
  "name": "search_calls",
  "description": "Search Gong calls by title/participants/time window with optional keyword filters.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Free text in title or notes" },
      "participants": { "type": "array", "items": { "type": "string" } },
      "fromDateTime": { "type": "string" },
      "toDateTime": { "type": "string" },
      "includeKeywords": { "type": "array", "items": { "type": "string" } }
    }
  }
}
```

2) Get Call Assets (single stop shop)
```json
{
  "name": "get_call_assets",
  "description": "Return combined payload: meta, participants, transcript blocks, trackers, topics, brief, and outline.",
  "inputSchema": {
    "type": "object",
    "properties": { "callIds": { "type": "array", "items": { "type": "string" } } },
    "required": ["callIds"]
  }
}
```

3) Health
```json
{
  "name": "health",
  "description": "Server health and credentials sanity check.",
  "inputSchema": { "type": "object", "properties": {} }
}
```

4) Export Helpers (client-focused JSON transforms)
- Keep server focused on data/normalization; add optional lightweight transforms:
```json
{
  "name": "export_brief_markdown",
  "description": "Render brief JSON as opinionated Markdown (client-ready).",
  "inputSchema": {
    "type": "object",
    "properties": { "brief": { "type": "object" }, "style": { "type": "string" } },
    "required": ["brief"]
  }
}
```

### MCP Resources (Data Layer)
- Expose read-only resources for common artifacts so clients can reference URIs, not embed large payloads.
- Resource Templates (examples):
  - `gong://call/{callId}/brief.json` → application/json (CallBrief)
  - `gong://call/{callId}/outline.json` → application/json (CallOutline)
  - `gong://call/{callId}/transcript.txt` → text/plain (flattened transcript)
  - `gong://call/{callId}/assets.json` → application/json (combined meta+brief+outline+trackers)
- Operations: implement `resources/list`, `resources/templates/list`, and `resources/read`.
- Privacy: no PII beyond participant names/emails already present; redact as needed in future, configurable via server env.

### MCP Prompts (Optional, User-Controlled)
- Provide reusable prompts to guide model usage of tools/resources:
  - `find-dv360-call` — args: `{ query: string, fromDateTime?: string, toDateTime?: string }`
  - `summarize-call` — args: `{ callId: string, format?: "brief"|"outline"|"assets" }`
  - `compare-calls` — args: `{ callIds: string[] }`
- Implement `prompts/list` and `prompts/get`; keep prompts small and typed. Prompts are optional; tools remain the primary interface.

### Server Behavior & Error Policy
- Inputs validated via strict guards; errors returned as `{ error: { code, message } }` in `text` content.
- Rate limits / transient HTTP: retry with exponential backoff and jitter; surface `retryAfter` when available.
- Timeouts: 30s per Gong request; `get_call_assets` parallelizes sub-requests.
- PII/Secrets: never log content, only IDs and durations.

### Logging & Observability (repo-aligned)
- Prefix logs with emojis and level:
  - "🔧 INFO" for general server events
  - "⚠️ WARN" for recoverable issues
  - "❌ ERROR" for failures
- JSON-structured log lines (single line), minimal fields: `event`, `tool`, `latencyMs`, `callIds`, `status`.
- All logs to stderr (already redirected); no stdout except MCP protocol responses.

### Content Formats (Alignment)
- Prefer returning small JSON in `content: [{type: "text", text: JSON}]` for tool results.
- For larger artifacts, return `content: [{ type: "resource", resource: "gong://call/{id}/assets.json" }]` and implement the resource for retrieval.
- Ensure consistent MIME types for resources: `application/json` or `text/plain`.

### Deterministic Output Contracts (high-level)
- `get_call_brief` returns `{ briefs: CallBrief[] }` where each brief includes: `callId`, `title`, `recap`, `keyPoints`, `nextSteps`, `entities`, `trackers`, `links`, `source`, `hasTranscript`.
- `get_call_outline` returns `{ outlines: CallOutline[] }` including `participants`, `sections`, `actionItems`, `topics`, `source`, `hasTranscript`, `derived`.
- New: `get_call_assets` returns `{ assets: Asset[] }` with embedded `brief` and `outline` when derivable.

### Client Features (Optional)
- Elicitation: Not required for v2. Keep design compatible to request user input (e.g., missing date ranges) if needed later.
- Sampling: Not required for v2. Brief/outline generation is deterministic; no model completions in server.

### Migration Plan (away from direct-HTTP scripts)
1) Deprecate `scripts/fetchTranscript.js` in README and code comments.
2) Replace with `scripts/getTranscriptsViaMCP.js` that calls `retrieve_transcripts` tool (mirroring existing MCP clients).
3) Move CLI wrappers (`getBrief.js`, `getOutline.js`, new transcript wrapper) into `examples/cli/` to clarify they are examples, not primary entrypoints.
4) Update `README.md` to emphasize using MCP tools directly from Cursor/agents; provide example `mcp.json` snippet.

### Developer Experience (DX)
- Clear README sections: setup, environment, tool catalog, examples for Cursor, Node, and HTTP-over-stdio.
- Example typed client snippet (TS) showing tool discovery and typed arguments.
- Consistent naming and return shapes; no surprises across tools.

### Testing Strategy
- Unit: normalizers (brief/outline) with fixtures for: transcript-only, summary-only, no data, and mixed trackers/topics.
- Integration: spin server, call tools with mock Gong HTTP via axios adapter; assert schemas and invariants.
- E2E (opt-in): gated by real creds; run limited, time-boxed calls and snapshot redacted outputs.

### Notifications & Capability Tests
- Verify server advertises `tools` + `resources` + `prompts` capabilities during initialize.
- Emit and observe `tools/list_changed` when enabling v2 tools; add test to ensure clients can refresh tool registry.

### Acceptance Criteria
- Direct tool calls (no scripts) in Cursor return valid brief/outline for a known call ID.
- `search_calls` can find DV360 call by title substring within date range.
- `get_call_assets` returns combined structure with consistent fields and provenance flags.
- Resources are discoverable via `resources/templates/list` and retrievable via `resources/read` for brief/outline/transcript/assets.
- Prompts are discoverable via `prompts/list` and retrievable via `prompts/get`.
- Logs are emoji-prefixed, minimal, and structured; no PII or secrets printed.
- README updated; examples live under `examples/cli/`.

### Security & Compliance
- Secrets from env only; never echoed. Redact any sensitive headers in error messages.
- Respect data minimization: only necessary fields returned; no raw audio.
- Add request ID correlation across sub-requests for traceability.

### Performance
- Parallelize Gong requests where possible; cap concurrency (e.g., 4–6).
- Cache short-lived call metadata (in-memory, TTL 60s) to reduce duplicate lookups within a single tool call.

### Implementation Steps
1) Add tools: `search_calls`, `get_call_assets`, `health`, `export_brief_markdown`.
2) Add resources: implement templates and `resources/list` + `resources/read` for brief/outline/transcript/assets.
3) Add prompts: `prompts/list` + `prompts/get` with 2–3 helpful templates.
4) Refactor gather logic to power `get_call_assets`; reuse by brief/outline builders.
5) Introduce structured logger with emoji prefixes.
6) Add retries/backoff, timeouts, and error envelopes.
7) Notifications: emit `tools/list_changed` on v2 enablement.
8) Tests: unit + integration (tools/resources/prompts) + minimal E2E.
9) Migrate scripts to `examples/cli` and add new transcript MCP example.
10) Docs pass: README + examples + deprecation notes.

### Example MCP Client Calls (Cursor)
```json
{ "tool": "get_call_brief", "arguments": { "callIds": ["7264530111852323899"] } }
```
```json
{ "tool": "search_calls", "arguments": { "query": "DV360", "fromDateTime": "2025-10-01T00:00:00Z", "toDateTime": "2025-10-04T00:00:00Z" } }
```

### Rollout
- Phase 1 (day 1–2): implement `search_calls`, logging, and tests.
- Phase 2 (day 3–4): implement `get_call_assets`, retries/timeouts, docs.
- Phase 3 (day 5): migrate examples, deprecate legacy script, acceptance run.

---

## IMPLEMENTATION NOTES (Oct 6, 2025)

### Completed (v0.2.0)

✅ **Core MCP Primitives**
- Added `InitializeRequestSchema` handler with proper capability negotiation
- Declared capabilities: `tools` (listChanged: true), `resources` (listChanged: false), `prompts` (listChanged: false)
- Server now properly advertises MCP protocol version 2024-11-05

✅ **Resources Layer** (`src/resources.ts`)
- Implemented 4 resource templates:
  - `gong://call/{callId}/brief.json` (application/json)
  - `gong://call/{callId}/outline.json` (application/json)
  - `gong://call/{callId}/transcript.txt` (text/plain)
  - `gong://call/{callId}/assets.json` (application/json, combined payload)
- Added `ListResourceTemplatesRequestSchema`, `ListResourcesRequestSchema`, `ReadResourceRequestSchema` handlers
- Resources reuse existing `buildBrief`/`buildOutline` normalizers - no duplication

✅ **Prompts Layer** (`src/prompts.ts`)
- Implemented 3 prompt templates:
  - `find-dv360-call` (search by query + date range)
  - `summarize-call` (generate brief/outline/assets)
  - `compare-calls` (analyze multiple calls)
- Added `ListPromptsRequestSchema` and `GetPromptRequestSchema` handlers
- Prompts return structured user messages with instructions and examples

✅ **New Tools**
- `search_calls`: Filters calls by query/keywords (client-side filtering after list_calls)
- `get_call_assets`: Combined brief+outline+metadata in single call (reduces round-trips)
- `health`: Sanity check for Gong API connectivity (10s timeout)

✅ **Error Handling** (`src/errors.ts`)
- `GongMcpError` class with `code`, `message`, `retryAfter?` fields
- `formatErrorResponse`: Consistent error envelopes in all tool responses
- `withRetry`: Exponential backoff for 429/502/503/504 errors (max 3 attempts, jitter)
- `withTimeout`: 30s default timeout per Gong request (10s for health)
- All tool handlers wrapped in try/catch → `formatErrorResponse`

✅ **Structured Logging** (`src/logger.ts`)
- Emoji-prefixed levels: 🔧 INFO, ⚠️ WARN, ❌ ERROR
- Single-line JSON for metadata-rich logs
- `logToolCall` method: tracks tool name, latency, callIds, status
- No PII/secrets logged (redact helper for sensitive keys)

✅ **Migration & Documentation**
- Scripts moved to `examples/cli/` (updated paths in getBrief.js, getOutline.js)
- Comprehensive README.md (v0.2.0) emphasizing MCP-first workflows
- Examples showcase tools, resources, and prompts in Cursor/Claude Desktop

### Architecture Decisions

1. **Resources vs Tools**: Resources provide addressable URIs for lazy loading; Tools perform actions. Brief/outline data is exposed via both (tools for batch operations, resources for single-call references).

2. **No export_brief_markdown yet**: Deferred to future iteration. Markdown generation can be done client-side or via prompt templates.

3. **No Notifications yet**: `tools/list_changed` declared in capabilities but not emitted. Will add when tool set becomes dynamic (e.g., conditional based on Gong features).

4. **Client-side filtering for search_calls**: Current implementation fetches all calls in date range, then filters by query. Future: push filtering to Gong API if supported.

5. **Parallel fetches in gatherCallContexts**: Existing implementation already parallelizes `retrieveTranscripts` + `retrieveCallDetails` via `Promise.all` - no changes needed.

### Testing Notes

- Build: ✅ TypeScript compiles cleanly (no errors)
- Manual smoke test pending: requires Gong API credentials
- Integration test suite: TODO (mock axios adapter, fixtures for transcript/summary/no-data cases)
- E2E test: TODO (gated by GONG_E2E_TEST env var)

### Next Steps (Future Iterations)

- [ ] Add `export_brief_markdown` tool (low priority - can be done via prompts)
- [ ] Emit `tools/list_changed` notification on dynamic updates
- [ ] Add pagination support to `search_calls` (if Gong supports)
- [ ] Write unit tests for normalizers (fixtures)
- [ ] Integration tests with mocked Gong API
- [ ] Performance: add in-memory cache (TTL 60s) for call metadata

### Files Modified/Added

**Added:**
- `src/logger.ts` (93 lines) - Structured logging
- `src/errors.ts` (176 lines) - Error handling, retry, timeout
- `src/resources.ts` (147 lines) - Resource templates & read handler
- `src/prompts.ts` (136 lines) - Prompt definitions

**Modified:**
- `src/index.ts` (+300 lines) - Initialize, resources, prompts, new tools, error handling
- `examples/cli/getBrief.js` (path fix)
- `examples/cli/getOutline.js` (path fix)
- `README.md` (complete rewrite, 359 lines)

**Unchanged:**
- `src/normalizers.ts` (650 lines) - Already correct; reused by resources

### Build Output

```bash
npm run build
> tsc
✅ Success (no errors)
```

---

**Implementation complete. Ready for acceptance testing in Cursor/Claude Desktop.**


