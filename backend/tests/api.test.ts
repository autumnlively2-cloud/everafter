/**
 * Tests for CRUD API routes.
 * Auth/authorization tests work without a real Supabase connection.
 * Full CRUD tests require SUPABASE_URL and SUPABASE_ANON_KEY to be set.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { createApp } from "../src/app";

const app = createApp();

// Check if we have a real Supabase connection
const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);

describe("API Routes — Auth required", () => {
  it("POST /api/books returns 401 without auth", async () => {
    const res = await app.request("/api/books", {
      method: "POST",
      body: JSON.stringify({ title: "Test Book" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(res.status).toBe(401);
  });

  it("POST /api/characters returns 401 without auth", async () => {
    const res = await app.request("/api/characters", {
      method: "POST",
      body: JSON.stringify({ name: "Test Character" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(res.status).toBe(401);
  });

  it("POST /api/orders returns 401 without auth", async () => {
    const res = await app.request("/api/orders", {
      method: "POST",
      body: JSON.stringify({ book_id: "test", total: 9.99 }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(res.status).toBe(401);
  });

  it("POST /api/reviews returns 401 without auth", async () => {
    const res = await app.request("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ book_id: "test", rating: 5 }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(res.status).toBe(401);
  });

  it("PATCH /api/profiles/:id returns 401 without auth", async () => {
    const res = await app.request("/api/profiles/some-id", {
      method: "PATCH",
      body: JSON.stringify({ full_name: "Test" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(res.status).toBe(401);
  });

  it("DELETE /api/books/:id returns 401 without auth", async () => {
    const res = await app.request("/api/books/some-id", { method: "DELETE" });
    expect(res.status).toBe(401);
  });
});

describe("API Routes — Admin requires auth", () => {
  it("GET /api/admin/users returns 401 without auth", async () => {
    const res = await app.request("/api/admin/users");
    expect(res.status).toBe(401);
  });

  it("GET /api/admin/orders returns 401 without auth", async () => {
    const res = await app.request("/api/admin/orders");
    expect(res.status).toBe(401);
  });

  it("GET /api/admin/books returns 401 without auth", async () => {
    const res = await app.request("/api/admin/books");
    expect(res.status).toBe(401);
  });

  it("GET /api/admin/users/:id returns 401 without auth", async () => {
    const res = await app.request("/api/admin/users/some-id");
    expect(res.status).toBe(401);
  });
});

describe("API Routes — Public access", () => {
  it("GET /api/books returns 200 (public)", async () => {
    // This will attempt a Supabase query — in CI with real creds it works
    const res = await app.request("/api/books");
    // Without real Supabase, we get a 500 error; skip in that case
    if (hasSupabase) {
      expect(res.status).toBe(200);
    } else {
      expect([200, 500]).toContain(res.status);
    }
  });

  it("GET /api/reviews returns 200 (public)", async () => {
    const res = await app.request("/api/reviews");
    if (hasSupabase) {
      expect(res.status).toBe(200);
    } else {
      expect([200, 500]).toContain(res.status);
    }
  });
});

describe("Health endpoint still works", () => {
  it("GET /health returns 200", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("status", "ok");
  });

  it("GET / returns 200 with API info", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("name", "Shipyard Engineering API");
  });
});