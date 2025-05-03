import { z } from 'zod';

export const chatTools = (zendeskClient) => [
  {
    name: "list_chats",
    description: "List Zendesk Chat conversations. Returns maximum 20 chats per page.",
    schema: {
      page: z.number().optional().describe("Page number for pagination"),
    },
    handler: async ({ page }) => {
      try {
        const params = { page, per_page: 20 };
        const result = await zendeskClient.listChats(params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error listing chats: ${error.message}` }],
          isError: true
        };
      }
    }
  }
];
