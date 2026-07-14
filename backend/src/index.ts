/**
 * Entry point — starts the server.
 * Uses Bun's built-in serve() for HTTP.
 */

import { serve } from "bun";
import { createApp } from "./app";
import { env } from "./config";

const app = createApp();

const server = serve({
  fetch: app.fetch,
  port: env.PORT,
  hostname: env.HOST,
});

console.log(`🚀 Shipyard API running at http://${env.HOST}:${env.PORT}`);
console.log(`   Environment: ${env.NODE_ENV}`);