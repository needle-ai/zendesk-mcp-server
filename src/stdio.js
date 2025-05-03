#!/usr/bin/env node

import 'dotenv/config'

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ZendeskClient } from './zendesk-client.js';
import { ZendeskMcpServer } from './server.js';

const zendeskClient = new ZendeskClient(
  process.env.ZENDESK_SUBDOMAIN,
  process.env.ZENDESK_EMAIL,
  process.env.ZENDESK_ACCESS_TOKEN
);
const server = ZendeskMcpServer(zendeskClient);

const transport = new StdioServerTransport();
await server.connect(transport);
