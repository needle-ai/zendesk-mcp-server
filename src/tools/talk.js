import { z } from 'zod';

export const talkTools = (zendeskClient) => [
  {
    name: "get_talk_stats",
    description: "Get Zendesk Talk statistics",
    schema: {},
    handler: async () => {
      try {
        const result = await zendeskClient.getTalkStats();
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error getting Talk stats: ${error.message}` }],
          isError: true
        };
      }
    }
  }
];
