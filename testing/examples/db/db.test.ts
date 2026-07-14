import { describe, it, expect, beforeAll, afterAll } from "vitest";

// ---------------------------------------------------------------------------
// Database integration test pattern.
// Uses a local SQLite database for testing (isolated from production).
// The test database should be created and torn down per run.
// ---------------------------------------------------------------------------

// Example database client wrapper (simulating how the team might use SQLite)
// In production, this would connect to Turso or Neon via the DB client.
interface UserRecord {
  id: string;
  name: string;
  email: string;
}

// In-memory mock store simulating a database
// Replace this with your actual database client in real tests.
const db = {
  // biome-ignore lint/suspicious/noExplicitAny: mock store
  _store: new Map<string, any>(),

  async query<T>(_sql: string, _params?: unknown[]): Promise<T[]> {
    // Simulate a query returning stored data
    return Array.from(this._store.values()) as T[];
  },

  async get<T>(_sql: string, params?: unknown[]): Promise<T | null> {
    if (params && params[0]) {
      return (this._store.get(String(params[0])) as T) ?? null;
    }
    return null;
  },

  async run(_sql: string, _params?: unknown[]): Promise<{ changes: number }> {
    return { changes: 1 };
  },
};

describe("User database operations", () => {
  const testUser: UserRecord = {
    id: "test-user-1",
    name: "Test User",
    email: "test@example.com",
  };

  beforeAll(async () => {
    // Seed test data — in a real test, run migrations and insert fixtures
    db._store.set(testUser.id, testUser);
  });

  afterAll(async () => {
    // Clean up test data
    db._store.clear();
  });

  it("retrieves a user by ID", async () => {
    const user = await db.get<UserRecord>("SELECT * FROM users WHERE id = ?", [
      testUser.id,
    ]);
    expect(user).not.toBeNull();
    expect(user?.name).toBe("Test User");
    expect(user?.email).toBe("test@example.com");
  });

  it("returns null for non-existent user", async () => {
    const user = await db.get<UserRecord>(
      "SELECT * FROM users WHERE id = ?",
      ["non-existent"],
    );
    expect(user).toBeNull();
  });

  it("lists all users", async () => {
    const users = await db.query<UserRecord>("SELECT * FROM users");
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("test@example.com");
  });

  it("handles inserting a new user", async () => {
    const newUser: UserRecord = {
      id: "test-user-2",
      name: "New User",
      email: "new@example.com",
    };
    db._store.set(newUser.id, newUser);

    const result = await db.get<UserRecord>("SELECT * FROM users WHERE id = ?", [
      newUser.id,
    ]);
    expect(result).toEqual(newUser);
  });

  it("handles empty database after cleanup", async () => {
    db._store.clear();
    const users = await db.query<UserRecord>("SELECT * FROM users");
    expect(users).toHaveLength(0);
  });
});