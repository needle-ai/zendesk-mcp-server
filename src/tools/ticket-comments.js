import { z } from 'zod';

export const ticketCommentsTools = (zendeskClient) => [
  {
    name: "list_ticket_comments",
    description: "List all comments for a specific ticket",
    schema: {
      ticket_id: z.number().describe("Ticket ID")
    },
    handler: async ({ ticket_id }) => {
      try {
        const result = await zendeskClient.listTicketComments(ticket_id);
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error listing ticket comments: ${error.message}` }],
          isError: true
        };
      }
    }
  },
];
