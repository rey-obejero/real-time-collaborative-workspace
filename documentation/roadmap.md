# Roadmap

This document tracks planned features and engineering initiatives for the
Real-Time Collaborative Workspace.

## Features

- [ ] Authentication
  - [ ] OIDC compliance
  - [ ] OAuth schemes
- [ ] Workspaces
  - [ ] Workspace memberships
  - [ ] Real-time entry collaboration (least priority)
  - [ ] Dynamic and granular roles/permissions
  - [ ] Workspace API key generation for programmatic access
- [ ] Entries
  - Entries sharing for non-workspace members
  - Browser extension for quick GTD-style inboxing
- [ ] Human-readable URLs for improved bookmark and address bar autocomplete legibility
- [ ] Conversations
- [ ] AI
  - [ ] Conversations assistant

## Engineering Initiatives

- [ ] Testing (see [Testing Strategy](testing.md) and
      [ADR 0001](adr/0001-testing-stack.md))
  - [ ] API unit tests (xUnit + NSubstitute)
    - [ ] Workspaces (`WorkspaceService`)
      - [x] `AddWorkspaceMemberAsync`: success + insufficient-permission cases
    - [ ] Entries (`EntryService`)
    - [ ] Permissions (`PermissionService`)
  - [ ] API integration tests (`WebApplicationFactory` + Testcontainers PostgreSQL)
  - [ ] End-to-end tests (Playwright, standalone `./e2e/`)
  - [ ] Web unit/component tests (Vitest) — deferred

## Tooling & CI/CD

### Git hooks (Lefthook)

Local git hooks are managed with [Lefthook](https://github.com/evilmartians/lefthook),
configured from `lefthook.yml` at the repository root. Lefthook is added to
`modules/web` as a dev dependency (the project's only npm root) and installed by
`make setup` via `npx lefthook install`.

Configured hooks:

- `pre-commit` (parallel): runs `npm run lint` in `modules/web` and
  `dotnet build` on the API.
- `commit-msg`: runs `commitlint` to enforce Conventional Commits.
- `pre-push`: runs the back-end unit test suite
  (`dotnet test` on `modules/api/tests/KnowledgeManagementApp.Api.UnitTests/`).

Integration and end-to-end tests are intentionally excluded from local hooks
(integration requires Docker; E2E requires the full stack) and are intended for a
future CI pipeline.

See [Testing Strategy](testing.md) and [ADR 0001](adr/0001-testing-stack.md).
