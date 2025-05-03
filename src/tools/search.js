import { z } from 'zod';

export const searchTools = (zendeskClient) => [
  {
    name: "search",
    description: "Search across Zendesk data using keywords. Returns maximum 20 results per page.",
    schema: {
      query: z.string().describe("Search query string"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_order: z.enum(["asc", "desc"]).optional().describe("Sort order (asc or desc)"),
      page: z.number().optional().describe("Page number for pagination"),
    },
    handler: async ({ query, sort_by, sort_order, page }) => {
      try {
        const params = { sort_by, sort_order, page, per_page: 20 };
        const result = await zendeskClient.search(query, params);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error searching: ${error.message}` }],
          isError: true
        };
      }
    }
  }
];
