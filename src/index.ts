#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import debug from 'debug';

const log = debug('mcp-todo-server');
log.enabled = true;

process.env.DEBUG = 'mcp-todo-server:*';

log('Starting Todo MCP Server...');

// Create MCP server instance
const server = new McpServer({
  name: "Todo MCP Server",
  version: "1.0.0",
});

log('Server instance created');

// Define todo interface
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Add todo resource
server.resource(
  "todo",
  "todo://{id}",
  async (uri: URL, extra) => {
    log(`Resource endpoint called with URI: ${uri.href}`);
    try {
      const id = uri.pathname.split('/').pop();
      log(`Fetching todo with ID: ${id}`);
      const response = await axios.get<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      log('Todo fetched successfully:', response.data);
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('Error fetching todo:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch todo: ${error.message}`);
      }
      throw new Error("Failed to fetch todo: Unknown error");
    }
  }
);

log('Resource endpoint registered');

// Add todo tool
server.tool("getTodo", { id: z.string() }, async ({ id }) => {
  log(`Tool endpoint called with ID: ${id}`);
  try {
    log(`Fetching todo with ID: ${id}`);
    const response = await axios.get<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    log('Todo fetched successfully:', response.data);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching todo:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      content: [
        {
          type: "text",
          text: `Error: Failed to fetch todo: ${message}`,
        },
      ],
      isError: true,
    };
  }
});

log('Tool endpoint registered');

// Add todo prompt
server.prompt("todoPrompt", "Generate insights about a todo item", async (extra) => {
  log('Prompt endpoint called');
  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: "Please analyze this todo item and provide insights about its completion status.",
        },
      },
    ],
  };
});

log('Prompt endpoint registered');

// Connect server using stdio transport
const transport = new StdioServerTransport();
log('Connecting to transport...');

// Write directly to stderr for critical messages
process.stderr.write('MCP Todo Server starting...\n');

await server.connect(transport);
log('Server connected and ready to handle requests');
process.stderr.write('MCP Todo Server ready!\n');
