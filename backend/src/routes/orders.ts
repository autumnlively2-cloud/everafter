/**
 * Orders CRUD routes.
 * Users view and create their own orders; admins manage all.
 */

import { Hono } from "hono";
import type { Context } from "hono";
import { ordersRepo } from "../repositories/supabase";
import { getAuth, requireAuth } from "../middleware/auth";

const router = new Hono();

// GET /api/orders
router.get("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "20");

  if (auth.userRole === "admin") {
    const result = await ordersRepo.findAll({ page, limit });
    return c.json({ success: true, ...result });
  }

  const result = await ordersRepo.findByField("user_id", auth.userId, { page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/orders/:id
router.get("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const order = await ordersRepo.findById(id);
  if (!order) return c.json({ error: { code: "NOT_FOUND", message: "Order not found" } }, 404);
  if (order.user_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot view another user's order" } }, 403);
  }
  return c.json({ success: true, data: order });
});

// POST /api/orders
router.post("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  const body = await c.req.json();
  const order = await ordersRepo.create({ ...body, user_id: auth.userId, status: "pending" });
  return c.json({ success: true, data: order }, 201);
});

// PATCH /api/orders/:id
router.patch("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await ordersRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Order not found" } }, 404);
  if (existing.user_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot update another user's order" } }, 403);
  }
  const body = await c.req.json();
  const updated = await ordersRepo.update(id, body);
  return c.json({ success: true, data: updated });
});

export { router as orderRoutes };