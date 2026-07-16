/**
 * Reviews CRUD routes.
 * Anyone can view reviews; authenticated users manage their own.
 */

import { Hono } from "hono";
import type { Context } from "hono";
import { reviewsRepo } from "../repositories/supabase";
import { getAuth, requireAuth } from "../middleware/auth";

const router = new Hono();

// GET /api/reviews — list all reviews (public)
router.get("/", async (c: Context) => {
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "20");
  const result = await reviewsRepo.findAll({ page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/reviews/by-book/:bookId
router.get("/by-book/:bookId", async (c: Context) => {
  const bookId = c.req.param("bookId");
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "20");
  const result = await reviewsRepo.findByField("book_id", bookId, { page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/reviews/:id
router.get("/:id", async (c: Context) => {
  const id = c.req.param("id");
  const review = await reviewsRepo.findById(id);
  if (!review) return c.json({ error: { code: "NOT_FOUND", message: "Review not found" } }, 404);
  return c.json({ success: true, data: review });
});

// POST /api/reviews
router.post("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  const body = await c.req.json();
  const review = await reviewsRepo.create({ ...body, user_id: auth.userId });
  return c.json({ success: true, data: review }, 201);
});

// PATCH /api/reviews/:id
router.patch("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await reviewsRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Review not found" } }, 404);
  if (existing.user_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot update another user's review" } }, 403);
  }
  const body = await c.req.json();
  const updated = await reviewsRepo.update(id, body);
  return c.json({ success: true, data: updated });
});

// DELETE /api/reviews/:id
router.delete("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await reviewsRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Review not found" } }, 404);
  if (existing.user_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot delete another user's review" } }, 403);
  }
  await reviewsRepo.delete(id);
  return c.json({ success: true, data: null }, 204);
});

export { router as reviewRoutes };