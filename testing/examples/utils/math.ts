/**
 * Example utility functions for testing demonstrations.
 * These show pure-function unit test patterns.
 */

/**
 * Adds two numbers.
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Calculates the factorial of a non-negative integer.
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

/**
 * Formats a user name from first and last name.
 * Returns "Unknown" if both are empty/missing.
 */
export function formatUserName(first?: string, last?: string): string {
  const parts = [first, last].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Unknown";
}

/**
 * Parses a pagination cursor from query params.
 */
export function parsePaginationParams(
  page?: string,
  limit?: string,
): { page: number; limit: number } {
  const rawPage = page !== undefined && page !== "" ? Number(page) : undefined;
  const rawLimit = limit !== undefined && limit !== "" ? Number(limit) : undefined;
  const p = Math.max(rawPage !== undefined && !Number.isNaN(rawPage) ? rawPage : 1, 1);
  const l = Math.min(Math.max(rawLimit !== undefined && !Number.isNaN(rawLimit) ? rawLimit : 20, 1), 100);
  return { page: p, limit: l };
}