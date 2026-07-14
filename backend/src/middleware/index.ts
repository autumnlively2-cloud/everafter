import type { Context, MiddlewareHandler } from "hono";
import { AppError } from "../utils/errors";
import { env } from "../config";

/**
 * Global error handler middleware.
 * Catches AppError and maps to structured JSON responses.
 * Falls back to 500 for unexpected errors.
 */
export function errorHandler(c: Context) {
  const error = c.error as Error;

  if (error instanceof AppError) {
    return c.json(
      {
        error: {
          code: error.code,
          message: error.message,
        },
      },
      error.statusCode,
    );
  }

  // Unknown error — log details in development, return generic message in production
  if (env.NODE_ENV === "development") {
    console.error("Unhandled error:", error);
    return c.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: error.message ?? "An unexpected error occurred",
        },
      },
      500,
    );
  }

  return c.json(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    },
    500,
  );
}

/**
 * Request logging middleware.
 */
export function requestLogger(): MiddlewareHandler {
  return async (c, next) => {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${c.req.method} ${c.req.path} → ${c.res.status} (${duration}ms)`,
    );
  };
}