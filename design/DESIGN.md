# Design

> Records the incumbent visual world of the active "saas" variant. Reference: `design/workspace/page.html`. All measurements and tokens are read from the prototype, not invented.

> **Drift (2026-07-28):** The product started as a single-user PKMS ("second brain"). It is drifting toward a capable multi-user workspace (Notion / AnyType parity). Future iterations will carry workspace membership, roles, and shared editing. The chrome below is the foundation; many multi-user surfaces are deferred, not absent. The visual language does not need to change to support this — B&W, type-icon identity, and member initials all scale solo → shared without re-theming.

## Direction

**"saas"** — Vercel / Linear / shadcn restraint. B&W only. Type-icon system. Geist (sans + body) + Geist Mono (IDs, code, numbers).

The "saas" name describes the aesthetic, not a SaaS product. The product itself is heading toward SaaS-style multi-user workspaces — Notion / AnyType parity. The chrome supports both solo and shared use today; multi-user behavior is wired in incrementally.

Other variants live in `design/workspace/variants/` for reference only — they are not the design system. They are alternative directions to learn from, not a library to mix from.

| Variant       | Mood                                                                  | Status   |
| ------------- | --------------------------------------------------------------------- | -------- |
| saas (active) | B&W, type-icon, 6px radius, "Vercel/Linear" restraint                 | ACTIVE   |
| editorial     | Dark default, Newsreader serif, amber accent, mono labels (`№ 01`)   | reference |
| glass         | Light default, cobalt accent, frosted glass surfaces, pill shapes    | reference |
| brutalism     | Pure B&W, Geist Mono only, hard 2px borders, terminal prefixes        | reference |

Proposed but not built: **bauhaus**, **newspaper**, **outline-first**, **paper**.

## Color

**Hard rule:** B&W only. Differentiation by glyph + label, not color. CSS variables `--type-*` and `--status-*` are pre-wired for color but resolve to greys today.

### Tokens (light, default)

| Token                  | Value     | Role                                |
| ---------------------- | --------- | ----------------------------------- |
| `--background`         | `#fafafa` | App background                      |
| `--foreground`         | `#0a0a0a` | Body text, primary actions          |
| `--card`               | `#ffffff` | Sidebar, list container, surfaces   |
| `--card-foreground`    | `#0a0a0a` | Text on card                        |
| `--popover`            | `#ffffff` | Menus, modals, dropdowns            |
| `--popover-foreground` | `#0a0a0a` | Text in popovers                    |
| `--primary`            | `#0a0a0a` | Filled buttons, active state        |
| `--primary-foreground` | `#fafafa` | Text on primary                     |
| `--secondary`          | `#f5f5f5` | Subtle surface, header rows         |
| `--secondary-foreground` | `#0a0a0a` | Text on secondary                 |
| `--muted`              | `#f5f5f5` | Muted surfaces                      |
| `--muted-foreground`   | `#737373` | Metadata, captions, breadcrumb root |
| `--accent`             | `#f5f5f5` | Hover, active row                   |
| `--accent-foreground`  | `#0a0a0a` | Text on accent                      |
| `--destructive`        | `#dc2626` | Destructive actions (the only hue)  |
| `--destructive-foreground` | `#fafafa` | Text on destructive              |
| `--border`             | `#e5e5e5` | Hairlines, dividers                 |
| `--input`              | `#ffffff` | Input background                    |
| `--ring`               | `#0a0a0a` | Focus ring                          |
| `--radius`             | `0.375rem` (6px) | Default corner radius       |

### Type colors (B&W, reserved)

`--type-page`, `--type-task`, `--type-project`, `--type-note`, `--type-bookmark`, `--type-set` — all `#737373`. Pre-wired for future color. Do not change in this variant.

### Status colors (4-step grayscale)

`--status-todo: #d4d4d4`, `--status-doing: #404040`, `--status-done: #0a0a0a`, `--status-blocked: #a3a3d4`. Plus draft/active/paused/planning/published variants — all greys. The status dot is 6px.

### Dark mode

