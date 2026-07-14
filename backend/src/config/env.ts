/**
 * Environment configuration with type-safe access.
 * Uses process.env with sensible defaults.
 */

type EnvConfig = {
  PORT: number;
  HOST: string;
  NODE_ENV: "development" | "production" | "test";
  LOG_LEVEL: "debug" | "info" | "warn" | "error";
  DATABASE_URL?: string;
};

function getEnv(): EnvConfig {
  return {
    PORT: parseInt(process.env.PORT ?? "3001", 10),
    HOST: process.env.HOST ?? "0.0.0.0",
    NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) ?? "development",
    LOG_LEVEL: (process.env.LOG_LEVEL as EnvConfig["LOG_LEVEL"]) ?? "info",
    DATABASE_URL: process.env.DATABASE_URL,
  };
}

export const env = getEnv();