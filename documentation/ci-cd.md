# CI/CD

Tooling and pipeline reference for the monorepo: package management, local Git
hooks, the GitHub Actions workflow, and the containerized deployment stacks.

## Package management (pnpm)

The repository is a [pnpm](https://pnpm.io) **workspace**. The root
`package.json` is private (never published to a registry) and pins the pnpm
version through `"packageManager"`, which [Corepack](https://nodejs.org/api/corepack.html)
reads so every machine and CI runner uses the same release:

```console
corepack enable    # one-time per machine; provides the `pnpm` binary
pnpm install       # installs every workspace member from the root lockfile
```

Workspace members are declared in `pnpm-workspace.yaml`:

| Member | Role |
|--------|------|
| `modules/web` | React SPA |
| `e2e` | Playwright end-to-end suite |

There is exactly **one lockfile** (`pnpm-lock.yaml`) at the root. Scripts in a
member are invoked with filters, e.g.
`pnpm --filter knowledge-management-app-web lint`. Shared development tooling
(Lefthook, commitlint) lives in the root package so it applies repo-wide.

## Local Git hooks (Lefthook)

Hooks are managed by [Lefthook](https://lefthook.dev) from `lefthook.yml`.
`make setup` (or `pnpm exec lefthook install`) syncs them into `.git/hooks/`.

| Hook | Runs | Commands |
|------|------|----------|
| `pre-commit` | before each commit, commands **in parallel** | `web-lint` — ESLint over `modules/web` · `api-build` — `dotnet build` of the API |
| `commit-msg` | after you write the message | `commitlint` against Conventional Commits |
| `pre-push` | once per `git push` | API unit test suite (`dotnet test`) |

Both `pre-commit` commands must succeed or the commit is aborted; `pre-push`
pays the slower test cost once per push instead of once per commit. Integration
and end-to-end tests intentionally do not run locally here — they require
Docker and the full stack, so they execute in CI instead.

## Commit messages

[commitlint](https://commitlint.js.org) with `@commitlint/config-conventional`
enforces [Conventional Commits](https://www.conventionalcommits.org): subjects
like `feat:`, `fix:`, `docs:`, `chore:` followed by an imperative description.
Invalid messages are rejected by the hook and would also fail any future
release automation that parses history.

## GitHub Actions pipeline

`.github/workflows/ci.yml` triggers on pushes to `main` and on every pull
request. Jobs run in parallel on fresh runners:

| Job | Steps |
|-----|-------|
| `web` | checkout → pnpm (from `packageManager`) → Node 22 + pnpm-store cache → `pnpm install --frozen-lockfile` → ESLint → type-check + Vite build |
| `api` | checkout → .NET SDK 10 → `dotnet build` → `dotnet test` (unit suite) |
| `e2e` | checkout → pnpm → Node 22 → install → boot `infrastructure/docker-compose.e2e.yml` (`--wait` gates on healthchecks) → Playwright Chromium → teardown (`down -v`, always) |

The `e2e` job proves the full containerized product — database, migrations,
API, reverse proxy, SPA — on every change.

## Container images and Compose stacks

Multi-stage images live next to their sources: `modules/api/Dockerfile`
(SDK build → ASP.NET runtime, non-root, port 8080) and `modules/web/Dockerfile`
(Node/pnpm build → Caddy serving the static bundle and proxying `/api/*`).
The web image bakes **two** Caddy configurations: `Caddyfile.prod`
(`{$DOMAIN}`, automatic HTTPS) and `Caddyfile.e2e` (`:80`, plain HTTP).

| Stack | File | Purpose |
|-------|------|---------|
| Development | `infrastructure/docker-compose.yml` + host processes via `make application` | PostgreSQL only in Docker; API/web run on the host |
| End-to-end | `infrastructure/docker-compose.e2e.yml` | Self-contained stack published on `127.0.0.1:8080` for Playwright (also used by the VM emulation mode) |
| Production | `infrastructure/docker-compose.prod.yml` | Monolith: PostgreSQL + API + web/Caddy publishing 80/443 |

Notes:

- The API applies EF Core migrations automatically at startup whenever it is
  *not* running in the Development environment.
- Production requires `JWT_SECRET` and `DOMAIN`; Caddy obtains certificates
  automatically and persists them in named volumes.
- `VITE_API_URL` is baked into the web bundle **at image-build time**
  (default `/api/v1`, consumed behind the same origin).

## Deploying

1. **Local VPS emulation** — `vagrant up --provider=libvirt`: an Ubuntu VM
   (KVM/libvirt, no VirtualBox) provisioned by the Ansible playbook in
   `emulation` mode; the app is reachable on `http://localhost:8080`.
   One-time setup steps live in `infrastructure/ansible/README.md`.
2. **Real server** — point `infrastructure/ansible/inventory/production.ini`
   at your host, provide the secrets/domain extra-vars documented in
   `infrastructure/ansible/README.md`, and run the same playbook; it installs
   Docker, rsyncs the repository, writes `.env`, brings up the production
   stack, and (optionally) refreshes a DuckDNS record every five minutes.
3. **Provisioning a machine** — `infrastructure/terraform/` holds a
   provider-agnostic module (validate locally; applying is deferred) with
   drop-in Hetzner/DigitalOcean examples under `examples/`.

## Environment variables

| Variable | Used by | Meaning |
|----------|---------|---------|
| `DB_NAME` / `DB_USER` / `DB_PASSWORD` | all Compose stacks | PostgreSQL credentials |
| `JWT_SECRET` | production stack | Token-signing key (required) |
| `DOMAIN` | production stack | Site name for Caddy auto-HTTPS (required) |
| `E2E_BIND` | e2e stack | Host bind address (defaults to `127.0.0.1`; set `0.0.0.0` inside the VM) |

See `.env.example` for the template.
