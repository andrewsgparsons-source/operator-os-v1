import { ensureSchema, closeDb } from "../mcp-server/src/database.js";
import { memoryAdd, memorySearch, decisionLog } from "../mcp-server/src/tools.js";

async function run() {
  await ensureSchema();

  const added = await memoryAdd({
    text: "James wrote: MCP shared memory should support cross-agent retrieval.",
    type: "note",
    metadata: { source: "test-script", actor: "james" },
  });
  console.log("memory_add:", added);

  const found = await memorySearch({
    query: "shared memory cross-agent retrieval",
    limit: 3,
  });
  console.log("memory_search:", found);

  const logged = await decisionLog({
    decision: "Use local Postgres + pgvector for MCP v1",
    context: "Operator OS MCP build",
    options: ["Supabase", "Local Postgres + pgvector"],
    chosen: "Local Postgres + pgvector",
  });
  console.log("decision_log:", logged);

  await closeDb();
}

run().catch(async (err) => {
  console.error(err);
  await closeDb();
  process.exit(1);
});
