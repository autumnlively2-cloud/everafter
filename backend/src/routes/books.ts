/**
 * Books CRUD routes.
 * Anyone can view published books; authors manage their own; admins manage all.
 */

import { Hono } from "hono";
import type { Context } from "hono";
import { booksRepo } from "../repositories/supabase";
import { getAuth, requireAuth } from "../middleware/auth";

const router = new Hono();

// GET /api/books — list published books (public), or all books (admin)
router.get("/", async (c: Context) => {
  const auth = getAuth(c);
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "20");

  if (auth.userRole === "admin") {
    const result = await booksRepo.findAll({ page, limit });
    return c.json({ success: true, ...result });
  }

  // Only published books for non-admin users
  const result = await booksRepo.findByField("published", true, { page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/books/:id
router.get("/:id", async (c: Context) => {
  const id = c.req.param("id");
  const book = await booksRepo.findById(id);
  if (!book) return c.json({ error: { code: "NOT_FOUND", message: "Book not found" } }, 404);
  return c.json({ success: true, data: book });
});

// POST /api/books
router.post("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  const body = await c.req.json();
  const book = await booksRepo.create({ ...body, author_id: auth.userId });
  return c.json({ success: true, data: book }, 201);
});

// PATCH /api/books/:id
router.patch("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await booksRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Book not found" } }, 404);
  if (existing.author_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot update another author's book" } }, 403);
  }
  const body = await c.req.json();
  const updated = await booksRepo.update(id, body);
  return c.json({ success: true, data: updated });
});

// DELETE /api/books/:id
router.delete("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await booksRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Book not found" } }, 404);
  if (existing.author_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot delete another author's book" } }, 403);
  }
  await booksRepo.delete(id);
  return c.json({ success: true, data: null }, 204);
});

export { router as bookRoutes };