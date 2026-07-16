/**
 * Characters CRUD routes.
 * Users manage their own characters; admins can manage all.
 */

import { Hono } from "hono";
import type { Context } from "hono";
import { charactersRepo } from "../repositories/supabase";
import { getAuth, requireAuth } from "../middleware/auth";

const router = new Hono();

// GET /api/characters
router.get("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "20");

  if (auth.userRole === "admin") {
    const result = await charactersRepo.findAll({ page, limit });
    return c.json({ success: true, ...result });
  }

  const result = await charactersRepo.findByField("user_id", auth.userId, { page, limit });
  return c.json({ success: true, ...result });
});

// GET /api/characters/:id
router.get("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const character = await charactersRepo.findById(id);
  if (!character) return c.json({ error: { code: "NOT_FOUND", message: "Character not found" } }, 404);
  return c.json({ success: true, data: character });
});

// POST /api/characters
router.post("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  const body = await c.req.json();
  const character = await charactersRepo.create({ ...body, user_id: auth.userId });
  return c.json({ success: true, data: character }, 201);
});

// PATCH /api/characters/:id
router.patch("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await charactersRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Character not found" } }, 404);
  if (existing.user_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot update another user's character" } }, 403);
  }
  const body = await c.req.json();
  const updated = await charactersRepo.update(id, body);
  return c.json({ success: true, data: updated });
});

// DELETE /api/characters/:id
router.delete("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  const existing = await charactersRepo.findById(id);
  if (!existing) return c.json({ error: { code: "NOT_FOUND", message: "Character not found" } }, 404);
  if (existing.user_id !== auth.userId && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot delete another user's character" } }, 403);
  }
  await charactersRepo.delete(id);
  return c.json({ success: true, data: null }, 204);
});

export { router as characterRoutes };