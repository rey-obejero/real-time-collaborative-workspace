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

- [ ] Testing foundation (see [Testing Strategy](testing.md) and
  [ADR 0001](adr/0001-testing-stack.md))
  - [ ] Phase 1 — Back-end unit tests (xUnit + NSubstitute)
  - [ ] Phase 2 — Back-end integration tests (Testcontainers + PostgreSQL)
  - [ ] Phase 3 — End-to-end tests (Playwright, standalone `./e2e/`)
  - [ ] Front-end unit/component tests (Vitest) — deferred
