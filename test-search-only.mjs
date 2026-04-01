import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['mcp-server/dist/index.js'],
    env: process.env,
  });

  const client = new Client({ name: 'test-client', version: '1.0.0' }, {
    capabilities: {},
  });

  try {
    await client.connect(transport);
    
    console.log('Searching for: "keyless"');
    const result1 = await client.callTool({
      name: 'memory_search',
      arguments: { query: 'keyless', limit: 5 },
    });
    console.log('Result:', result1.content[0].text);
    console.log('');

    console.log('Searching for: "James"');
    const result2 = await client.callTool({
      name: 'memory_search',
      arguments: { query: 'James', limit: 5 },
    });
    console.log('Result:', result2.content[0].text);
    console.log('');

    await client.close();
  } catch (error) {
    console.error('✗ Test failed:', error);
    process.exit(1);
  }
}

main();
