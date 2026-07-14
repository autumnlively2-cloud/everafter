import { Hono } from "hono";
import { healthRoutes } from "./health";
import { rootRoutes } from "./root";

/**
 * Aggregates all route modules into a single router.
 * Each domain gets its own sub-router mounted here.
 */
const apiRoutes = new Hono();

apiRoutes.route("/", rootRoutes);
apiRoutes.route("/health", healthRoutes);

// Future routes mount here:
// apiRoutes.route("/clients", clientRoutes);
// apiRoutes.route("/projects", projectRoutes);

export { apiRoutes };