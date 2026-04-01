# Setup — Operator OS MCP v1

## 1) Start Postgres with pgvector
Use local Postgres with pgvector enabled.

**Option A: Supabase (Recommended for cross-agent sharing)**
- Create free account at https://supabase.com
- Create new project
- Enable pgvector extension (see step 2)
- Copy connection string (Settings → Database → Connection String)

**Option B: Local Docker**
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
# Edit config/.env with DATABASE_URL (REQUIRED)
# OPENAI_API_KEY is OPTIONAL - if not provided, uses lexical search
```

**Database URL format:**
```
# Supabase
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres

# Local
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/operator_os
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

---

## Search Modes

**V1 (Keyless):** Lexical search via ILIKE pattern matching
- Works without OPENAI_API_KEY
- Case-insensitive substring matching
- Sufficient for MVP cross-agent sharing

**V1.1 (Semantic):** Vector similarity search via pgvector
- Requires OPENAI_API_KEY in .env
- Better relevance ranking
- Future enhancement
