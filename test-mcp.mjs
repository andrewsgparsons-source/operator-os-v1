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
    console.log('✓ Connected to MCP server\n');

    // Test 1: memory_add
    console.log('TEST 1: memory_add');
    const addResult = await client.callTool({
      name: 'memory_add',
      arguments: {
        text: 'James resume test: keyless shared memory is live',
        type: 'note',
        metadata: { source: 'james', test: 'resume-context' },
      },
    });
    console.log('Result:', addResult.content[0].text);
    console.log('');

    // Test 2: memory_search
    console.log('TEST 2: memory_search');
    const searchResult = await client.callTool({
      name: 'memory_search',
      arguments: {
        query: 'keyless shared memory live',
        limit: 5,
      },
    });
    console.log('Result:', searchResult.content[0].text);
    console.log('');

    // Test 3: decision_log
    console.log('TEST 3: decision_log');
    const decisionResult = await client.callTool({
      name: 'decision_log',
      arguments: {
        decision: 'Use keyless lexical memory search for MCP v1',
        context: 'OAuth-only + unblock cross-agent',
        options: ['OpenAI embeddings now', 'Lexical now, semantic later'],
        chosen: 'Lexical now, semantic later',
      },
    });
    console.log('Result:', decisionResult.content[0].text);
    console.log('');

    console.log('✓ All tests completed');
    await client.close();
  } catch (error) {
    console.error('✗ Test failed:', error);
    process.exit(1);
  }
}

main();