| Token             | Light → Dark |
| ----------------- | ------------ |
| `--background`    | `#fafafa` → `#0a0a0a` |
| `--foreground`    | `#0a0a0a` → `#fafafa` |
| `--card`          | `#ffffff` → `#171717` |
| `--popover`       | `#ffffff` → `#171717` |
| `--primary`       | `#0a0a0a` → `#fafafa` |
| `--secondary`     | `#f5f5f5` → `#262626` |
| `--muted-foreground` | `#737373` → `#a3a3a3` |
| `--accent`        | `#f5f5f5` → `#262626` |
| `--border`        | `#e5e5e5` → `#262626` |
| `--destructive`   | `#dc2626` → `#ef4444` |

The `--type-*` and `--status-*` variables do not have explicit dark overrides — they retain their light values. Since they are all greys, the contrast inverts naturally against the dark surface.

### The one gradient

`linear-gradient(90deg, var(--foreground) 0%, #71717a 100%)` applied to the workspace-name text in the sidebar header. Greyscale only. The single non-flat color treatment in the design.

## Typography

| Family        | Role                                       |
| ------------- | ------------------------------------------ |
| `Geist`       | UI sans, body, titles                      |
| `Geist Mono`  | IDs, dates, code, numeric counters, ⌘K hint |

- **Body** `text-[12px]`, chrome `text-[10px]`, page title `text-[24px]`, entry title `text-[32px]`.
- `letter-spacing: -0.011em` on body.
- `font-feature-settings: "ss01", "cv11"` — Geist stylistic alternates.
- Mono usage is the visual signature. Where you see numbers or identifiers, they are monospace. The breadcrumb is sans. The status counter `0` next to each schema in the sidebar is mono with `tabular-nums`.

## Layout

3-column desktop. No responsive collapse. No mobile layout in prototype.

```
┌──────────────┬─────────────────────────────┬──────────────┐
│  Sidebar     │  Header (breadcrumb + tools) │  Discussions │
│  w-80        │  ┌──────────────────────┐   │  w-80        │
│  Collection  │  │  List / Editor view   │   │  (toggled)   │
│  Schemas     │  │                      │   │              │
│  Archive     │  │                      │   │              │
│              │  └──────────────────────┘   │              │
└──────────────┴─────────────────────────────┴──────────────┘
```

- **Sidebar** (`w-80`, ~320px): **workspace switcher** (top — multiple workspaces per user, e.g. "Personal Space" and "Engineering Wiki" in the seed) / Quick Action `⌘K` / + New / **Collection** (All, Recent, Drafts, In Progress) / **Schemas** (Page, Task, Project, Note, Bookmark) / **Archive** (Trash) / current user profile. The workspace switcher is the multi-tenant entry point. The active workspace is the scope of the entire main pane.
- **Main** (`flex-1`): header (breadcrumb + count + Ask AI + theme + discussions toggle) + list/editor view.
- **Discussions** (`w-80`, ~320px, toggled): per-entry thread.
- **Header** height: `h-14` (56px). **Sub-header** (editor view): `h-12` (48px).

## Density and spacing

- **List rows:** `py-2.5` (10px), `px-3` (12px). Generous touch target, tight vertically.
- **Sidebar nav rows:** `px-2 py-2.5`. Match the list.
- **Property chips in editor:** `gap-2` (8px), inline-flex with `border border-border rounded-md`.
- **Tag pills:** `tag-pill` utility class — small mono caps with hash prefix (`#design`).
- **Default radius:** `0.375rem` (6px). `rounded-md` everywhere. Pills, modals, buttons, inputs, status dots.
- **Borders:** 1px `--border`. No thicker strokes except the schema-row active state (`box-shadow: inset 2px 0 0 0 var(--foreground)`) — a 2px left rail.

## Components

