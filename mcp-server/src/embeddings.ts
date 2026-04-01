import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: new URL("../../config/.env", import.meta.url).pathname });

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.EMBEDDING_MODEL || "text-embedding-3-small";

// Initialize client only if API key is provided
const client = apiKey ? new OpenAI({ apiKey }) : null;

/**
 * Generate embedding for text. Returns null if no OpenAI key configured.
 * Enables keyless operation with lexical search fallback.
 */
export async function embedText(text: string): Promise<number[] | null> {
  if (!client) {
    return null; // Keyless mode - no embeddings
  }

  const response = await client.embeddings.create({
    model,
    input: text,
  });

  return response.data[0].embedding;
}

export function embeddingToSqlVector(embedding: number[] | null): string | null {
  if (!embedding) return null;
  return `[${embedding.join(",")}]`;
}
