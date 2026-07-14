import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Server function / API route integration test pattern.
// Since the project uses TanStack Start's createServerFn(), we test the
// handler logic directly with mocked request context.
// ---------------------------------------------------------------------------

// Example server function that would live in src/routes/api/hello.ts
// In a real app, this would use createServerFn() from @tanstack/react-start
export async function greetHandler(name: string): Promise<{ greeting: string }> {
  if (!name || name.trim().length === 0) {
    return { greeting: "Hello, stranger!" };
  }
  if (name.length > 100) {
    return { greeting: "Hello, name-too-long!" };
  }
  return { greeting: `Hello, ${name.trim()}!` };
}

// Example authenticated endpoint pattern
export async function getUserProfile(
  userId: string,
  token?: string,
): Promise<{ id: string; name: string; email: string } | { error: string }> {
  if (!token) {
    return { error: "Unauthorized" };
  }
  if (!userId) {
    return { error: "User ID is required" };
  }
  // In production, this would call your database
  return {
    id: userId,
    name: "Jane Doe",
    email: "jane@example.com",
  };
}

describe("greetHandler", () => {
  it("returns a personalized greeting", async () => {
    const result = await greetHandler("Shipyard");
    expect(result).toEqual({ greeting: "Hello, Shipyard!" });
  });

  it("trims whitespace from the name", async () => {
    const result = await greetHandler("  Team  ");
    expect(result).toEqual({ greeting: "Hello, Team!" });
  });

  it("returns a default greeting for empty input", async () => {
    const result = await greetHandler("");
    expect(result).toEqual({ greeting: "Hello, stranger!" });
  });

  it("returns a default greeting for whitespace-only input", async () => {
    const result = await greetHandler("   ");
    expect(result).toEqual({ greeting: "Hello, stranger!" });
  });

  it("handles very long names", async () => {
    const longName = "a".repeat(101);
    const result = await greetHandler(longName);
    expect(result).toEqual({ greeting: "Hello, name-too-long!" });
  });
});

describe("getUserProfile", () => {
  it("returns user profile for authenticated requests", async () => {
    const result = await getUserProfile("user-1", "valid-token");
    expect(result).not.toHaveProperty("error");
    expect(result).toHaveProperty("id", "user-1");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
  });

  it("rejects unauthenticated requests", async () => {
    const result = await getUserProfile("user-1");
    expect(result).toEqual({ error: "Unauthorized" });
  });

  it("rejects requests without a user ID", async () => {
    const result = await getUserProfile("", "valid-token");
    expect(result).toEqual({ error: "User ID is required" });
  });
});