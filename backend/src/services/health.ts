import type { Context } from "hono";
import { env } from "../config";

/**
 * Health check service — returns system status.
 * Extend this to add DB connectivity checks, etc.
 */
export class HealthService {
  async check() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      checks: {
        // Add future health checks here (e.g. database reachability)
        // database: await this.checkDatabase(),
      },
    };
  }
}

export const healthService = new HealthService();