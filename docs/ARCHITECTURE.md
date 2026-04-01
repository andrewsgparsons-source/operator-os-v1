# MCP Shared Memory Architecture (v1)

## Purpose
Expose shared memory and decision logging via MCP so multiple agents can read/write the same context layer.

## Components
- MCP Server (`mcp-server/src/index.ts`) using stdio transport
- Postgres + pgvector for memory and semantic search
- OpenAI embeddings (`text-embedding-3-small`) for vectorization

## Data path
1. Agent calls MCP tool (`memory_add`, `memory_search`, `decision_log`)
2. Server validates params and executes tool handler
3. Tool handler writes/reads Postgres
4. Results returned as JSON text payloads to client

## Persistence guarantee
All memory and decision writes are persisted in Postgres and queryable later.
