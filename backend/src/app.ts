/**
 * Application factory — creates and configures the Hono app.
 * Separate from server startup so tests can import the app without Bun specifics.
 */

import { Hono } from "hono";
import { apiRoutes } from "./routes";
import { errorHandler, requestLogger } from "./middleware";

export function createApp() {
  const app = new Hono();

  // --- Middleware ---
  app.use("*", requestLogger());

  // --- Routes ---
  app.route("/", apiRoutes);

  // --- Error handler (registered after routes) ---
  app.onError(errorHandler);

  // --- 404 handler ---
  app.notFound((c) => {
    return c.json(
      {
        error: {
          code: "NOT_FOUND",
          message: `Route ${c.req.method} ${c.req.path} not found`,
        },
      },
      404,
    );
  });

  return app;
}

export type AppType = ReturnType<typeof createApp>;