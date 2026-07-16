/**
 * RLS-aware middleware for Supabase auth context.
 * Reads the Authorization header and sets the authenticated user
 * on the Hono context for use in downstream handlers.
 */

import type { Context, MiddlewareHandler } from "hono";
import { getSupabaseClient } from "../config/supabase";

export type AuthContext = {
  userId?: string;
  userRole?: "reader" | "creator" | "admin";
  isAuthenticated: boolean;
};

/**
 * Middleware that extracts the Supabase session from the Authorization header.
 * Sets `c.set("auth", ...)` with the user context.
 * Routes that need auth can check `c.get("auth")`.
 */
export function supabaseAuth(): MiddlewareHandler {
  return async (c, next) => {
    const auth: AuthContext = { isAuthenticated: false };
    const authHeader = c.req.header("Authorization");

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.getUser(token);
        if (!error && data.user) {
          auth.userId = data.user.id;
          auth.isAuthenticated = true;

          // Fetch the user's role from the profiles table
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

          if (profile) {
            auth.userRole = profile.role as AuthContext["userRole"];
          }
        }
      } catch {
        // Token validation failed — proceed as unauthenticated
      }
    }

    c.set("auth", auth);
    await next();
  };
}

/**
 * Helper to get the auth context in a handler.
 */
export function getAuth(c: Context): AuthContext {
  return c.get("auth") ?? { isAuthenticated: false };
}

/**
 * Middleware that requires authentication.
 * Returns 401 if no valid session is present.
 */
export function requireAuth(): MiddlewareHandler {
  return async (c, next) => {
    const auth = getAuth(c);
    if (!auth.isAuthenticated) {
      return c.json({ error: { code: "UNAUTHORIZED", message: "Authentication required" } }, 401);
    }
    await next();
  };
}

/**
 * Middleware that requires a specific role.
 * Must be used after supabaseAuth() middleware.
 */
export function requireRole(...roles: string[]): MiddlewareHandler {
  return async (c, next) => {
    const auth = getAuth(c);
    if (!auth.isAuthenticated) {
      return c.json({ error: { code: "UNAUTHORIZED", message: "Authentication required" } }, 401);
    }
    if (!auth.userRole || !roles.includes(auth.userRole)) {
      return c.json({ error: { code: "FORBIDDEN", message: "Insufficient permissions" } }, 403);
    }
    await next();
  };
}