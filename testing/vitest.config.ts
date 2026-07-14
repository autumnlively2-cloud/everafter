/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Extend project Vite config — add plugins that are only needed for testing
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    react(),
  ],

  test: {
    // Environment
    environment: "node", // Use "jsdom" for React component tests, "node" for backend

    // Global test setup (runs once per worker)
    setupFiles: [],

    // File patterns
    include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],

    // Exclude build output and dependencies
    exclude: ["node_modules", "dist", ".vercel", ".output"],

    // Coverage
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/**/*.d.ts",
        "src/router.tsx",
        "src/routeTree.gen.ts",
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },

    // For React component tests — create a jsdom-like environment per test file
    // Override in each test file with: // @vitest-environment jsdom
    // Or uncomment below to make jsdom the default:
    // environment: "jsdom",
    // environmentOptions: {
    //   jsdom: {
    //     url: "http://localhost:3000",
    //   },
    // },

    // Type-check tests too
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.json",
    },

    // Retry flaky tests in CI
    retry: process.env.CI ? 2 : 0,

    // Test timeout
    testTimeout: 10_000,
  },
});