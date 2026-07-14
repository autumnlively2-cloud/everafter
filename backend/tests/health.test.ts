/**
 * Tests for the health check endpoint.
 */
import { describe, it, expect } from "vitest";
import { createApp } from "../src/app";

const app = createApp();

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty("status", "ok");
    expect(body).toHaveProperty("timestamp");
    expect(body).toHaveProperty("uptime");
    expect(body).toHaveProperty("environment");
  });
});

describe("GET /", () => {
  it("returns 200 with API info", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty("name", "Shipyard Engineering API");
    expect(body).toHaveProperty("version", "0.1.0");
    expect(body).toHaveProperty("docs");
  });
});

describe("GET /nonexistent", () => {
  it("returns 404 for unknown routes", async () => {
    const res = await app.request("/nonexistent");
    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.error.code).toBe("NOT_FOUND");
  });
});