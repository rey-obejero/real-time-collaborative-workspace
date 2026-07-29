# AGENTS.md — design/

## Package Manager

**pnpm only.** Lockfile: `pnpm-lock.yaml`.

```bash
cd design/playground && pnpm install
cd design/playground && pnpm add <pkg>
```

## Project Structure

```
design/
  assets/           — Reference screenshots
  playground/       — Astro 7 PKM workspace prototype
    src/            — Components, layouts, pages, styles
    public/scripts/ — Alpine.js workspace data
```

## Tech Stack

| Technology | Role |
|---|---|
| Astro 7 | Builder / component framework |
| Tailwind CSS v4 | `@tailwindcss/vite` plugin |
| Alpine.js 3.x | Client reactivity (CDN) |
| iconify-icon | Icon web component |
| pnpm | Package manager |

Design token reference: `/DESIGN.md`.

## Commands

```bash
cd design/playground

pnpm install                   # Install deps
pnpm dev                       # Dev server (localhost:4321)
pnpm astro dev --background    # Background mode
pnpm build                     # Production build → dist/
pnpm preview                   # Preview build
```

## Icon System

**Install iconify-icon via pnpm, not CDN.**

```bash
cd design/playground && pnpm add iconify-icon
```

Import in `WorkspaceLayout.astro`:
```html
<script>import 'iconify-icon';</script>
```

**Pattern — single `<iconify-icon>` element (no Astro wrapper, no custom SVGs):**

```astro
<iconify-icon :icon="getIconName('search')" class="w-3.5 h-3.5"></iconify-icon>
```

Do not wrap in Astro component — dimension collapse, breaks `currentColor`. The `display: inline-flex; align-items: center;` is handled globally in CSS.

Sets: Feather (default) → Heroicons → Phosphor → HugeIcons → Mage. Mappings in `workspace.js`.

## Rules

1. **`pnpm`, never `npm`.**
2. **Packages over CDNs.** No `<script src>` for packages available via pnpm.
3. **No Astro icon wrapper.** Single `<iconify-icon>` element, never wrapped in an Astro component.
4. **No hardcoded colors.** CSS variables or Tailwind semantic tokens.
5. **No shadows, no gradients, no hover transforms.**
6. **Font sizes from token scale:** 30 / 24 / 20 / 16 / 14 / 12px.
7. **Astro dev toolbar disabled** (`devToolbar: { enabled: false }` in config).
