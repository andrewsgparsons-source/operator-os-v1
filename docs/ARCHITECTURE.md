# MCP Shared Memory Architecture (v1)

## Purpose
Expose shared memory and decision logging via MCP so multiple agents can read/write the same context layer.

## Components
- MCP Server (`mcp-server/src/index.ts`) using stdio transport
- Postgres + pgvector for memory storage
- Optional OpenAI embeddings (`text-embedding-3-small`) for semantic search

## Search Modes

### V1 Baseline (Keyless - Current)
- **No OPENAI_API_KEY required**
- Lexical search via ILIKE pattern matching
- `memory_add`: stores text, type, metadata (embedding = NULL)
- `memory_search`: case-insensitive substring search
- Similarity score: 0.9 for exact matches, 0.5 for partial
- Sufficient for MVP cross-agent memory sharing

### V1.1 Enhancement (Semantic - Future)
- Requires OPENAI_API_KEY in .env
- Generates embeddings on write
- Vector similarity search on read
- Better relevance ranking
- Deferred until OAuth-compatible embedding path chosen

## Data path
1. Agent calls MCP tool (`memory_add`, `memory_search`, `decision_log`)
2. Server validates params and executes tool handler
3. Tool handler writes/reads Postgres
4. Results returned as JSON text payloads to client

## Persistence guarantee
All memory and decision writes are persisted in Postgres and queryable later.

## Tool contracts (stable)
- `memory_add(text, type, metadata)` → `{id, type, createdAt}`
- `memory_search(query, limit?)` → `[{id, text, type, metadata, createdAt, similarity}]`
- `decision_log(decision, context, options, chosen)` → `{id, decision, chosen, createdAt}`

Tool signatures remain unchanged between search modes.
