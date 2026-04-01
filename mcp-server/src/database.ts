import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: new URL("../../config/.env", import.meta.url).pathname });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required in config/.env");
}

export const pool = new Pool({ connectionString });

export async function ensureSchema() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS memories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      text TEXT NOT NULL,
      type TEXT NOT NULL,
      metadata JSONB DEFAULT '{}'::jsonb,
      embedding VECTOR(1536),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS decisions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      decision TEXT NOT NULL,
      context TEXT NOT NULL,
      options JSONB NOT NULL,
      chosen TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at DESC);
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_decisions_created_at ON decisions(created_at DESC);
  `);
}

export async function closeDb() {
  await pool.end();
}
