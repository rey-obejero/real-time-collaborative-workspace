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

**Pattern — inline dual-element (no Astro wrapper component):**

```astro
<iconify-icon
  x-show="tweaks.iconSet !== 'custom'"
  :icon="getIconName('search')"
  class="w-3.5 h-3.5 inline-flex items-center">
</iconify-icon>
<span
  x-show="tweaks.iconSet === 'custom'"
  x-html="getCustomIconSvg('search')"
  class="inline-flex items-center justify-center w-3.5 h-3.5">
</span>
```

Do not wrap in Astro component — dimension collapse, breaks `currentColor`.

Icons toggleable: Custom → Feather → Heroicons → Phosphor → HugeIcons. Mappings in `workspace.js`.

## Rules

1. **`pnpm`, never `npm`.**
2. **Packages over CDNs.** No `<script src>` for packages available via pnpm.
3. **No Astro icon wrapper.** Inline `iconify-icon` + custom SVG `<span>` directly.
4. **No hardcoded colors.** CSS variables or Tailwind semantic tokens.
5. **No shadows, no gradients, no hover transforms.**
6. **Font sizes from token scale:** 30 / 24 / 20 / 16 / 14 / 12px.
7. **Astro dev toolbar disabled** (`devToolbar: { enabled: false }` in config).
