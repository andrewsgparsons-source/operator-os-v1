import { pool } from "./database.js";
import { embedText, embeddingToSqlVector } from "./embeddings.js";

export type MemoryAddInput = {
  text: string;
  type: string;
  metadata?: Record<string, unknown>;
};

export type MemorySearchInput = {
  query: string;
  limit?: number;
};

export type DecisionLogInput = {
  decision: string;
  context: string;
  options: string[];
  chosen: string;
};

export async function memoryAdd(input: MemoryAddInput) {
  const embedding = await embedText(input.text);
  const vectorLiteral = embeddingToSqlVector(embedding);

  const result = await pool.query(
    `
      INSERT INTO memories (text, type, metadata, embedding)
      VALUES ($1, $2, $3::jsonb, $4::vector)
      RETURNING id, type, created_at;
    `,
    [input.text, input.type, JSON.stringify(input.metadata ?? {}), vectorLiteral]
  );

  return {
    id: result.rows[0].id,
    type: result.rows[0].type,
    createdAt: result.rows[0].created_at,
  };
}

export async function memorySearch(input: MemorySearchInput) {
  const limit = Math.max(1, Math.min(input.limit ?? 5, 20));
  const queryEmbedding = await embedText(input.query);
  const vectorLiteral = embeddingToSqlVector(queryEmbedding);

  const result = await pool.query(
    `
      SELECT
        id,
        text,
        type,
        metadata,
        created_at,
        1 - (embedding <=> $1::vector) AS similarity
      FROM memories
      ORDER BY embedding <=> $1::vector
      LIMIT $2;
    `,
    [vectorLiteral, limit]
  );

  return result.rows.map((r) => ({
    id: r.id,
    text: r.text,
    type: r.type,
    metadata: r.metadata,
    createdAt: r.created_at,
    similarity: Number(r.similarity),
  }));
}

export async function decisionLog(input: DecisionLogInput) {
  const result = await pool.query(
    `
      INSERT INTO decisions (decision, context, options, chosen)
      VALUES ($1, $2, $3::jsonb, $4)
      RETURNING id, created_at;
    `,
    [input.decision, input.context, JSON.stringify(input.options), input.chosen]
  );

  return {
    id: result.rows[0].id,
    decision: input.decision,
    chosen: input.chosen,
    createdAt: result.rows[0].created_at,
  };
}
