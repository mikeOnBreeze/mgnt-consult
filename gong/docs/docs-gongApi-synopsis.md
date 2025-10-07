## Gong API | Developer Notes for MCP Integration

This document summarizes how to work with the Gong API for our MCP-based integration. It covers auth, endpoints, rate limits, webhooks considerations, and how this repo’s `gong/gong-mcp` server is wired. Keep this doc updated as we evolve the integration.

### Core Links
- Public API docs for our tenant: `https://us-78146.app.gong.io/settings/api/documentation#overview`
- What the Gong API provides: [help.gong.io](https://help.gong.io/docs/what-the-gong-api-provides)
- Receive access to the API (keys): [help.gong.io](https://help.gong.io/docs/receive-access-to-the-api)
- Create an app / OAuth: [help.gong.io](https://help.gong.io/docs/create-an-app-for-gong)
- Developers Hub overview: [help.gong.io](https://help.gong.io/docs/how-to-use-the-gong-developers-hub)
- CRM API integration guide: [help.gong.io](https://help.gong.io/docs/manage-your-crm-api-integration)
- Unofficial “perform API call” how-to (reference only): [Wrk support](https://support.account.wrk.com/en/articles/10290133-perform-an-api-call-in-gong)

### Capabilities (high-level)
- Retrieve conversation/call data and analyzed artifacts (participants, topics, trackers, comments, scorecards, transcripts).
- Upload external recordings for transcription/analysis.
- Access user/team activity data.
- Integrate CRM data for enriched analytics and deal insights.

References: `https://us-78146.app.gong.io/settings/api/documentation#overview`, [help.gong.io overview](https://help.gong.io/docs/what-the-gong-api-provides)

### Authentication
Gong supports two main patterns:
- API Key auth (Access Key + Access Secret), provisioned by a Gong admin: [receive access](https://help.gong.io/docs/receive-access-to-the-api)
- OAuth 2.0 for apps intended for distribution/listing: [create app / OAuth](https://help.gong.io/docs/create-an-app-for-gong)

For our MCP server (`gong/gong-mcp`), we currently use key-based auth via environment variables.

Environment variables expected by the server:
- `GONG_ACCESS_KEY`
- `GONG_ACCESS_SECRET`

Note: The repo’s `gong/.env` currently contains `GONG_API_KEY` but the MCP server expects `GONG_ACCESS_KEY` and `GONG_ACCESS_SECRET`. Align these before running. Do not commit secrets.

### Rate Limits
- 3 requests/second
- 10,000 requests/day

Handle HTTP 429 responses by respecting the `Retry-After` header before retrying.

References: [help.gong.io overview](https://help.gong.io/docs/what-the-gong-api-provides)

### Base URL
- `https://api.gong.io/v2`

### Endpoints used by our MCP server
The MCP server (see `gong/gong-mcp/src/index.ts`) currently integrates two flows:

1) List calls
   - Method: GET
   - Path: `/calls`
   - Query params (optional):
     - `fromDateTime` ISO8601 (e.g. `2024-03-01T00:00:00Z`)
     - `toDateTime` ISO8601 (e.g. `2024-03-31T23:59:59Z`)

2) Retrieve transcripts for specific calls
   - Method: POST
   - Path: `/calls/transcript`
   - Body shape (example):
```json
{
  "filter": {
    "callIds": ["CALL_ID_1", "CALL_ID_2"],
    "includeEntities": true,
    "includeInteractionsSummary": true,
    "includeTrackers": true
  }
}
```

Important: Confirm final payload shape against your tenant’s API documentation (`https://us-78146.app.gong.io/settings/api/documentation#overview`) as Gong occasionally evolves fields for certain orgs/feature sets.

### Example Requests

List calls (time-bounded):
```bash
curl -s \
  -H "Authorization: Basic $(printf "%s:%s" "$GONG_ACCESS_KEY" "$GONG_ACCESS_SECRET" | base64)" \
  -H "Content-Type: application/json" \
  "https://api.gong.io/v2/calls?fromDateTime=2025-10-01T00:00:00Z&toDateTime=2025-10-06T23:59:59Z"
```

Retrieve transcripts (specific calls):
```bash
curl -s -X POST \
  -H "Authorization: Basic $(printf "%s:%s" "$GONG_ACCESS_KEY" "$GONG_ACCESS_SECRET" | base64)" \
  -H "Content-Type: application/json" \
  -d '{
        "filter": {
          "callIds": ["REPLACE_WITH_CALL_ID"],
          "includeEntities": true,
          "includeInteractionsSummary": true,
          "includeTrackers": true
        }
      }' \
  "https://api.gong.io/v2/calls/transcript"
```

Note: Our MCP implementation also computes an HMAC signature header set (see below). If your tenant doesn’t require these headers, Basic auth may be sufficient. Verify against the tenant docs page above.

### Headers and Signature (current MCP assumptions)
Our server currently sets:
- `Authorization: Basic <base64(accessKey:accessSecret)>`
- `X-Gong-AccessKey: <accessKey>`
- `X-Gong-Timestamp: <ISO8601>`
- `X-Gong-Signature: <HMAC-SHA256>` over a string: `method\npath\ntimestamp\n<JSON(params_or_body)>`

This matches our working assumption for signed requests. Cross-check with your org’s API docs page for exact requirements.

### Pagination & Filtering
- Calls listing endpoints often support pagination. Our initial MCP tool (`list_calls`) doesn’t implement paging yet—add `pageToken`/`limit` or Gong-equivalents once confirmed in the tenant docs.
- Always pass ISO8601 timestamps. Validate server timezone assumptions.

### Error Handling
- `401/403` → Auth or permission issue (check keys/scopes)
- `404` → Resource not found (call ID or feature not enabled)
- `429` → Rate limit exceeded; honor `Retry-After`
- `5xx` → Transient server issues; implement backoff

### Webhooks (Heads-up)
If you enable Gong webhooks for event-driven workflows, ensure:
- HTTPS endpoint with verification (HMAC or signed challenge as documented by Gong)
- Retries/backoff handling
- Idempotency for event processing

Consult your tenant docs (`#overview` page) and Developers Hub for webhook specifics: [help.gong.io](https://help.gong.io/docs/how-to-use-the-gong-developers-hub)

### MCP Server (in this repo)
Location: `gong/gong-mcp`

- Tools exposed:
  - `list_calls(fromDateTime?, toDateTime?)`
  - `retrieve_transcripts(callIds: string[])`
- Environment variables required:
  - `GONG_ACCESS_KEY`
  - `GONG_ACCESS_SECRET`
- Start (local):
  - `npm install && npm run build && npm start`
- Docker build/run example in `gong/gong-mcp/README.md`.
- MCP client setup example (Claude Desktop) is in that README; supply env vars at runtime.

### Security Notes
- Store keys in `.env` locally; use a secrets manager in CI/CD.
- Rotate keys periodically and on personnel changes.
- Avoid committing secrets; verify `.gitignore` coverage.

### Quick Checklist for Future Agents
- Confirm API access in Admin Center and generate keys: [receive access](https://help.gong.io/docs/receive-access-to-the-api)
- Verify required headers on `https://us-78146.app.gong.io/settings/api/documentation#overview`
- Set `GONG_ACCESS_KEY` and `GONG_ACCESS_SECRET` in the runtime env
- Test `GET /v2/calls` and `POST /v2/calls/transcript` with curl
- Respect rate limits (3/s, 10k/day) and implement retries on 429
- Add pagination handling to `list_calls` when needed
- If enabling webhooks, implement verification + retries

### Citations
- `https://us-78146.app.gong.io/settings/api/documentation#overview`
- [What the Gong API provides](https://help.gong.io/docs/what-the-gong-api-provides)
- [Receive access to the API](https://help.gong.io/docs/receive-access-to-the-api)
- [Create an app for Gong (OAuth)](https://help.gong.io/docs/create-an-app-for-gong)
- [Developers Hub](https://help.gong.io/docs/how-to-use-the-gong-developers-hub)
- [CRM API integration](https://help.gong.io/docs/manage-your-crm-api-integration)
- [Wrk: perform an API call in Gong](https://support.account.wrk.com/en/articles/10290133-perform-an-api-call-in-gong)


