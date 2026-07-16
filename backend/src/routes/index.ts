import { Hono } from "hono";
import { healthRoutes } from "./health";
import { rootRoutes } from "./root";
import { profileRoutes } from "./profiles";
import { bookRoutes } from "./books";
import { characterRoutes } from "./characters";
import { orderRoutes } from "./orders";
import { reviewRoutes } from "./reviews";
import { adminRoutes } from "./admin";
import { supabaseAuth } from "../middleware/auth";

/**
 * Aggregates all route modules into a single router.
 * Each domain gets its own sub-router mounted here.
 */
const apiRoutes = new Hono();

// Public routes
apiRoutes.route("/", rootRoutes);
apiRoutes.route("/health", healthRoutes);

// API routes with auth middleware
apiRoutes.use("/api/*", supabaseAuth());
apiRoutes.route("/api/profiles", profileRoutes);
apiRoutes.route("/api/books", bookRoutes);
apiRoutes.route("/api/characters", characterRoutes);
apiRoutes.route("/api/orders", orderRoutes);
apiRoutes.route("/api/reviews", reviewRoutes);
apiRoutes.route("/api/admin", adminRoutes);

export { apiRoutes };