import { describe, it, expect } from "vitest";
import { add, factorial, formatUserName, parsePaginationParams } from "./math";

// ---------------------------------------------------------------------------
// Pure function unit tests — the simplest, most valuable kind of test.
// No mocking, no setup, just inputs and expected outputs.
// ---------------------------------------------------------------------------

describe("add()", () => {
  it("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
    expect(add(-5, -3)).toBe(-8);
  });

  it("handles zero", () => {
    expect(add(0, 5)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });

  it("handles floating point numbers", () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("factorial()", () => {
  it("returns 1 for 0 and 1", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
  });

  it("calculates small factorials", () => {
    expect(factorial(2)).toBe(2);
    expect(factorial(3)).toBe(6);
    expect(factorial(5)).toBe(120);
  });

  it("throws for negative input", () => {
    expect(() => factorial(-1)).toThrow("Factorial is not defined for negative numbers");
  });

  it("handles larger values without overflow for reasonable inputs", () => {
    // 10! = 3,628,800 — well within JS safe integer range
    expect(factorial(10)).toBe(3_628_800);
  });
});

describe("formatUserName()", () => {
  it("joins first and last name", () => {
    expect(formatUserName("Jane", "Doe")).toBe("Jane Doe");
  });

  it("returns just the first name if last is missing", () => {
    expect(formatUserName("Jane")).toBe("Jane");
  });

  it("returns just the last name if first is missing", () => {
    expect(formatUserName(undefined, "Doe")).toBe("Doe");
  });

  it("returns 'Unknown' when both names are empty", () => {
    expect(formatUserName()).toBe("Unknown");
    expect(formatUserName("", "")).toBe("Unknown");
  });
});

describe("parsePaginationParams()", () => {
  it("returns defaults when no params provided", () => {
    expect(parsePaginationParams()).toEqual({ page: 1, limit: 20 });
  });

  it("parses valid page and limit strings", () => {
    expect(parsePaginationParams("2", "10")).toEqual({ page: 2, limit: 10 });
  });

  it("clamps limit between 1 and 100", () => {
    expect(parsePaginationParams("1", "0")).toEqual({ page: 1, limit: 1 });
    expect(parsePaginationParams("1", "999")).toEqual({ page: 1, limit: 100 });
  });

  it("ensures page is at least 1", () => {
    expect(parsePaginationParams("-5", "20")).toEqual({ page: 1, limit: 20 });
    expect(parsePaginationParams("0", "20")).toEqual({ page: 1, limit: 20 });
  });

  it("handles non-numeric strings gracefully", () => {
    const result = parsePaginationParams("abc", "xyz");
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });
});