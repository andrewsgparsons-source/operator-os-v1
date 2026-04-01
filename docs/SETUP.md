# Setup — Operator OS MCP v1

## 1) Start Postgres with pgvector
Use local Postgres with pgvector enabled.

Example (Docker):
```bash
docker run --name operator-os-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=operator_os \
  -p 5432:5432 \
  -d pgvector/pgvector:pg16
```

## 2) Configure environment
```bash
cp config/.env.example config/.env
# edit config/.env with real OPENAI_API_KEY
```

## 3) Install/build server
```bash
cd mcp-server
npm install
npm run build
```

## 4) Run server
```bash
npm start
```

## 5) Run tool smoke test
```bash
npm run test:tools
```

## 6) MCP connection config
Use `config/mcp-config.json` as a starting template for clients.
