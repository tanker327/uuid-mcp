# UUID MCP Provider

[![npm version](https://img.shields.io/npm/v/uuid-mcp.svg)](https://www.npmjs.com/package/uuid-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple Model Context Protocol (MCP) server that provides timestamp-based UUIDs whenever it's called by an LLM.

## Features

- Provides a single tool: `generateUuid`
- Uses UUID v7 for timestamp-based unique identifiers
- Simple interface with no input parameters needed
- Easy integration with Claude and other LLMs

## Installation

```bash
# Install from NPM
npm install uuid-mcp

# Or install from source
git clone https://github.com/tanker327/uuid-mcp.git
cd uuid-mcp
npm install
npm run build
```

## Usage

You can run the server directly:

```bash
npm start
```

### Integration with Claude Desktop

To integrate with Claude Desktop, add this to your Claude Desktop configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "uuid-provider": {
      "command": "node",
      "args": ["/absolute/path/to/uuid-mcp/build/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/uuid-mcp/build/index.js` with the absolute path to your built index.js file.

After updating the configuration, restart Claude Desktop to see the UUID generation tool available.

## How It Works

This server uses the official `uuid` package to generate UUID v7 identifiers. UUID v7 is specifically designed to be timestamp-based while maintaining strong uniqueness guarantees:

- Incorporates a Unix timestamp in millisecond precision
- Adds randomized data to ensure uniqueness even when multiple IDs are generated in the same millisecond
- Follows the latest RFC standards for UUID generation
- Provides chronologically sortable identifiers
- Prevents collisions in distributed systems

This approach is more reliable than custom UUID implementations and eliminates the potential for duplicates even under high load.

## Dependencies

- `@modelcontextprotocol/sdk`: For MCP server implementation
- `uuid`: For RFC-compliant UUID generation
- TypeScript and related tools for development

## Example

When called, the tool returns a UUID v7 string that looks like:

```
018e94d2-279b-7bd3-9289-80d1e6619670
```

The first part of the UUID contains the timestamp, making these identifiers chronologically sortable while still maintaining the standard UUID format.
