import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { ensureSchema, closeDb } from "./database.js";
import { decisionLog, memoryAdd, memorySearch } from "./tools.js";

const server = new Server(
  {
    name: "operator-os-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const tools: Tool[] = [
  {
    name: "memory_add",
    description: "Add a memory entry with embedding and metadata.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string" },
        type: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["text", "type"],
    },
  },
  {
    name: "memory_search",
    description: "Semantic search over memories.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "decision_log",
    description: "Log a decision with options and chosen outcome.",
    inputSchema: {
      type: "object",
      properties: {
        decision: { type: "string" },
        context: { type: "string" },
        options: {
          type: "array",
          items: { type: "string" },
        },
        chosen: { type: "string" },
      },
      required: ["decision", "context", "options", "chosen"],
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "memory_add") {
      const result = await memoryAdd({
        text: String(args?.text ?? ""),
        type: String(args?.type ?? "note"),
        metadata: (args?.metadata as Record<string, unknown>) ?? {},
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    }

    if (name === "memory_search") {
      const result = await memorySearch({
        query: String(args?.query ?? ""),
        limit: Number(args?.limit ?? 5),
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    }

    if (name === "decision_log") {
      const result = await decisionLog({
        decision: String(args?.decision ?? ""),
        context: String(args?.context ?? ""),
        options: Array.isArray(args?.options)
          ? (args?.options as string[])
          : [],
        chosen: String(args?.chosen ?? ""),
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    }

    return {
      isError: true,
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      isError: true,
      content: [{ type: "text", text: message }],
    };
  }
});

async function main() {
  await ensureSchema();

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(async (err) => {
  console.error("MCP server failed", err);
  await closeDb();
  process.exit(1);
});
