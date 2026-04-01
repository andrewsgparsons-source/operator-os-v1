import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: new URL("../../config/.env", import.meta.url).pathname });

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required in config/.env");
}

const model = process.env.EMBEDDING_MODEL || "text-embedding-3-small";
const client = new OpenAI({ apiKey });

export async function embedText(text: string): Promise<number[]> {
  const response = await client.embeddings.create({
    model,
    input: text,
  });

  return response.data[0].embedding;
}

export function embeddingToSqlVector(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}
