# Product

> Inferred-from-prototype mode. Evidence column flags what was read in the prototype vs. inherited from prior session context.

> **Drift (2026-07-28):** Started as a single-user PKMS ("second brain"). Now drifting toward a capable multi-user workspace (Notion / AnyType parity). Solo use is fully supported today; members, roles, and shared editing are on the trajectory, not shipped. See `DESIGN.md` for the visual-side of this shift.

## Platform

A typed object workspace, drifting from single-user PKMS toward a capable multi-user tool (Notion / AnyType parity).

- **Monorepo** (inferred — handoff):
  - `apps/api` — ASP.NET Core 10 REST API, Clean Architecture
  - `apps/web` — React 19 SPA, Vite, shadcn/ui, Tailwind v4
- **Data** (inferred — handoff): PostgreSQL 18 in Docker; EF Core with SQLite for dev / Npgsql for prod.
- **Runtime mode:** Solo today, multi-user trajectory. Prototype is a static HTML/Alpine.js file (`design/workspace/page.html`) with in-memory mock data — no live backend, no auth, no persistence. The workspace switcher in the sidebar already supports multiple workspaces per user; the member data model is the missing piece.

## Users

- **Primary:** Knowledge workers building a personal corpus of notes, tasks, projects, and references — solo.
- **Secondary (trajectory):** Small teams that want a shared, typed workspace for projects, docs, and bookmarks. Not yet supported; the chrome (workspace switcher, Assignee / Owner chips, per-entry discussions, Members settings tab) is in place, the data model is not.
- **No multi-tenant in prototype.** No auth, no invites, no roles, no per-entry sharing. Members tab is a planned surface, not a stub.

## Product Purpose

Capture, connect, and recall any object the user encounters. Not a productivity system, not a project manager, not a wiki. A typed object store for the mind — built to scale from solo use to shared workspaces without re-thinking the model.

## Positioning

**Model:** AnyType's object system (inferred — handoff, locked invariant).
- **Schemas** = types (Page, Task, Project, Note, Bookmark).
- **Entries** = instances of a schema.
- **Collections** = filtered queries over entries.

**Forbidden IA** (inferred — handoff, locked invariant): PARA, GTD, and other top-level frameworks. The schemas are the IA. Collections group by status / recency, not by methodology.

## Operating Context

- Browser-based SPA. Desktop-class — prototype uses fixed 3-column layout with no responsive collapse.
- No mobile layout in prototype.
- Light + dark mode (sun/moon toggle in header). Light is default.
- Keyboard-driven: `⌘K` opens search, `/` opens slash-command block menu, `Esc` closes modals/menus.

## Capabilities and Constraints

### Capabilities (confirmed — prototype)

- 5 schemas: **Page** (long-form docs), **Task** (action items with status/priority/due), **Project** (container for related objects, with timeline), **Note** (quick capture), **Bookmark** (saved URLs).
- 4 collections in sidebar: All, Recent, Drafts, In Progress.
- List view: type icon, title, status, tags, updated date.
- Editor view: title, property chips (Status / Priority / Due / Timeline / URL / Assignee / Owner / Tags) — Assignee and Owner are the hooks for the future member identity system, rich-text body, footer stats (chars/words/reading time).
- Inline creation via `+ New` popover (one button per schema).
- Quick Action search modal (⌘K).
- Slash-command block menu (`/`) in editor.
- Per-entry discussion thread in right-hand panel (toggled). Will gain `@mentions` and reactions when the member system lands.
- Workspace switcher (multiple workspaces per user; the multi-tenant entry point).
- Settings modal: General / Members / Schemas / Advanced tabs. General works (save button). Members is a planned surface. Schemas and Advanced are placeholders.
- Sort + Filter buttons in list header (placeholders — no behavior).
- Trash archive (placeholder).

### Constraints (confirmed — prototype)

