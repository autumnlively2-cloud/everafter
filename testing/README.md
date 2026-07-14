# Shipyard Engineering — Testing Infrastructure

This directory contains the shared testing infrastructure for Shipyard Engineering.
Both frontend and backend teams should adopt these patterns for consistency.

## Quick Start

Install the test runner in your project:

```bash
bun add -D vitest @vitest/coverage/v8 @testing-library/react @testing-library/jest-dom jsdom
```

Add a `test` script to `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

Copy `vitest.config.ts` to your project root and adjust as needed.

## What's Here

| Path | Purpose |
|------|---------|
| `vitest.config.ts` | Shared Vitest configuration (use as template) |
| `examples/utils/math.ts` + `math.test.ts` | Pure function unit test pattern |
| `examples/utils/math.spec.ts` | Parametrized test pattern |
| `examples/components/counter.tsx` + `counter.test.tsx` | React component test pattern |
| `examples/api/hello.test.ts` | Server function / API integration test pattern |
| `examples/db/db.test.ts` | Database integration test pattern |
| `patterns.md` | Detailed test patterns and conventions |
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline template |

## Running Tests

```bash
# One run (CI)
bun run test

# Watch mode (development)
bun run test:watch

# With coverage
bun run test:coverage
```

## Conventions

- **Unit tests**: `*.test.ts` or `*.test.tsx` — test a single module in isolation
- **Integration tests**: `*.spec.ts` or `*.spec.tsx` — test interactions between modules
- **Test files** live next to the source code they test (`co-located`)
- **Coverage threshold**: 80% minimum (branches, functions, lines, statements)