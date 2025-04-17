# MCP Todo Server

A TypeScript-based server implementation for managing todos, built with the Model Context Protocol (MCP) SDK.

## Description

This project provides a server implementation that allows interaction with a todo management system. It integrates with the Model Context Protocol SDK and provides functionality to fetch and manage todo items.

## Features

- Todo item retrieval by ID
- Integration with MCP SDK
- TypeScript support
- Development mode with hot reloading
- Built-in debugging capabilities

## Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager
- Cursor IDE
- Claude Desktop App

## Installation

```bash
# Clone the repository
git clone git@github.com:jrmatos/mcp-server.git
cd mcp-todo-server

# Install dependencies
yarn install

# Build and link the package
yarn build:binary
```

## Installing in Cursor and Claude Desktop

1. First, ensure you have built and linked the package using `yarn build:binary`

2. In Cursor:
   - Open Settings
   - Navigate to the Extensions or MCP section
   - Click "Add MCP"
   - Enter `mcp-todo-server` as the package name
   - The MCP will be automatically detected since it's linked globally

3. In Claude Desktop:
   - Open Settings
   - Go to the Integrations or MCP section
   - Click "Add New MCP"
   - Type `mcp-todo-server` as the package name
   - The MCP will be automatically detected and available for use

4. Verify Installation:
   - In either app, you can test the installation by trying to get a todo:
   ```typescript
   const todo = await getTodo({ id: "1" });
   ```

## Development

To run the server in development mode with hot reloading:

```bash
yarn dev
```

This will start the server using `ts-node-dev` with automatic reloading on file changes.

## Building

To build the project:

```bash
yarn build
```

This will:
1. Clean the previous build
2. Compile TypeScript to JavaScript
3. Make the binary executable
4. Set up binary linking

## Scripts

- `yarn start` - Run the built server in development mode with debugging
- `yarn dev` - Run the server in development mode with hot reloading
- `yarn build` - Build the TypeScript project
- `yarn test` - Run tests
- `yarn prepare` - Build the project (used in CI/CD)
- `yarn clean` - Remove build artifacts
- `yarn rebuild` - Clean and rebuild the project
- `yarn link-binary` - Set up binary linking

## Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
DEBUG=*
```

## Dependencies

### Main Dependencies
- `@modelcontextprotocol/sdk`: ^1.9.0
- `axios`: ^1.6.7
- `debug`: ^4.3.4
- `zod`: ^3.22.4

### Development Dependencies
- `@types/debug`: ^4.1.12
- `@types/node`: ^20.11.24
- `ts-node-dev`: ^2.0.0
- `typescript`: ^5.3.3

## Usage Example

```typescript
// Example of getting a todo by ID
const todo = await getTodo({ id: "5" });
```

## Example Prompts

Here are some example prompts you can use with Claude in Cursor or Claude Desktop to interact with the todo MCP:

### Basic Todo Retrieval
```
use getTodo to get todo 1
```

### Multiple Todo Analysis
```
get todos 1, 2, and 3 and compare their completion status
```

### Todo Search and Report
```
get todo 5 and format it as a markdown list
```

### Task Status Check
```
check if todo 4 is completed
```

### Todo Summary
```
get todo 7 and summarize its title in a more concise way
```

### Multiple Operations
```
get todos 1 and 2, then tell me which one is completed
```

These prompts demonstrate different ways to interact with the getTodo tool. Claude will understand these natural language requests and use the getTodo tool appropriately to fetch and process the todo information.

## License

This project is licensed under the MIT License. 
