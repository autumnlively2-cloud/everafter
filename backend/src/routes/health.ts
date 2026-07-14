import { Hono } from "hono";
import { getHealth } from "../controllers/health";

/**
 * Health check route — GET /health
 * Returns system status, uptime, and environment info.
 */
const healthRoutes = new Hono();

healthRoutes.get("/", getHealth);

export { healthRoutes };