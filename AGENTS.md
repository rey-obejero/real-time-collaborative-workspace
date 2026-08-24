# AGENTS.md

## Project Overview

Personal Knowledge Management (PKM) web application — a "second brain" tool inspired by PARA methodology and Getting Things Done (GTD).

**Architecture:** pnpm workspace monorepo with two apps plus an E2E suite:
- `modules/api` — ASP.NET Core REST API (C#, .NET 10.0, Clean Architecture)
- `modules/web` — React 19 SPA (TypeScript, Vite, shadcn/ui, Tailwind CSS v4)
- `e2e` — Playwright end-to-end tests

**Package management:** [pnpm](https://pnpm.io) workspace (root `package.json`,
single root lockfile). Enable it once per machine with `corepack enable`.

**Database:** PostgreSQL 18 (Docker), EF Core with SQLite for dev / Npgsql for prod.

## Setup Commands

```bash
# One-time setup (installs workspace deps + git hooks + trusts Caddy's local CA)
make setup

# Start everything (Caddy proxy + web + API + DB)
make application

# Start PostgreSQL container
make database-up

# Run API (starts DB + watches for changes)
make api

# Run web dev server
make web
```

Local domains (via Caddy reverse proxy):
- Web: `https://workspace.localhost`
- API: `https://api.workspace.localhost`

## Development Workflow

### Makefile Targets (root)

| Command | Description |
|---------|-------------|
| `make` | Show help |
| `make setup` | One-time per machine: install workspace deps via pnpm + install Lefthook git hooks + grant Caddy privileged ports (setcap) + trust Caddy local CA (`infrastructure/caddy-trust.sh`). Requires `certutil` (`libnss3-tools` on Debian/Ubuntu, `nss-tools` on Fedora/RHEL) for Firefox trust (see README) |
| `make application` | Start Caddy proxy + web + API + database |
| `make web` | Start web dev server (`pnpm --filter knowledge-management-app-web dev`) |
| `make api` | Start API + database (`dotnet watch run` + `docker compose up`) |
| `make caddy-start` | Start Caddy reverse proxy (`caddy start --config infrastructure/Caddyfile`) |
| `make caddy-stop` | Stop Caddy reverse proxy |
| `make caddy-trust` | Trust Caddy's local CA (idempotent; safe when Caddy already running) |
| `make database-up` | Start PostgreSQL container |
| `make database-down` | Stop PostgreSQL container |

### Web (`modules/web`)

Run from the repository root; `pnpm` resolves the workspace filter.

| Command | Description |
|---------|-------------|
| `pnpm --filter knowledge-management-app-web dev` | Start Vite dev server with hot reload |
| `pnpm --filter knowledge-management-app-web build` | Type-check + production build (`tsc -b && vite build`) |
| `pnpm --filter knowledge-management-app-web lint` | Run ESLint |
| `pnpm --filter knowledge-management-app-web preview` | Preview production build |

### API (`modules/api`)

| Command | Description |
|---------|-------------|
| `dotnet watch run` | Run API with hot reload |
| `dotnet build` | Build project |

### Environment Variables

See `.env.example` at repo root. Required for Docker:
- `DB_NAME` — Database name
- `DB_USER` — Database user
- `DB_PASSWORD` — Database password
- `JWT_SECRET` — Production token-signing key (production Compose stack)
- `DOMAIN` — Site name for Caddy auto-HTTPS (production Compose stack)

Copy `.env.example` to `.env` and fill in values.

## Testing Instructions

The testing strategy is documented in `documentation/testing.md` (see also `documentation/adr/0001-testing-stack.md`).

- **API unit tests:** xUnit + NSubstitute, in `modules/api/tests/KnowledgeManagementApp.Api.UnitTests/`. Run with `make test-unit`.
- **API integration tests:** `WebApplicationFactory` + Testcontainers PostgreSQL (planned).
- **E2E tests:** Playwright in `e2e/`, run against the containerized stack:
  ```bash
  docker compose -f infrastructure/docker-compose.e2e.yml up -d --build --wait
  pnpm --filter knowledge-management-app-e2e exec playwright install chromium
  pnpm --filter knowledge-management-app-e2e test
  docker compose -f infrastructure/docker-compose.e2e.yml down -v
  ```
- **Web unit/component tests:** Vitest + Testing Library (deferred). Place as `*.test.ts(x)` next to source or in `__tests__/`.

When adding tests, mock service dependencies with `Substitute.For<T>()`; use a hand-written `UserContextFake` for `IUserContext`.

Lefthook runs web lint + API build on every commit and the unit suite before
each push. Always run lint checks before committing:
```bash
pnpm --filter knowledge-management-app-web lint
```

## Code Style

### Web (`modules/web`)

- **TypeScript:** Strict mode enabled. Path alias `@/*` maps to `src/*`.
- **Linting:** ESLint flat config with `@typescript-eslint`, `react-hooks`, `react-refresh` plugins.
- **Formatting:** Prettier not configured — follow existing file formatting.
- **Component patterns:** React Server Components not used. Client-side state via Zustand, server state via TanStack React Query.
- **UI:** shadcn/ui components with Radix UI primitives. Lucide icons. Olive base color theme.
- **File organization:** Vertical slice architecture under `src/features/`. Shared UI in `src/components/`.

### API (`modules/api`)

- **Architecture:** Clean Architecture with layers: Web → Application → Infrastructure → Domain.
- **C# conventions:** Follow Microsoft C# Coding Conventions. PascalCase for public members, camelCase for locals.
- **Validation:** FluentValidation for request validation.
- **Mapping:** Mapperly for object-to-object mapping.
- **Logging:** Serilog configured.
- **API docs:** NSwag for OpenAPI/Swagger generation.

### Git Conventions

- Commit messages: Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.), enforced by commitlint on the `commit-msg` hook
- Branch naming: `feature/description`, `fix/description`, `refactor/description`

