# Shipyard Engineering — Test Patterns

This document defines the test patterns and conventions to use across all projects.

## 1. File Naming & Placement

| Type | Naming Convention | Location |
|------|-------------------|----------|
| Unit tests | `*.test.ts` / `*.test.tsx` | Co-located next to source file |
| Integration tests | `*.spec.ts` / `*.spec.tsx` | Co-located next to source file |
| E2E tests | `tests/e2e/*.test.ts` | Dedicated `tests/e2e/` directory |
| Test utilities/helpers | `tests/helpers/*.ts` | Dedicated `tests/helpers/` directory |
| Test fixtures | `tests/fixtures/*.json` | Dedicated `tests/fixtures/` directory |

**Rule:** Test files live next to the code they test. This makes it easy to see coverage gaps and keeps imports simple.

```
src/
├── utils/
│   ├── format.ts
│   ├── format.test.ts       ← co-located unit test
│   ├── validate.ts
│   └── validate.spec.ts     ← co-located integration test
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx      ← co-located component test
└── routes/
    ├── api/
    │   ├── users.ts
    │   └── users.test.ts    ← co-located API test
    └── index.tsx
```

## 2. Test Structure (AAA Pattern)

Every test should follow Arrange-Act-Assert:

```typescript
import { describe, it, expect } from "vitest";

describe("feature or function name", () => {
  it("describes the expected behavior", () => {
    // Arrange — set up inputs, mocks, state
    const input = 42;

    // Act — call the function being tested
    const result = factorial(input);

    // Assert — verify the outcome
    expect(result).toBe(1_405_006_117_752_879_898_000);
  });
});
```

## 3. What to Test

### Test:
- **Happy paths** — the expected use case works
- **Edge cases** — boundaries, empty arrays, null/undefined, max/min values
- **Error cases** — invalid input throws or returns correct error
- **State transitions** — sequences of user actions that change state
- **Regression tests** — for every bug fix, write a test that would have caught it

### Don't test:
- **Implementation details** — test behavior, not internal state
- **Third-party code** — assume libraries work (test your integration, not the library)
- **Trivial getters/setters** — unless they have logic
- **Generated boilerplate** — route tree files, etc.

## 4. Mocking Strategy

| Scenario | Approach |
|----------|----------|
| External HTTP APIs | `vi.mock()` the client module, return fixture data |
| Database | Use a test database or mock the DB client |
| Auth / session | Mock the auth middleware, return a known test user |
| Timers | Use `vi.useFakeTimers()` for time-dependent code |
| Browser APIs | Use `jsdom` environment or mock via `vi.stubGlobal()` |

### Mock Boundaries

Prefer mocking at the **module boundary**, not deep internals:

```typescript
// ✅ Good: Mock the external dependency
vi.mock("~/lib/email", () => ({
  sendEmail: vi.fn().mockResolvedValue({ ok: true }),
}));

// ❌ Bad: Mock internal implementation details
vi.mock("fs", () => ({ ... }));
```

## 5. Environment-Specific Test Configuration

Use file-level environment pragmas for tests that need a specific environment:

```typescript
// For React component tests:
// @vitest-environment jsdom

// For API/server-side tests (default):
// No pragma needed — vitest defaults to "node"
```

## 6. Async Patterns

Always use `async/await` for async tests:

```typescript
it("fetches user data", async () => {
  const user = await fetchUser("user-1");
  expect(user.name).toBe("Jane Doe");
});
```

Never use callbacks with `done` — it's error-prone.

## 7. Parametrized Tests

Use `.each` for testing many inputs:

```typescript
it.each([
  { input: "hello@example.com", expected: true },
  { input: "not-an-email", expected: false },
  { input: "", expected: false },
])("isValidEmail('$input') → $expected", ({ input, expected }) => {
  expect(isValidEmail(input)).toBe(expected);
});
```

## 8. Component Testing (React)

- Use `@testing-library/react` (always)
- Test through accessibility roles and `data-testid` attributes
- Fire user events with `fireEvent` or `@testing-library/user-event`
- Assert on rendered output (DOM), not component state

```typescript
// ✅ Good
fireEvent.click(screen.getByRole("button", { name: /submit/i }));
expect(screen.getByText("Submitted!")).toBeInTheDocument();

// ❌ Avoid testing internal state
// expect(component.state().isSubmitting).toBe(true);
```

## 9. Coverage Requirements

| Metric | Minimum Threshold | Target |
|--------|------------------|--------|
| Statements | 80% | 90% |
| Branches | 80% | 85% |
| Functions | 80% | 90% |
| Lines | 80% | 90% |

Coverage is enforced in CI. New code should aim to meet or exceed these thresholds.

## 10. CI Integration

Tests run in CI on every push and pull request (see `.github/workflows/ci.yml`).

- Unit + integration tests run in parallel across OS/Node versions
- Coverage report is generated and uploaded
- Test failures block the PR from merging