- **No new-schema UI.** "New Schema" button is disabled with a "soon" label.
- **No real backend.** All data is in-memory; reload wipes state.
- **No persistence layer wired.** Schemas are hard-coded; entries are a 20-item mock seed.
- **No rich-text format.** Editor body is `contenteditable`; no BlockNote blocks or markdown serialization in prototype.
- **Sort/Filter/Trash/Export are stubs** — buttons exist, no behavior.
- **Settings tabs vary:** General works (save button). Members is a planned surface (chrome present, no data model). Schemas and Advanced are placeholders.
- **No member system.** No users, no roles, no auth, no invites, no per-entry sharing. Workspace switcher in the sidebar already supports multiple workspaces; the data model that connects users to workspaces is the blocker.
- **No per-entry permissions.** Entries live in a workspace; "private to me" vs "shared" is not modeled. Default visibility toggle exists in settings as a future hook.
- **B&W color system.** All schema types render in the same neutral grey. All status colors are 4-step grayscale. Color reserved for future differentiation, not used now (confirmed — handoff, locked invariant).
- **No tests.** No test framework configured (inferred — handoff).

## Brand Commitments

- **Restraint over decoration.** Prototype references "Linear / Vercel / shadcn" as aesthetic ancestors. The "saas" variant is the active design direction.
- **Type as identity.** Differentiation between schemas and statuses is by glyph shape + text label, not by color. The `--type-*` and `--status-*` CSS variables exist but all resolve to greys — the system is pre-wired for color but ships monochrome.
- **Monochrome with one grayscale gradient.** The only "color" is a `linear-gradient(90deg, #0a0a0a → #71717a)` applied to the workspace-name text in the sidebar. Everything else is pure B&W.
- **Density is intentional.** Body 12px, chrome 10px, title 24px, entry title 32px. Tight but legible.

## Evidence on Hand

- `design/workspace/page.html` (2605 lines) — full prototype, read.
- `design/workspace/assets/img/screenshots/page/001.png` — list view, pre-polish state (avatar still showed "K").
- `design/workspace/assets/img/screenshots/page/002.png` — editor view, "Design tokens audit" task with discussion thread.
- Prior-session handoff — provided tech stack, monorepo layout, locked invariants, and variant list.

## Product Principles

1. **Schemas are the IA.** No folder hierarchies, no methodology overlays. The 5 schemas (Page / Task / Project / Note / Bookmark) carry the structure.
2. **Collections are queries, not folders.** All / Recent / Drafts / In Progress are views. Same entry can appear in many.
3. **Type before color.** Identity is glyph + label. Color is reserved for the day it earns its keep.
4. **Density rewards use.** Tight typography, small chrome, generous touch targets. A tool meant to live in, not visit.
5. **Object system, not notebook.** Pages, tasks, projects, notes, and bookmarks are all objects of the same kind. Differences are in their property sets, not in their citizenship. The same model scales from solo use to shared workspaces without re-thinking.
6. **Workspaces are the tenancy unit.** Each user can belong to multiple workspaces. The active workspace is the scope of the main pane. Entries don't escape their workspace's permissions. Members, roles, and per-entry sharing are first-class concerns on the trajectory, not afterthoughts.

## Accessibility & Inclusion

**Status (from prototype):** Mostly inherited from shadcn defaults. Not actively designed for.

- **Confirmed:** focus rings on interactive elements, `prefers-reduced-motion` respected, `select-none` on chrome (intended to prevent accidental text selection on drag).
- **Inferred concern:** type is 10–12px. Comfortable for desktop; below WCAG-large text at the 10px chrome size. May not pass WCAG 2.2 AA at default zoom.
- **Not implemented:** screen-reader labels for icon-only buttons, keyboard navigation across the entry list, visible focus indicator contrast.
- **Multi-user a11y (trajectory):** member switcher announcements, presence indicators for screen readers, keyboard nav across `@mention` autocomplete, focus management for live-collaborative cursors. None of this lands until the member system lands.
- **No localization.** All copy in English.

Accessibility is an open debt, not a blocker for the demo. Wire shadcn primitives' a11y defaults through the React build and audit.
