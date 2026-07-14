import { Hono } from "hono";
import { z } from "zod";
import type { Context } from "hono";

/**
 * Root route — GET /
 * Returns a welcome message with API version info.
 */
const rootRoutes = new Hono();

rootRoutes.get("/", (c: Context) => {
  return c.json({
    name: "Shipyard Engineering API",
    version: "0.1.0",
    description: "A small, focused team building production-quality software end-to-end.",
    docs: "/health",
  });
});

export { rootRoutes };