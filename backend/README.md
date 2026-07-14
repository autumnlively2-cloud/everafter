# Shipyard Engineering — Backend

A modular Node.js/TypeScript API project using clean architecture patterns.

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | [Bun](https://bun.sh) |
| Framework | [Hono](https://hono.dev) — lightweight, fast, TypeScript-first |
| Validation | [Zod](https://zod.dev) |
| Testing | [Vitest](https://vitest.dev) |
| Database | (pluggable — see schema patterns) |

## Project Structure

```
backend/
├── src/
│   ├── index.ts          # Entry point — server bootstrap
│   ├── config/           # Environment configuration
│   ├── routes/           # Route definitions (HTTP layer)
│   ├── controllers/      # Request/response handling
│   ├── services/         # Business logic layer
│   ├── repositories/     # Data access layer (abstracted)
│   ├── models/           # Type definitions & schemas
│   ├── middleware/        # Hono middleware (logging, errors)
│   └── utils/            # Shared utilities & error classes
├── tests/                # Integration & unit tests
├── examples/             # Working code examples
│   └── crud-example/     # Full CRUD scaffolding example
├── .env.example          # Environment variable template
├── vitest.config.ts      # Test configuration
└── package.json
```

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server (with hot reload)
bun run dev

# Run tests
bun run test

# Build for production
bun run build

# Start production server
bun start
```

## Architecture

The project follows **clean architecture** with strict separation of concerns:

```
Route → Controller → Service → Repository → Storage
```

| Layer | Responsibility |
|-------|---------------|
| **Route** | Define HTTP method + path, bind to controller |
| **Controller** | Parse request, call service, format response |
| **Service** | Business logic, validation, orchestration |
| **Repository** | Data access abstraction (CRUD) |
| **Model** | Type definitions and data schemas |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API info and version |
| GET | `/health` | Health check (status, uptime, environment) |

## Adding a New Resource

See `examples/crud-example/client-resource.ts` for a complete working example.

The pattern is:
1. Define a model in `src/models/`
2. Create a repository extending `BaseRepository`
3. Create a service with business logic
4. Create a controller for HTTP handling
5. Define routes in `src/routes/`
6. Register in `src/routes/index.ts`

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `HOST` | `0.0.0.0` | Bind address |
| `NODE_ENV` | `development` | Environment mode |
| `LOG_LEVEL` | `info` | Logging verbosity |
| `DATABASE_URL` | — | Database connection string |