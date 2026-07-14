import type { Context } from "hono";
import { healthService } from "../services";

/**
 * Health check controller.
 */
export async function getHealth(c: Context) {
  const status = await healthService.check();
  return c.json(status);
}