## Architecture Notes

### API Clean Architecture Layers

```
Web (Controllers, Validators, HTTP)
  ↓
Application (Commands, Queries, DTOs, Business Logic)
  ↓
Infrastructure (EF Core DbContext, Repositories, JWT, Identity)
  ↓
Domain (Entities, Errors, Repository Interfaces)
```

- Composition Root wires dependencies at startup.
- Application layer depends only on Domain (no infrastructure references).
- Infrastructure implements Domain interfaces.

### Web Vertical Slice Architecture

```
src/
  app/          — Router, route definitions, provider setup
  features/     — Domain-scoped feature modules (auth, entries, workspaces)
  components/   — Shared UI (layouts, sidebar, shadcn primitives)
  lib/          — API client (axios), React Query config, utilities
```

- Each feature under `features/` is self-contained: components, hooks, API calls, types.
- Avoid cross-feature imports. Share via `components/` or `lib/`.
- API client configured with axios base URL from environment.

## Build and Deployment

### Docker

- `infrastructure/docker-compose.yml` — development PostgreSQL only; API and
  web run on the host via Makefile.
- `infrastructure/docker-compose.e2e.yml` — self-contained stack for the E2E
  suite (`127.0.0.1:8080`), also used by the Vagrant emulation VM.
- `infrastructure/docker-compose.prod.yml` — production monolith (PostgreSQL +
  API + web/Caddy, ports 80/443). Requires `JWT_SECRET` + `DOMAIN`.
- Images: multi-stage `modules/api/Dockerfile` and `modules/web/Dockerfile`.
  See `documentation/ci-cd.md` for details.

### Production Build

```bash
# Web production build
pnpm --filter knowledge-management-app-web build
# Output: modules/web/dist/

# API publish
cd modules/api && dotnet publish -c Release
```

## Pull Request Guidelines

- Title format: `type(scope): description` (Conventional Commits)
- Required checks before merge:
  - `pnpm --filter knowledge-management-app-web lint` passes
  - `pnpm --filter knowledge-management-app-web build` passes
  - `cd modules/api && dotnet build` passes
- Run all tests if tests have been added. CI runs these checks automatically on every push and pull request.

## Additional Notes

- **Path aliases:** Web uses `@/*` → `src/*`. API uses standard .NET namespace resolution.
- **Database migrations:** EF Core migrations managed via `dotnet ef` commands. Check `modules/api/Infrastructure/` for DbContext; containers apply migrations automatically at startup outside Development.
- **Authentication:** JWT bearer tokens with ASP.NET Core Identity. Web client stores tokens and attaches to API requests.
- **Rich text editor:** BlockNote used for entry content editing in web app.
- **CI/CD:** GitHub Actions workflow in `.github/workflows/ci.yml`; tooling documented in `documentation/ci-cd.md`.