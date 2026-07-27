# Workspace Design Variants

Visual exploration for the PKM workspace page. Each variant shares identical Alpine data and modal flows — only the visual layer changes. Open any `.html` file in a browser to compare.

## Built (3)

### editorial
- **Vibe:** Magazine-style. Serif display (Newsreader), mono labels, 1px hairlines, dark default.
- **Accent:** Warm amber `#e8a96b` (light: oxblood `#a14b2a`)
- **Default mode:** Dark
- **Type:** Newsreader (display) + DM Sans (body) + Geist Mono (chrome)
- **Signature:** Mono prefix labels (`№ 01`, `§ 01`, `→/← SENDER`), index numbers, dark editor, hairlines not cards
- **Use when:** Premium content product, calm reading focus, designed typography
- **Avoid when:** You want warm SaaS feel or family-familiar

### glass
- **Vibe:** Frosted glass, cool cobalt accent, pill shapes, light default, floating panels
- **Accent:** Cobalt blue `#4a6cf7` (dark: `#7b95ff`)
- **Default mode:** Light
- **Type:** Geist sans only (no serif)
- **Signature:** `backdrop-blur`, 4-layer radial gradient mesh bg, inner highlight, soft tinted shadows, pill buttons, glowing status dot, gradient avatar
- **Use when:** Premium consumer, modern SaaS, Apple-y calm
- **Avoid when:** You want serious/technical feel

### brutal
- **Vibe:** Monospace only, 2px hard borders, zero radius, B&W, terminal/HUD
- **Accent:** None (pure B&W; `#ff003c` destructive)
- **Default mode:** Light
- **Type:** Geist Mono only
- **Signature:** `STATUS::00` terminal prefixes, `[01] GENERAL` section markers, blinking square indicator, hard offset shadow, all caps, full color inversion on active, padded numbers
- **Use when:** Developer-tool aesthetic, raw information density, hacker/cyberpunk
- **Avoid when:** You want warm, calm, or branded

## In Progress (1)

### saas
- **Vibe:** Vercel/Linear restraint. Geist sans, near-monochrome, subtle borders, type-icon system (B&W, no color).
- **Accent:** Near-black `#0a0a0a` primary; differentiation by type-icon shape, not color
- **Default mode:** Light
- **Type:** Geist (display + body) + Geist Mono (IDs, code, numbers)
- **Signature:** `rounded-md` (6px), `text-sm` density, no shadows, multi-schema sidebar (Collection + Schemas), inline property fields, status as icon-pill
- **Use when:** Modern indie SaaS, ship-ready, low-friction, broad appeal
- **Avoid when:** You want character over tastefulness

## Proposed (Not Yet Built)

### bauhaus
- **Vibe:** Primary colors (red/blue/yellow), grid-locked, geometric, type-driven
- **Accent:** Red `#dc2626` + Blue `#2563eb` + Yellow `#eab308`
- **Type:** Geometric sans (Futura, Avenir, GT America)
- **Use when:** Confident, opinionated brand, design-system-driven
- **Risk:** Can feel "design school" if not grounded in product

### newspaper
- **Vibe:** Heavy serif, multi-column, drop caps, real editorial print
- **Accent:** Black ink, off-white paper
- **Type:** Heavy serif display (Tiempos, GT Sectra, Domaine)
- **Use when:** Content-first PKM, the doc IS the product
- **Risk:** Multi-column breaks block-based editing; harder to make interactive

### outline-first
- **Vibe:** Tana-like, outline as primary UI, content secondary
- **Accent:** TBD
- **Type:** Mono or geometric sans
- **Use when:** Hierarchical data, fast keyboard navigation, info-dense workflows
- **Risk:** Changes data model, not just visuals. Big lift.

### paper / notebook
- **Vibe:** Lined paper texture, handwriting font, post-it notes
- **Accent:** Marker yellow, ink black
- **Type:** Caveat or Patrick Hand
- **Use when:** Lo-fi, tactile, journaling
- **Risk:** Gimmicky for a "professional" PKM

## Comparison Matrix

| Variant | Type | Accent | Default | Density | Chrome | Distinctive | Risk |
|---|---|---|---|---|---|---|---|
| editorial | Serif+Sans+Mono | Amber | Dark | Low | Full | Yes | Magazine-y |
| glass | Sans | Cobalt | Light | Med | Floating | Yes | Trendy |
| brutal | Mono | None | Light | High | Full, terminal | Yes | Polarizing |
| **saas** (in progress) | Sans | Near-black | Light | High | Minimal | **No (safe)** | Generic |
| bauhaus | Sans | Multi | Light | Med | Grid-driven | Yes | Design school |
| newspaper | Serif | None | Light | High | Print-like | Yes | Multi-col breaks |
| outline-first | Sans | TBD | Light | High | Sidebar | Yes | Data model change |

