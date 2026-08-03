# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Personal users** building a second brain. They capture ideas, manage tasks,
organize bookmarks, and write long-form documents. They operate solo, across
multiple projects and areas of life.

**Small teams** sharing a workspace. They collaborate on projects, assign tasks,
discuss entries in threaded conversations, and maintain a shared knowledge base.

## Product Purpose

A personal knowledge management system that serves as a second brain. It
provides a flexible way to structure and organize information: you decide what
kinds of items your workspace holds instead of being locked into generic pages
and templates.

The product replaces scattered tools — notes apps, task managers, bookmark
managers — with one workspace organized around typed objects and freeform
editing.

## Positioning

**Opinionated structure, defined by you.** Notion gives you pages and
templates and leaves everything else open; this product flips that: it lets you
define the kinds of items your workspace holds (Page, Task, Project, Note,
Bookmark) and gives you an opinionated flow for capturing, classifying, and
organizing them. Each entry type carries its own properties (status, priority,
assignee, due date, URL) while remaining a freeform canvas for prose, lists,
headings, and quotations. Structure stays flexible, but the flow guides you.

## Operating Context

- Users switch between quick capture (new entry via shortcut) and deep editing
  (rich text with slash commands).
- Collections filter entries by recency, status, or schema type.
- Conversations are threaded around specific entries for team discussion.
- AI assistance is available on any entry.
- Dark and light modes support all-day use.

## Capabilities and Constraints

**Confirmed:**

- Schema-based entry types: Page, Task, Project, Note, Bookmark
- Each type defines its own properties (status, priority, due, assignee, owner,
  URL, tags)
- Rich text editor with slash commands, formatting toolbar, and block insertion
- Workspace switching (Personal Space and shared workspaces)
- Workspace members with invite flow and roles
- Collections: All, Recent, Drafts, In Progress
- Full-text search across entry titles and tags
- Threaded conversations on entries
- AI conversation integration
- Real-time save indicator
- Dark/light theme toggle
- Monorepo: .NET 10.0 API + React 19 SPA
- PostgreSQL 18 database, JWT authentication

**Undecided:**

- OAuth provider strategy (OIDC compliance planned, specific scheme TBD)
- API key generation for programmatic access
- Browser extension for quick capture
- Entry sharing for non-workspace members
- Real-time collaboration model

## Brand Commitments

- Product name: "Workspace"
- Current design (anti-reference): bold, high-contrast, visually assertive.
  Being replaced by a quiet, muted, tame minimal design language.
- Target visual world: quiet, muted, tame. Minimalist design chosen to mask
  AI-generated content and avoid corporate "AI slop" aesthetic.

## Evidence on Hand

- Design prototype: `design/playground/` (Astro 7, Tailwind CSS v4, Alpine.js)
- API: `apps/api/` (ASP.NET Core, Clean Architecture)
- Web: `apps/web/` (React 19, Vite, shadcn/ui)
- Root README with roadmap

## Product Principles

1. **Structure meets fluidity.** Every entry is both a typed object and a
   freeform document. Properties and prose are peers, not separate tools.
2. **Capture before classify.** Quick capture paths lower the cost of getting
   ideas in. Classification comes later.
3. **Workspaces are the boundary.** Personal space and team spaces share the
   same interaction model. Switching between them is one action.
4. **AI is ambient, not modal.** AI lives alongside content — discuss
   selections, ask questions — without leaving the editor.
5. **Sync is trust.** The save indicator is a promise. Observers will never see
   stale state.

## Accessibility & Inclusion

- Keyboard-first interaction
- Dark mode support
- System fonts with font-feature-settings for readability
- Reduced motion media query respected
