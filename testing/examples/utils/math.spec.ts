import { describe, it, expect } from "vitest";
import { add, factorial } from "./math";

// ---------------------------------------------------------------------------
// Parametrized tests — excellent for covering many inputs with minimal code.
// Use .each for data-driven testing.
// ---------------------------------------------------------------------------

describe("add() — parametrized", () => {
  it.each([
    [1, 2, 3],
    [-1, 1, 0],
    [0, 0, 0],
    [100, 200, 300],
    [-5, -3, -8],
    [1.5, 2.5, 4.0],
  ])("add(%i, %i) → %i", (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });
});

describe("factorial() — parametrized", () => {
  it.each([
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 6],
    [4, 24],
    [5, 120],
    [6, 720],
  ])("factorial(%i) → %i", (n, expected) => {
    expect(factorial(n)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// Snapshot testing — useful for catching unexpected changes to outputs.
// Use sparingly — not a substitute for assertion-based tests.
// ---------------------------------------------------------------------------

describe("factorial() — snapshots", () => {
  it("matches snapshot for first 10 factorials", () => {
    const results = Array.from({ length: 10 }, (_, i) => factorial(i));
    expect(results).toMatchSnapshot("[1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]");
  });
});