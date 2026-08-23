# Testing Strategy

This document describes the testing approach for the Collaborative Workspace
monorepo (`modules/api` + `modules/web`). The strategy is **back-end-first** and
layered: unit tests prove business logic in isolation, integration tests prove
the API against a real database, and end-to-end (E2E) tests prove critical user
journeys through a real browser.

See [`adr/0001-testing-stack.md`](adr/0001-testing-stack.md) for the decision
and the alternatives that were considered. Progress tracking lives in
[`roadmap.md`](roadmap.md).

## Test levels

| Level | Scope | Tooling | Location |
|-------|-------|---------|----------|
| Unit (back-end) | Pure business logic; dependencies mocked | xUnit + NSubstitute | `modules/api/tests/KnowledgeManagementApp.Api.UnitTests/` |
| Integration (back-end) | HTTP → database; real PostgreSQL | xUnit + `WebApplicationFactory` + Testcontainers (PostgreSQL) | `modules/api/tests/KnowledgeManagementApp.Api.IntegrationTests/` |
| E2E | Full user journeys in a real browser | Playwright (`@playwright/test`) | `./e2e/` (standalone package) |
| Unit/component (front-end) | Stores, hooks, components | Vitest + Testing Library | **Deferred** |

## Organization

Unit and integration live in **separate projects** split by *scope* (pure logic
vs. pipeline). This is a deliberate horizontal split because the two require
different fixtures (NSubstitute mocks vs. a containerized database). Within each
project, tests are organized **vertically per service/feature**
(`WorkspaceServiceTests`, `EntryServiceTests`, …) so a feature's tests stay
local to one file.

## Conventions

- **Services depend on interfaces** (`IWorkspaceRepository`, `IUnitOfWork`,
  `IUserContext`, `IPermissionService`, …). Mock these with `Substitute.For<T>()`.
- **Validators** (FluentValidation) need no mocking — instantiate and call
  `Validate(request)` directly.
- **Errors** flow through the unified `Result`/`Error` shape via
  `ResultExtensions` (`MapError` maps `Validation`→400, `NotFound`→404,
  `Conflict`→409, `Forbidden`→403, else 500). Tests assert on the produced
  `IActionResult` status.
- **`IUserContext`** is a trivial getter; use a hand-written `UserContextFake`
  rather than a mock.
- Naming: `*Tests.cs`, with `[Fact]` for single cases and `[Theory]` for
  parameterized cases.

## How to run

```console
# Back-end unit tests
dotnet test modules/api/tests/KnowledgeManagementApp.Api.UnitTests/

# Back-end integration tests (requires Docker for the PostgreSQL container)
dotnet test modules/api/tests/KnowledgeManagementApp.Api.IntegrationTests/

# End-to-end tests (standalone ./e2e package)
cd ./e2e
npm install
npx playwright install   # download browser binaries (one-time)
npx playwright test      # against `make application`
```

