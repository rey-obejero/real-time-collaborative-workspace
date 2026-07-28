# Workspace Design

Design prototypes for the workspace page. Each variant shares identical Alpine data and modal flows; only the visual layer changes. Open any `.html` file in a browser to compare.

## Variants

### SAAS

- **Vibe:** Vercel/Linear restraint. Geist sans, near-monochrome, subtle borders, type-icon system (B&W, no color).
- **Accent:** Near-black `#0a0a0a` primary; differentiation by type-icon shape, not color
- **Default mode:** Light
- **Type:** Geist (display + body) + Geist Mono (IDs, code, numbers)
- **Signature:** `rounded-md` (6px), `text-sm` density, no shadows, multi-schema sidebar (Collection + Schemas), inline property fields, status as icon-pill
- **Use when:** Modern indie SaaS, ship-ready, low-friction, broad appeal
- **Avoid when:** You want character over tastefulness

### Editorial

- **Vibe:** Magazine-style. Serif display (Newsreader), mono labels, 1px hairlines, dark default.
- **Accent:** Warm amber `#e8a96b` (light: oxblood `#a14b2a`)
- **Default mode:** Dark
- **Type:** Newsreader (display) + DM Sans (body) + Geist Mono (chrome)
- **Signature:** Mono prefix labels (`№ 01`, `§ 01`, `→/← SENDER`), index numbers, dark editor, hairlines not cards
- **Use when:** Premium content product, calm reading focus, designed typography
- **Avoid when:** You want warm SaaS feel or family-familiar

### Glass

- **Vibe:** Frosted glass, cool cobalt accent, pill shapes, light default, floating panels
- **Accent:** Cobalt blue `#4a6cf7` (dark: `#7b95ff`)
- **Default mode:** Light
- **Type:** Geist sans only (no serif)
- **Signature:** `backdrop-blur`, 4-layer radial gradient mesh bg, inner highlight, soft tinted shadows, pill buttons, glowing status dot, gradient avatar
- **Use when:** Premium consumer, modern SaaS, Apple-y calm
- **Avoid when:** You want serious/technical feel

### Brutalism

- **Vibe:** Monospace only, 2px hard borders, zero radius, B&W, terminal/HUD
- **Accent:** None (pure B&W; `#ff003c` destructive)
- **Default mode:** Light
- **Type:** Geist Mono only
- **Signature:** `STATUS::00` terminal prefixes, `[01] GENERAL` section markers, blinking square indicator, hard offset shadow, all caps, full color inversion on active, padded numbers
- **Use when:** Developer-tool aesthetic, raw information density, hacker/cyberpunk
- **Avoid when:** You want warm, calm, or branded

## Potential Variants

### Bauhaus

- **Vibe:** Primary colors (red/blue/yellow), grid-locked, geometric, type-driven
- **Accent:** Red `#dc2626` + Blue `#2563eb` + Yellow `#eab308`
- **Type:** Geometric sans (Futura, Avenir, GT America)
- **Use when:** Confident, opinionated brand, design-system-driven
- **Risk:** Can feel "design school" if not grounded in product

### Newspaper

- **Vibe:** Heavy serif, multi-column, drop caps, real editorial print
- **Accent:** Black ink, off-white paper
- **Type:** Heavy serif display (Tiempos, GT Sectra, Domaine)
- **Use when:** Content-first PKM, the doc IS the product
- **Risk:** Multi-column breaks block-based editing; harder to make interactive

### Outline-First

- **Vibe:** Tana-like, outline as primary UI, content secondary
- **Accent:** TBD
- **Type:** Mono or geometric sans
- **Use when:** Hierarchical data, fast keyboard navigation, info-dense workflows
- **Risk:** Changes data model, not just visuals. Big lift.

### Paper / Notebook

- **Vibe:** Lined paper texture, handwriting font, post-it notes
- **Accent:** Marker yellow, ink black
- **Type:** Caveat or Patrick Hand
- **Use when:** Lo-fi, tactile, journaling
- **Risk:** Gimmicky for a "professional" PKM

## Token Convention

All variants use ShadCN-style CSS variables:

| Token                                       | Purpose         |
| ------------------------------------------- | --------------- |
| `--background`, `--foreground`              | Page bg + text  |
| `--card`, `--card-foreground`               | Surface         |
| `--popover`, `--popover-foreground`         | Floating        |
| `--primary`, `--primary-foreground`         | Accent          |
| `--muted`, `--muted-foreground`             | Secondary text  |
| `--accent`, `--accent-foreground`           | Hover state     |
| `--destructive`, `--destructive-foreground` | Danger          |
| `--border`, `--input`, `--ring`             | Borders + focus |
| `--radius`                                  | Base radius     |

## Creating a New Variant

1. Copy `page.html` as a starting point
2. Modify only the visual layer (CSS, class names, token values)
3. Keep all Alpine methods and modal structure identical
4. Use ShadCN variable names for tokens
5. Update this README with the new entry and where necessary

## Consistent Elements Across Variants

- Alpine data structure (`schemas`, `entries`, `discussions`, `members`)
- All Alpine methods (loadEntryToEditor, formatSelection, toggleConversations, etc.)
- Modal flows (settings with sections, search with results)
- Mock data (20 entries across 5 schemas: 5 pages, 5 tasks, 2 projects, 5 notes, 2 bookmarks; 1 discussion, 1 member)
- Slash command menu (H1, H2, list, quote)
- Floating selection toolbar (B, I, S, code, link)
- Keyboard shortcuts (`⌘K` for search, `Escape` to close)
- Schemas/Entries data model
