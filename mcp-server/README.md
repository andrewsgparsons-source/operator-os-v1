# Operator OS MCP Server (v1)

Implements shared-memory MCP tools for cross-agent context sharing.

## Tools
- `memory_add`
- `memory_search`
- `decision_log`

## Run
```bash
cd mcp-server
npm install
npm run build
npm start
```

Protocol: `stdio`

## Required env
Copy `config/.env.example` to `config/.env` and set:
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `EMBEDDING_MODEL` (optional)

## Quick test
```bash
cd mcp-server
npm run test:tools
```
