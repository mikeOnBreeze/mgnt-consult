## Gong Upgrade Plan (MCP + Dashboard)

### Key product outcomes (from discovery-1006.md)
- **Admin-led V1**: Start with an admin view to define initial reports and controls; expand later if needed.
- **Personas**: Executive, product leader, team lead, product manager – different deliverables per persona.
- **Deliverables**:
  - Executives: brief headline plus up to 5 takeaways, each with a few substantiating points; trend changes highlighted; links to source.
  - PMs/leads: detailed summaries ("kitchen sink") with references and links back to Gong.
- **Queryable/searchable corpus**: Build a searchable corpus of Gong calls and transcripts; combine/filter by topic, product area, company, and time.
- **Taxonomy and context files**:
  - Pre-populated industry topics/trackers relevant to Magnite.
  - Static glossary for V1 (terms, variations, disambiguation: e.g., "live TV" vs. generic "live").
  - Top clients lists by category with aliases/aka mappings.
  - Magnite products/platforms dictionary (proper names vs. common words: e.g., Curator vs. curation).
- **Report builder concept**: Configure topic(s), personas, frequency, length, and routing (email initially).
- **Validation reports (V1 examples)**: Live Sports (Exec + PM views), Curator, DSP/competitor-focused report.
- **Trend synthesis**: Identify changes over time and "heating up" signals (future V2/V3 enhancement).
- **External sources**: Optional future extension (news/blogs/LinkedIn) to enrich insights.
- **Dashboard**: Browse/search calls, configure topics/clients, preview persona-specific summaries, and manage schedules.

---

### Imy implemented in `gong-mcp`:
  - `Authorization: Basic <base64(accessKey:accessSecret)>`
  - `X-Gong-AccessKey`, `X-Gong-Timestamp`, `X-Gong-Signature`
- Env vars: `GONG_ACCESS_KEY`, `GONG_ACCESS_SECRET` (align `.env`).

2) **Core data ingestion**
- Calls index:
  - GET `/v2/calls` with `fromDateTime`/`toDateTime` and pagination (confirm `pageToken`/`limit` for tenant).
  - Persist canonical call records (id, title, timestamps, participants, url, etc.).
- Transcripts and analytics:
  - POST `/v2/calls/transcript` with `filter.callIds` and flags (`includeEntities`, `includeInteractionsSummary`, `includeTrackers`).
  - Normalize to internal schema: speakers, sentences (timestamps), topics/entities, trackers, interaction summaries.

3) **Supplemental metadata (verify in tenant docs)**
- Users/Teams directory: retrieve users and teams to power filtering and routing (e.g., owner/team views).
- Trackers catalog: fetch tracker definitions if exposed; otherwise derive from transcripts + maintain our own taxonomy.
- Comments/scorecards: pull call comments and scorecards where available to enrich PM-level detail.
- Webhooks: subscribe to call-completed (or equivalent) to incrementally ingest new calls.

4) **Throughput, limits, and reliability**
- Honor limits (3 req/s, 10k/day). Implement exponential backoff on 429 with `Retry-After`.
- Paging strategy with resumable cursors; nightly backfill + incremental ingest via webhooks or polling.

5) **Storage & indexing**
- Start simple (SQLite/Postgres). Tables: `calls`, `participants`, `transcripts`, `sentences`, `entities`, `trackers`, `comments`.
- Add full‑text index on sentences; facet indices on date, product area, company, topic.

6) **Summarization pipeline**
- Persona templates (Exec vs PM) to control brevity vs depth; include links back to Gong call pages.
- Prompt context includes: taxonomy (topics/trackers), glossary disambiguation, top clients weighting, Magnite product dictionary.
- Generate two deliverables per configured report (Exec + PM) as needed.

7) **Scheduling & delivery**
- Scheduler (cron/worker) to generate and email reports (daily/weekly). Allow per-report frequency and max length controls.
- Log delivery outcomes and link to dashboard preview.

8) **Dashboard (V1 skeleton)**
- Views: Calls list/search, Report configurations, Taxonomy (topics/trackers), Clients & aliases, Glossary & products.
- Preview summaries per persona; export/share via email.
- Follow `magnite-style-guide.md` for UI patterns.

9) **MCP tool surface (next additions)**
- `list_calls` → add pagination params and validation.
- `retrieve_transcripts` → map/return normalized summaries and trackers in addition to raw.
- New tools to consider: `list_users`, `list_teams`, `list_trackers` (if available), `get_call_comments`, `subscribe_webhook` (if applicable).

10) **Validation & ops**
- Curl tests for `/v2/calls` and `/v2/calls/transcript` against tenant docs.
- Secrets management and rotation; ensure `.gitignore` and no secrets committed.

#### Implementation note (2025-10-07)
- Confirmed `gong/gong-mcp/.env` is ignored by both root and package `.gitignore`:
  - Root `.gitignore` includes `.env` patterns and preserves `.env.example`.
  - `gong/gong-mcp/.gitignore` explicitly ignores `.env`, `.env.local`, and `.env.*.local`.
- Verified with Git: file is ignored and not tracked. Keep using `.env.example` for sharing variable names.

---

### Open questions to confirm in tenant docs
- Exact pagination mechanics for `/v2/calls` (token/limit names, max page size).
- Transcript payload fields across tenants; required/optional flags for entities/trackers.
- Availability of endpoints for users/teams, tracker definitions, comments, and scorecards.
- Webhook event types and signature verification method.
- Licensing constraints for read-only users vs API access.

---

### Next actions (V1)
- Align env vars: update `gong/.env` to `GONG_ACCESS_KEY` and `GONG_ACCESS_SECRET`.
- Extend `list_calls` with pagination + backoff; add basic persistence layer.
- Implement `retrieve_transcripts` normalization and index creation for search.
- Draft persona templates (Exec, Product leader, Team lead, PM) and wire to generator.
- Seed context files: topics/trackers, glossary, top clients with aliases, Magnite products dictionary.

### Implementation notes (2025-10-06)
- Added `gong/gong-mcp/scripts/fetchTranscript.js` to programmatically pull transcripts by call ID.
- Script signs requests (HMAC SHA-256) and persists plaintext to `gong/transcripts/<callId>.txt` using `[m:ss] speakerId: text` format.
- Fetched call `2690478949481680343` (Amazon / Magnite - Bi-Weekly); current tenant API returned no transcript blocks, saved empty file for traceability.
 - Fetched call `7264530111852323899` (Magnite-DV360 Working Group: Live & Formats); no transcript blocks returned; verified output saved to `gong/transcripts/7264530111852323899.txt`.
 - Fixed script output path resolution to ensure files write to `gong/transcripts/` (previously could resolve to workspace root `transcripts/`).

#### Cursor onboarding helpers (2025-10-06)
- Added a "Quick Cursor Setup" section in `gong/gong-mcp/README.md` for beginners.
- Updated to prefer repo-shipped relative `.cursor/mcp.json` (no path editing needed when opening repo root). Includes: `.env` fill, reload steps, health check, troubleshooting, and when to run `npm install && npm run build`.