| Component         | Pattern                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| **Primary button** | `bg-primary text-primary-foreground` + scale-1.005 + soft shadow on hover |
| **Ghost button**  | `border border-border bg-card` → `bg-accent` on hover                    |
| **Focus ring**    | 3px `--accent` glow via `focus-ring` utility                             |
| **Status dot**    | 6px circle, `background: var(--status-*)`                                |
| **Schema icon**   | Inline SVG, `1.75` stroke, `currentColor`, 14–16px                       |
| **Avatar**        | Rounded square. **Workspace avatar** uses dicebear initials API (`https://api.dicebear.com/7.x/initials/svg?seed=Personal%20Space` → "PS"). **Member avatars** (current user at the bottom of the sidebar, Assignee / Owner chips in the editor) currently render as 2-letter initials on a `bg-secondary` circle; will resolve to dicebear or uploaded photos once the member system lands. Sizes: 16 (inline), 24 (chip), 32 (profile). |
| **Tag pill**      | Hash-prefixed, small, mono                                              |
| **Property chip** | Label + value inline, label is `text-muted-foreground`, value is `text-foreground` |
| **Active nav row** | `bg-accent` + foreground text; schema rows get an inset 2px left rail in foreground |
| **Empty state**   | Centered in list container, two-line copy                                |
| **Modals**        | `bg-popover border border-border rounded-md`                             |

## Iconography

Lucide-style 1.75-stroke SVGs, `currentColor`, rounded line caps and joins. Schema icons render at 14px in the sidebar and 16px in the list.

- **Page** → file document outline
- **Task** → check-in-circle
- **Project** → folder (with handles, like a project folder)
- **Note** → sticky-note
- **Bookmark** → bookmark glyph (post-polish; previously was incorrectly a link/chain)

Library icons (lucide): `inbox`, `clock`, `pencil`, `bolt`, `trash`, `settings`, `cog`, `moon`, `sun`, `search`, `plus`, `chevron-down`, `arrow-up-down`, `filter`, `arrow-left`, `message-square`.

## Motion

- Default transitions: `background-color 0.12s ease, color 0.1s ease, border-color 0.12s ease, transform 0.1s ease` applied via `*` selector. Snappy, not slow.
- **Primary button hover:** `transform: scale(1.005)` + soft `0 1px 2px / 0 4px 12px` shadow stack.
- **Popovers / dropdowns:** Alpine `x-transition` (default fade).
- **Sidebar row / list row hover:** `background: var(--accent)` instant-feel.
- **Reduced motion:** `prefers-reduced-motion: reduce` collapses all transitions to `0.01ms`.

## Voice and tone (incidental)

- **Short, technical, lowercase chrome labels.** "Quick Action", "Drafts", "In Progress", "Trash", "Settings", "Ask AI".
- **Schema names are title-case.** "Page", "Task", "Project", "Note", "Bookmark".
- **Status values are lowercase.** "todo", "doing", "done", "draft", "active", "paused", "blocked" — rendered via CSS `capitalize` at display time.
- **No marketing copy in the chrome.** Empty state for the list is "No entries. This set is currently empty." Two lines, factual.
- **Settings labels** are full words: "Workspace name", "Workspace ID", "Default visibility". No cute shorthand.

## What's intentional vs what's a placeholder

**Intentional and shipped:**
- 3-column desktop layout, no responsive collapse.
- 5 schemas with hard-coded icon set.
- B&W palette with `--type-*` and `--status-*` variables pre-wired for color.
- Mono for numerics, sans for prose.
- Single grayscale gradient on workspace name.
- Workspace switcher with multiple workspaces (multi-tenant entry point, working today).

**Multi-user trajectory (deferred, not stubs):**
- **Members settings tab** — empty today, but a planned surface. Members, roles (owner / admin / member / guest), and invites will live here.
- **Assignee / Owner property chips** in the editor — render initials today; these are the hooks for the member identity system. The data model (member records, role assignment, presence) is the blocker, not the chrome.
- **Default visibility** setting (General tab) — toggle today. Will gate per-entry sharing once the visibility model lands.
- **Workspace switcher dropdown** — already lists multiple workspaces; member roster per workspace is the next step.
- **Discussions panel** — per-entry thread today; will gain `@mentions` and reaction surfaces when the member system lands.

**Visible placeholders (no behavior yet):**
- "New Schema" button — disabled with `soon` label.
- "Sort" / "Filter" list-header buttons — no behavior wired.
- "Trash" sidebar item — no click handler.
- "Export" / "Import" settings — no behavior.
- "Ask AI" pill — no behavior.

When implementing, ship chrome and behavior together. Don't ship a button that does nothing.
