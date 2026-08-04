# AGENTS.md — design/playground

## Project Overview

Astro 7 prototype of the workspace UI under `design/playground/`. Used to explore and validate the workspace interface before implementation in the main app.

## Mandatory Tools

**pnpm is the only package manager.** Never use `npm` or `yarn`.

```bash
pnpm install                  # Install deps
pnpm add <pkg>                # Add a dependency
pnpm add -D <pkg>             # Add a dev dependency
```

**Tailwind CSS v4 is mandatory for all styling.** Wired via the `@tailwindcss/vite` plugin in `astro.config.mjs`. Every style change must use Tailwind utility classes or the Tailwind-based token scale — no handwritten CSS for layout or components.

## Tech Stack

| Technology | Role |
|---|---|
| Astro 7 | Builder / component framework |
| Tailwind CSS v4 | All styling (`@tailwindcss/vite` plugin) |
| Alpine.js 3.x | Client reactivity (bundled via pnpm) |
| TypeScript | All logic + mock data under `src/` |
| iconify-icon | Icon web component |
| pnpm | Package manager (only one allowed) |

Design token reference: `/DESIGN.md`.

## Setup Commands

```bash
pnpm install                 # Install dependencies
```

Requires Node >= 22.12.0 (`engines` in `package.json`).

## Development Workflow

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

| Command | Description |
|---|---|
| `pnpm dev` | Dev server (localhost:4321) |
| `pnpm astro dev --background` | Background mode dev server |
| `pnpm check` | Type-check all Astro + TS files |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview production build |

## Project Structure

```
design/playground/
  src/
    data/         — Typed mock data (types, schemas, entries, discussions, members)
    lib/          — Icon map, date helpers, tweaks config
    scripts/      — Alpine store (workspace.ts) + mixins (editor, modals)
    components/   — Alpine-driven UI components
    layouts/      — WorkspaceLayout (root x-data)
    pages/        — Astro routes
    styles/       — Global styles
  public/         — Static assets only (no scripts)
```

## Testing Instructions

No test framework is configured in this project. Verification is done via:

- `pnpm check` — TypeScript + Astro type-checking
- `pnpm build` — production build as a smoke test

## Code Style

- **Tailwind CSS v4 for all styling.** No hardcoded colors; use CSS variables or Tailwind semantic tokens.
- **Font sizes from token scale:** 30 / 24 / 20 / 16 / 14 / 12px.
- **No shadows, no gradients, no hover transforms.**
- **No Astro icon wrapper.** Single `<iconify-icon>` element (never wrapped in an Astro component), single icon set `mingcute`, mappings in `src/lib/icons.ts` via `getIconName()`.
- **Packages over CDNs.** No `<script src>` for packages available via pnpm.
- **Astro dev toolbar disabled** (`devToolbar: { enabled: false }` in `astro.config.mjs`).

## Client Store

Alpine is bundled via pnpm (`alpinejs`), not CDN. The global store lives in `src/scripts/`:

- `workspace.ts` — `Alpine.data('workspace')` factory (state, getters, init, `Alpine.start()`)
- `editor.ts` — editor/slash/floating-format actions
- `modals.ts` — modal/search/conversation/settings actions
- `store.ts` — `WorkspaceStore` interface (full store contract)

Root `x-data="workspace()"` sits on `<html>` in `WorkspaceLayout.astro`. Templates never import store internals — they call store methods via Alpine bindings. `getIconName`, `formatDate`, `formatRelativeTime` are also exposed on the store for template use.

## Icon System

Install iconify-icon via pnpm, not CDN:

```bash
pnpm add iconify-icon
```

Import in `WorkspaceLayout.astro`:

```html
<script>import 'iconify-icon';</script>
```

Pattern — single `<iconify-icon>` element (no Astro wrapper, no custom SVGs):

```astro
<iconify-icon :icon="getIconName('search')" class="w-3.5 h-3.5"></iconify-icon>
```

The `display: inline-flex; align-items: center;` is handled globally in CSS.

## Rules

1. **`pnpm`, never `npm`.**
2. **Tailwind CSS for all styling.**
3. **Packages over CDNs.** No `<script src>` for packages available via pnpm.
4. **No Astro icon wrapper.** Single `<iconify-icon>` element, never wrapped in an Astro component.
5. **No hardcoded colors.** CSS variables or Tailwind semantic tokens.
6. **No shadows, no gradients, no hover transforms.**
7. **Font sizes from token scale:** 30 / 24 / 20 / 16 / 14 / 12px.
8. **Astro dev toolbar disabled** (`devToolbar: { enabled: false }` in config).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
