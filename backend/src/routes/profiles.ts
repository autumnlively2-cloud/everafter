/**
 * Profiles CRUD routes.
 * Users can view and update their own profile; admins can manage all.
 */

import { Hono } from "hono";
import type { Context } from "hono";
import { profilesRepo } from "../repositories/supabase";
import { getAuth } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";

const router = new Hono();

// GET /api/profiles — list all profiles (admin only; for regular users, returns own)
router.get("/", requireAuth(), async (c: Context) => {
  const auth = getAuth(c);
  if (auth.userRole === "admin") {
    const result = await profilesRepo.findAll({ page: 1, limit: 100 });
    return c.json({ success: true, ...result });
  }
  // Regular users see only their own profile
  const profile = await profilesRepo.findById(auth.userId!);
  return c.json({ success: true, data: profile ? [profile] : [], total: profile ? 1 : 0, page: 1, limit: 1 });
});

// GET /api/profiles/:id
router.get("/:id", async (c: Context) => {
  const id = c.req.param("id");
  const profile = await profilesRepo.findById(id);
  if (!profile) return c.json({ error: { code: "NOT_FOUND", message: "Profile not found" } }, 404);
  return c.json({ success: true, data: profile });
});

// PATCH /api/profiles/:id
router.patch("/:id", requireAuth(), async (c: Context) => {
  const id = c.req.param("id");
  const auth = getAuth(c);
  // Only the profile owner or an admin can update
  if (auth.userId !== id && auth.userRole !== "admin") {
    return c.json({ error: { code: "FORBIDDEN", message: "Cannot update another user's profile" } }, 403);
  }
  const body = await c.req.json();
  // Prevent role changes from user requests
  const { role, ...safeBody } = body;
  const updated = await profilesRepo.update(id, safeBody);
  if (!updated) return c.json({ error: { code: "NOT_FOUND", message: "Profile not found" } }, 404);
  return c.json({ success: true, data: updated });
});

export { router as profileRoutes };