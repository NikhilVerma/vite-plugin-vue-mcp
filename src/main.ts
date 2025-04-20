import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { mcpServerTools } from './tools'

export async function main(): Promise<void> {
  const mcpServer = new McpServer({
    name: 'vue-mcp',
    version: '0.0.1',
  })

  mcpServerTools.forEach((tool) => {
    mcpServer.tool(tool.name, tool.description, tool.params, async (args) => {
      console.log(args)
      return {
        content: [{
          type: 'text',
          text: 'ok',
        }],
      }
    })
  })

  // create stdio transport
  const transport = new StdioServerTransport()

  // connect to mcp server
  await mcpServer.connect(transport)
}

main()
