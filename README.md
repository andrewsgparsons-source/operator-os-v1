# Operator OS v1

Phone-first AI Operator System (Dispatch/Deep, async jobs, operator-first UX).

## Current status
- ✅ Architecture baseline (`docs/SYSTEM_ARCHITECTURE_V1.md`)
- ✅ MCP shared-memory server v1 scaffold (`mcp-server/`)

## MCP v1 scope
- Tools:
  - `memory_add`
  - `memory_search`
  - `decision_log`
- Storage: local Postgres + pgvector
- Embeddings: OpenAI `text-embedding-3-small`
- Transport: MCP `stdio`

## Quick start
1. Follow `docs/SETUP.md`
2. Build/run server in `mcp-server/`
3. Connect agents using `config/mcp-config.json`

## Docs
- `docs/SYSTEM_ARCHITECTURE_V1.md`
- `docs/ARCHITECTURE.md`
- `docs/SETUP.md`
- `docs/CONTACTS.md`
- `docs/SCHEDULING_PROTOCOL.md`
- `docs/SCHEDULE.md`
