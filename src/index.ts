// Import the required MCP modules
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { v7 as uuidv7 } from 'uuid';
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Create the server
const server = new Server({
  name: "uuid-mcp-provider",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {} // We're only providing tools functionality
  }
});

// Register the tools/list endpoint to advertise our generateUuid tool
server.setRequestHandler(
  ListToolsRequestSchema,
  async () => {
    return {
      tools: [
        {
          name: "generateUuid",
          description: "Generate a UUID v7 that's timestamp-based and guaranteed to be unique",
          inputSchema: {
            type: "object",
            properties: {}
          }
        }
      ]
    };
  }
);

// Register the tools/call endpoint to handle tool execution
server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    if (request.params.name === "generateUuid") {
      // UUID v7 is timestamp-based with additional random data for uniqueness
      const uuid = uuidv7();

      return {
        content: [
          {
            type: "text",
            text: uuid
          }
        ]
      };
    }

    throw new Error(`Unknown tool: ${request.params.name}`);
  }
);

// Start the server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("UUID MCP Provider running on stdio...");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();
