/**
 * Admin namespace routes.
 * All routes require admin role.
 */

import { Hono } from "hono";
import type { Context } from "hono";
import { supabaseAuth, requireRole, getAuth } from "../middleware/auth";
import { profilesRepo, ordersRepo, booksRepo } from "../repositories/supabase";

const router = new Hono();

// All admin routes require auth + admin role
router.use("*", supabaseAuth());
router.use("*", requireRole("admin"));

// --- Users management ---

// GET /api/admin/users — list all users (profiles)
router.get("/users", async (c: Context) => {
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "50");
  const result = await profilesRepo.findAll({ page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/admin/users/:id
router.get("/users/:id", async (c: Context) => {
  const id = c.req.param("id");
  const profile = await profilesRepo.findById(id);
  if (!profile) return c.json({ error: { code: "NOT_FOUND", message: "User not found" } }, 404);
  return c.json({ success: true, data: profile });
});

// PATCH /api/admin/users/:id — admin can update any user (including role)
router.patch("/users/:id", async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const updated = await profilesRepo.update(id, body);
  if (!updated) return c.json({ error: { code: "NOT_FOUND", message: "User not found" } }, 404);
  return c.json({ success: true, data: updated });
});

// --- Orders management ---

// GET /api/admin/orders — list all orders
router.get("/orders", async (c: Context) => {
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "50");
  const result = await ordersRepo.findAll({ page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/admin/orders/:id
router.get("/orders/:id", async (c: Context) => {
  const id = c.req.param("id");
  const order = await ordersRepo.findById(id);
  if (!order) return c.json({ error: { code: "NOT_FOUND", message: "Order not found" } }, 404);
  return c.json({ success: true, data: order });
});

// PATCH /api/admin/orders/:id — update order status
router.patch("/orders/:id", async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const updated = await ordersRepo.update(id, body);
  if (!updated) return c.json({ error: { code: "NOT_FOUND", message: "Order not found" } }, 404);
  return c.json({ success: true, data: updated });
});

// --- Books management (admin) ---

// GET /api/admin/books — list all books (including unpublished)
router.get("/books", async (c: Context) => {
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "50");
  const result = await booksRepo.findAll({ page, limit });
  return c.json({ success: true, ...result });
});

export { router as adminRoutes };