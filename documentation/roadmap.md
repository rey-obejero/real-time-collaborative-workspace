# Roadmap

Task backlog. `[x]` marks completed work; items labeled *deferred* are
intentionally postponed.

## Features

### Authentication
- [ ] OIDC compliance
- [ ] OAuth schemes

### Workspaces
- [ ] Workspace memberships
- [ ] Real-time entry collaboration *(least priority)*
- [ ] Dynamic and granular roles/permissions
- [ ] Workspace API key generation for programmatic access

### Entries
- [ ] Entry sharing for non-workspace members
- [ ] Browser extension for quick GTD-style inboxing

### Human-readable URLs
- [ ] Legible URLs for bookmarking and address-bar autocomplete

### Conversations
- [ ] Conversations

### AI
- [ ] Conversations assistant

## Testing (see [Testing Strategy](testing.md) and [ADR 0001](adr/0001-testing-stack.md))

### API
- [ ] Unit tests (xUnit + NSubstitute)
  - [ ] Workspaces (`WorkspaceService`)
    - [x] `AddWorkspaceMemberAsync`: success + insufficient-permission cases
  - [ ] Entries (`EntryService`)
  - [ ] Permissions (`PermissionService`)
- [ ] Integration tests (`WebApplicationFactory` + Testcontainers PostgreSQL)

### End-to-end
- [x] Playwright suite (standalone `./e2e/`)
- [x] Smoke test: load app → sign-up / sign-in → create workspace

### Web client
- [ ] Unit tests (Vitest) — deferred
- [ ] Component tests — deferred

## CI/CD

- [x] Adopt pnpm (new root `package.json`; convert `modules/web` from npm)
- [x] Lefthook local hooks (`pre-commit` / `commit-msg` / `pre-push`) via root
      pnpm package
- [x] commitlint enforcing Conventional Commits
- [x] GitHub Actions CI — `web` (lint + build), `api` (build + unit test), and
      `e2e` (compose up → Playwright → teardown) jobs on push + pull_request
- [x] Docs — hooks + pipeline in `documentation/ci-cd.md`

## Infrastructure

- [x] Dockerize API + web (multi-stage `Dockerfile`s)
- [x] Production Compose monolith (PostgreSQL + Caddy + API + web)
- [x] `Vagrantfile` — Ubuntu VM + Docker (local VPS emulation)
- [x] Ansible playbook — Docker + Caddy + Compose deploy + DuckDNS
- [x] Terraform provider-agnostic module (validate locally; apply deferred)
- [ ] Bump vulnerable NuGet packages — `Microsoft.OpenApi` 2.0.0 and
      `SQLitePCLRaw.lib.e_sqlite3` 2.1.11 (NU1903 high severity)
