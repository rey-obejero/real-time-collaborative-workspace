# ADR 0001: Testing Stack

## Status

Accepted

## Context

The project had no test framework configured. The back-end recently adopted a
unified `Result`/`Error` pattern and moved validation into the application
layer, so there is now testable, interface-driven business logic (workspace,
entry, and RBAC services) that warrants coverage. The goal is a layered
strategy — unit, integration, then end-to-end — applied **back-end-first**,
with a real database for integration tests and real browser flows for E2E.

## Decision

- **Back-end unit tests**: xUnit with NSubstitute for mocking.
- **Back-end integration tests**: xUnit with `WebApplicationFactory` against
  **Testcontainers (PostgreSQL)** — a real database per test run.
- **End-to-end tests**: Playwright (`@playwright/test`), as a standalone
  package in `./e2e/`, covering thin critical user journeys.
- **Front-end unit/component tests** (Vitest + Testing Library): **deferred**.

## Alternatives Considered

### Unit testing framework

- (x) xUnit + NSubstitute
- ( ) Moq — carries supply-chain incident history (a malicious telemetry
  package); NSubstitute avoids that and has a cleaner, less lambda-heavy API.

### Integration database

- (x) Testcontainers (PostgreSQL) — exercises real SQL behavior (constraints,
  transactions, GUID defaults) and matches the production database engine.
- ( ) EF Core `InMemory` — fast and zero-infra, but diverges from real
  PostgreSQL behavior and can hide bugs.

### End-to-end framework

- (x) Playwright (`@playwright/test`) — industry-standard browser automation,
  real cross-page journeys against the running stack.
- ( ) Cypress — capable, but already used elsewhere in the author's experience;
  Playwright is the current default choice for this stack.

### Sequencing

- (x) Back-end first (unit → integration → E2E)
- ( ) Front-end unit first (Vitest) — deferred; back-end coverage is the
  priority.

### Front-end unit tooling (if added later)

- ( ) Vitest — Vite-native, Jest-compatible API; the intended choice should
  front-end unit/component tests be introduced.
- ( ) Jest — not selected.