## Schemas / Entries System (Hard Invariant)

The app is modeled on **AnyType's object system** — not on PARA, GTD, or other traditional IA frameworks. This is a hard rule for any new variant or future code.

**Core model:**
- **Schemas** (object types) — `Page`, `Task`, `Project`, `Note`, `Bookmark`, `Set`. Each defines a category of object with its own icon, color, and property set.
- **Entries** (objects) — instances of a schema. A `Page` is a long-form document; a `Task` is an action item with status, priority, due, assignee. The schema determines the shape.
- **Sets** — filtered views of entries across schemas (e.g., "All", "Recent", "Drafts", "In Progress"). A Set is not a category; it's a query.
- **Relations** — typed links between objects (e.g., a `Project` has many `Task`s via a `tasks` relation). Not yet implemented in mock data but should be kept in mind.

**What this means for design:**
- The sidebar shows **Schemas** (types) and **Sets** (queries), not category folders.
- The editor shows the entry's schema icon + type-specific properties, not a generic property list.
- Status / priority / date are **typed fields on the schema**, not freeform labels.
- Tags are a **multi-select relation** on every schema.

**Older variants (editorial, glass, brutal) use a simpler Page/Bin model** built before this rule was clarified. They are kept as reference; future variants must use the Schemas/Entries model.

## Our Twist on saas

Linear/Vercel is the safest direction. We can't ship "just Linear." Here's what makes our version ours:

1. **Multi-schema sidebar** — Collection (All, Recent, Drafts, In Progress) at the top; Schemas (Page, Task, Project, Note, Bookmark) below with type icons and live counts.
2. **Type-icon system (B&W)** — Each schema has a distinct lucide icon shape (Page=file, Task=check-square, Project=target, Note=sticky-note, Bookmark=bookmark). Differentiation by shape, not color.
3. **Type-aware editor** — The editor header shows the schema icon + name. Properties shown are the schema's properties (e.g., Task shows status/priority/due/assignee; Page shows status/tags).
4. **Schemas tab in settings** — Settings has a "Schemas" tab where you can see all object types and their property definitions. Linear doesn't do this; we do.
5. **No multi-view grid icons** — Linear has list/board/calendar buttons. We keep list-only for now, with a single "All properties" toggle.
6. **"Ask AI" pill in top bar** — placed where Linear puts its command-K hint, but as a real action. Future: contextual to the entry.
7. **Multi-workspace switcher** — PKM is multi-workspace. The workspace pill is more prominent than Linear's org switcher.
8. **Status as property, not folder** — `status: draft` is a field on the object, not a category. The "Drafts" Collection is just a query filtering by that field.
9. **Inline property fields, not right rail** — Properties live below the title in a horizontal strip, expandable. Notion-style.
10. **Workspace = Space** — anytype.io terminology. One workspace per "life context" (Personal, Work, Side Project).

## Token Convention

All variants use shadcn-style CSS variables:

| Token | Purpose |
|---|---|
| `--background`, `--foreground` | Page bg + text |
| `--card`, `--card-foreground` | Surface |
| `--popover`, `--popover-foreground` | Floating |
| `--primary`, `--primary-foreground` | Accent |
| `--muted`, `--muted-foreground` | Secondary text |
| `--accent`, `--accent-foreground` | Hover state |
| `--destructive`, `--destructive-foreground` | Danger |
| `--border`, `--input`, `--ring` | Borders + focus |
| `--radius` | Base radius |

saas adds:
- `--type-{page,task,project,note,bookmark}` — currently B&W (single neutral value); reserved for future per-type accents
- `--status-{todo,doing,done,blocked}` — currently B&W (single neutral value); reserved for future status color logic

## Adding a New Direction

1. Copy `saas.html` as a starting point (most complete: Schemas/Entries + modal flows)
2. Modify only the visual layer (CSS, class names, token values)
3. Keep all Alpine methods and modal structure identical
4. Use shadcn variable names for tokens
5. **Do not opt for PARA as top-level IA** — use Schemas + Sets
6. Update this README with the new entry

## What Doesn't Change Across Variants

- Alpine data structure (`schemas`, `entries`, `discussions`, `members`)
- All Alpine methods (loadEntryToEditor, formatSelection, toggleConversations, etc.)
- Modal flows (settings with sections, search with results)
- Mock data (20 entries across 5 schemas: 5 pages, 5 tasks, 2 projects, 5 notes, 2 bookmarks; 1 discussion, 1 member)
- Slash command menu (H1, H2, list, quote)
- Floating selection toolbar (B, I, S, code, link)
- Keyboard shortcuts (`⌘K` for search, `Escape` to close)
- Schemas/Entries data model
