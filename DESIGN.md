---
name: Workspace
description: A quiet, muted, tame PKM workspace on warm-stone neutrals.
colors:
  background: "oklch(0.965 0.004 85)"
  warm-paper: "#f4f4f1"
  sidebar: "oklch(0.955 0.005 85)"
  sidebar-accent: "#e5e3df"
  ink: "#1c1917"
  ink-soft: "#fafaf9"
  soft-stone: "#eae9e6"
  muted-clay: "#6d675f"
  hairline: "#e0dfdb"
  hairline-strong: "#cfceca"
  input-surface: "#eae9e6"
  hover-stone: "#e2e1de"
  panel-dark: "#292524"
  border-dark: "#44403c"
  destructive: "#ff5f56"
  focus-ring: "rgba(59, 130, 246, 0.5)"
  unread-dot: "#57534e"
  table-entry: "#525252"
typography:
  display:
    fontFamily: "Nunito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  control: "7px"
  menu: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
  button-primary-hover:
    backgroundColor: "#292524"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
  button-ghost:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  button-ghost-hover:
    backgroundColor: "{colors.hover-stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  control-icon:
    backgroundColor: "transparent"
    textColor: "{colors.muted-clay}"
    rounded: "{rounded.control}"
    height: "28px"
    width: "28px"
  input-field:
    backgroundColor: "{colors.input-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  chip:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  nav-row:
    backgroundColor: "transparent"
    textColor: "{colors.muted-clay}"
    rounded: "{rounded.control}"
  nav-row-active:
    backgroundColor: "{colors.sidebar-accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  card:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: Workspace

## Overview

**Creative North Star: "The Quiet Workbench"**

Workspace is a second brain — a calm warm-stone workbench where the tools sit
quiet until you reach for them. The system is built on monochrome warmth:
paper-warm canvas (`--background: oklch(0.965 0.004 85)`), stone-gray neutrals,
and pure ink (`#1c1917`) used sparingly. Nothing shouts; the interface recedes
so the work — writing, organizing, thinking — is the loudest thing on screen.

The aesthetic is deliberately tame and muted. This is a rejection of the
product's earlier high-contrast, visually assertive chrome and of the corporate
"AI slop" look: no gradients, no saturated accent colors, no glowing buttons.
Surfaces are flat; structure comes from 1px hairlines and tonal layering;
every interactive element is a small rounded control that wakes only on
interaction.

Controls are refined and restrained. Labeled actions use soft pill geometry
(`border-radius: 9999px`); compact controls and rows use 7px corners; containers
use 12px. Hover fills are one quiet step of stone (`--hover: #e2e1de`); the
primary action on a cluster is the single ink pill, and the rest of the cluster
stays ghosted until it earns attention. The sidebar carries its own one-step
lighter surface (`--sidebar`) so the chrome reads as a distinct plane from the
main canvas.

**Key Characteristics:**
- Warm-stone monochrome neutrals; pure ink for primary actions, never bright hues.
- Flat surfaces; structure from 1px hairlines and tonal layering, never hard shadows.
- Pill geometry for labeled actions; 7px for compact controls and rows; 12px for cards; 4px for menu rows.
- Geist for body, Nunito for display headings, Geist Mono for code and keyboard hints.
- Quiet chrome: muted-clay secondary text, hairline borders, restrained hover fills.
- Two overlapping modal planes (settings `z-40`, nested add-member `z-50`) that share the same card language.
- Dark mode inverts the same token system without changing the geometry.

## Colors

The palette is monochrome warmth — a warm stone family with a single ink accent
and a reserved red for destructive actions. There is no chromatic accent color;
differentiation comes from tonal steps, not hue.

### Primary
- **Ink** (#1c1917): Foreground text and the one strong surface. The primary
  button, active emphasis, and status "done/published" markers use ink. In dark
  mode ink becomes the background and `ink-soft` the foreground. Ink is scarce —
  it marks the primary action per cluster, nothing else.

### Neutral
- **Background** (oklch 0.965 0.004 85): The main canvas behind the sidebar.
  Dark: `oklch(0.220 0.006 60)`. Warmed toward stone, never pure white.
- **Warm Paper** (#f4f4f1): Card, popover, and modal surfaces in light mode
  (dark: `#1c1917` for card, `#292524` for popover).
- **Sidebar** (oklch 0.955 0.005 85): A one-step lighter plane for the sidebar
  and the settings modal's nav column. Dark: `oklch(0.205 0.006 60)`.
- **Sidebar Accent** (#e5e3df): The active state fill on sidebar rows, one step
  deeper than `--sidebar`. Dark: `#2f2d2a`.
- **Soft Stone** (#eae9e6): Muted fills — secondary surfaces, the search/create
  slab, property value emphasis. Dark: `#292524`.
- **Hover Stone** (#e2e1de): The one-step hover fill for every quiet control
  (ghost buttons, nav rows, icon buttons, chips, menu rows). Dark: `#292524`.
- **Muted Clay** (#6d675f): Secondary text — metadata, placeholders, section
  headings. Dark: `rgba(250, 250, 249, 0.65)`.
- **Hairline** (#e0dfdb): 1px borders and dividers. **Hairline Strong**
  (#cfceca) for emphasized edges (bordered chips).
- **Input Surface** (#eae9e6): The field background for inputs and search fields
  (dark: `#1c1917`), visually one with soft-stone.
- **Table Entry** (#525252): Entry row text in the list view (dark: `#d6d3d1`),
  quieter than full ink.
- **Unread Dot** (#57534e): The conversation unread indicator (dark: `#a8a29e`).
- **Destructive** (#ff5f56): Reserved for delete/revoke actions only.

### Named Rules
**The Workbench Rule.** Ink appears once per viewport cluster. The single ink
pill is the primary action; everything else on the workbench is hairline and
muted until interacted with. The restraint is the design.

**The Hairline Rule.** Structure is drawn with 1px `var(--border)` hairlines and
tonal fills. If a section needs separation, reach for a hairline first and a
fill second.

## Typography

**Display Font:** Nunito (with ui-sans-serif, system-ui fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace fallback)

**Character:** A rounded geometric display paired with a clean, neutral sans body
— friendly but not childish, precise but not stiff. Geist keeps long-form reading
calm; Nunito gives the rare heading a soft, approachable curve. Geist Mono marks
system identities: invite links, keyboard hints, and code.

### Hierarchy
- **Display** (Nunito 500, 20px, 1.2): Surface titles — the list view heading
  ("All"), the modal heading. The only face that carries Nunito.
- **Body** (Geist 400, 16px, 1.5): Default text, prose, entry content
  (`.prose-readable`).
- **Title / Row Label** (Geist 400, 14px): Row and list labels (`.wv-row-label`,
  `.nav-row` items, header actions, entry titles).
- **Label** (Geist 500, 12px): Field labels (`.wv-field-label`), buttons, chips,
  property labels, keyboard hints.
- **Meta** (Geist 400, 12px): Secondary metadata — emails, timestamps, counts
  (`.wv-row-meta`).
- **Micro** (Geist 500, 11px): Badges and status labels.

### Named Rules
**The Type Ratio Rule.** Display (20px Nunito) → section head (16px 500 muted,
`.wv-sec-h`) → row label (14px 400) → metadata (12px muted). Each step down both
shrinks and mutes; never let a section heading read smaller or weaker than the
row labels it leads.

## Layout

A single full-height workspace frame: a fixed sidebar and a main column that
holds the header bar and the content surface, with overlays (floating toolbar,
slash menu, modals) stacked above.

- **Frame:** `h-full w-full flex` — sidebar + `<main class="flex-1 flex flex-col">`.
- **Sidebar:** `w-80` (320px), `border-r`, `bg-sidebar`. Holds the library
  pill, the search/create slab, grouped nav rows, and the user footer row.
- **Header bar:** 56px tall (`h-14`), `px-6`, `grid grid-cols-[1fr_auto_1fr]`,
  hairline bottom border. Left: back/forward/recent. Center: breadcrumb.
  Right: theme toggle, Ask AI, Share.
- **Content column:** List view is a bordered card at `w-[85%] mx-auto px-8 py-8`;
  the editor surface sits full-width below the list.
- **Spacing rhythm:** a 4/8/12/24px scale — `gap-1`(4px) inside icon clusters,
  `gap-2`(8px) between related controls, `px-3`(12px) button padding, `28px`
  modal canvas padding (`.wv-scroll`), `24px` section margins.
- **Density:** comfortable. Rows pad `8px` vertically, controls are 28px tall,
  small buttons `h-7` (28px) with `px-2` (8px). No cramped 6px-vertical rows.
- **Responsive:** no breakpoint system is implemented; the workspace is
  desktop-first. Long fields shrink (`min-width: 0`, ellipsis) before wrapping.

## Elevation & Depth

Flat at rest, with soft shadow reserved for the overlay plane only. Content
surfaces never cast shadows — a card is warm-paper on warm-paper, separated by a
hairline border; hover is one stone step darker. The three floating layers
(modals, dropdown menus, tooltips) are the single exception: each carries a
diffuse shadow to separate it from the flat workbench.

**Shadow vocabulary** (`.modal-pop`, `.floating-pop`, `.header-tooltip`):
- **Modal shadow** (`0 8px 40px rgb(0 0 0 / 0.12)`, dark `0.5`): the settings
  modal and nested add-member modal cards.
- **Menu shadow** (`0 2px 8px rgb(0 0 0 / 0.06)`, dark `0.4`): dropdown menus,
  the floating format toolbar, tooltips.

The only other `box-shadow` in the codebase is the accessibility focus ring — a
3px blue ring (`0 0 0 3px rgba(59, 130, 246, 0.5)`, `--ring`) on focused
controls and menu items. Focus rings are an accessibility affordance, not an
elevation mechanism; they are the sole chromatic element permitted.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest; only the floating
overlay plane (modals, menus, tooltips) casts a shadow. Do not add shadows to
cards, rows, or buttons — reach for a hairline border or a tonal fill instead.
Do not reintroduce elevation as a decorative layer.

## Shapes

The form language is gentle circles and soft rectangles on a flat plane.

- **Pills** (`9999px`): every interactive control that carries a label — buttons,
  chips, badges, the circular avatar and close.
- **Controls** (7px, `--radius-control`): compact square-ish controls and rows —
  nav rows, header icon buttons, small buttons, inputs, the settings modal's
  primary and outline buttons, the "New" cluster.
- **Menus** (4px): rows inside dropdown menus (`.floating-pop` items, role
  dropdown items).
- **Cards** (12px, `--radius`): the entry table card, modal cards.
- **Inner slabs** (8px, `--radius-md`): tooltips, the search/create cluster
  (`.vp2-shell`), dropdown panels.
- **Borders:** 1px hairlines only. No double borders, no embossed edges.
- **Avatars:** circular (`border-radius: 9999px`), 20px in rows and menus.

### Named Rules
**The Pill Rule.** If it's interactive, it's a pill or a 7px control — never a
sharp square, never a playful squircle. Radius choice signals affordance: pills
for labeled actions, 7px for quiet square controls, 12px for containers, 4px
inside menus.

## Components

### Buttons
- **Shape:** labeled actions are pills (`9999px`); compact controls are 7px.
  Small buttons are `h-7 px-2`, `text-[12px]`–`text-[14px]`, medium `px-3 py-1.5`.
- **Primary** (`.primary-btn`): ink pill, `ink-soft` text. Hover: `#292524`
  (dark: `#e7e5e4`). Reserved for the one action per cluster. In the settings
  modal it pairs with `.wv-btn` to read as a 7px control instead of a pill.
- **Ghost** (`.ghost-btn`): warm-paper pill, ink text. Hover: hover-stone fill.
- **Outline** (header Share, settings Copy link / QR code / Manage link):
  transparent, 1px hairline border, ink text, hover-stone fill on hover, 7px
  corners.
- **Text** (`.ask-ai-text`): transparent, ink/muted text, hover-stone fill on
  hover, icons at 2px stroke.
- **Icon** (`.header-btn`): 28×28, 7px radius, muted-clay icon; hover-stone fill
  and ink icon on hover. Never bare squares.

### Chips / Badges
- **Property chip** (`.property-chip`): 12px pill, warm-paper fill, muted-clay
  label + ink value, 4px inner gap. Bordered variant swaps fill for a
  hairline-strong border.
- **Type pill** (`.type-pill`): 12px 500 pill distinguishing entry types.
- **Tag pill** (list rows): `#tag` in a soft-stone pill, `table-entry` text.
- **Status dot + label** (list rows): an 8px status-colored dot (per-status
  tokens like `--status-done`) beside a capitalized 12px label.
- **Role badge** (`.wv-role-badge`): 11px 500 pill, hairline border; the owner
  role inverts to ink fill with warm-paper text.
- **Avatar chip** (`.avatar-chip`): 18px circle, 10px 600 initials, soft-stone
  fill. Larger avatars in the sidebar and member rows are 20px.

### Inputs / Fields
- **Style:** 12px text, 7px radius, `--input` background (input-surface / dark
  `#1c1917`), hairline border. Widths: 240px standard, 200px settings rows.
- **Focus:** 3px blue ring (`--ring`) via `.focus-ring`; text controls drop
  their default outline in favor of the ring.

### Navigation
- **Sidebar rows** (`.nav-row`): 7px radius, muted-clay text; hover fills
  hover-stone and darkens to ink; the active row fills sidebar-accent with ink
  text. Section labels (Overview, Schemas, Collections) are 12px 500 muted.
- **Header controls:** 28px icon buttons with hover tooltips (12px, 8px radius,
  hairline border, warm-paper fill, `0 2px 8px` shadow) and keyboard hints in
  Geist Mono.
- **The search/create slab** (`.vp2-shell`): a soft-stone tonal slab containing
  Search (with `Ctrl K` hint) and Create rows; each row is a 14px item with a
  4px-radius hover fill and a chevron for the Create menu.
- **Tabs:** `.field-tab` — ink underline on active; `.section-tab` — soft-stone
  fill on active.

### Cards / Containers
- **Corner Style:** 12px (entry table `rounded-t-lg`, modal `rounded-lg`).
- **Background:** warm-paper (`--card`); modal card uses `bg-background`.
- **Border:** 1px hairline (`var(--border)`).
- **Shadow Strategy:** flat at rest; only the modal card casts the modal shadow.
- **Internal Padding:** 28px modal canvas, `px-8 py-8` list, 12px inner panels.

### Signature Component: The Settings Modal
A `max-w-2xl` card, `rounded-lg`, hairline border, `bg-background`, modal shadow,
stacked at `z-40` behind a `bg-black/20 backdrop-blur-[3px]` backdrop. Two
columns: a 200px nav (`bg-sidebar`, hairline right border) on the left, and a
28px-padded content canvas on the right.

The nav groups rows under muted 12px 500 labels — **Account** (Personal,
Preferences) and **Workspace** (General, Members, Schemas, Properties) — using
the same `nav-row` active/hover language as the sidebar. Each section opens a
`wv-sec-h` heading (16px 500 muted) over native-style rows.

The **Members** section is the richest: a description line, a primary **Add
members** button, a muted "Other options" sub-label over three outline buttons
(Copy link, QR code, Manage link), an "All N" count, and member rows
(`.wv-member-row`, hairline dividers between) pairing a 20px avatar + 14px name
with a role dropdown — a compact trigger that opens a `floating-pop` menu with
Owner / Editor / Member items.

**Add members** opens a nested modal at `z-50` (above settings): a `max-w-sm`
card sharing the same language — 20px title, 13px muted description, an
`bg-input` field with a placeholder, and a primary Add member / outline Cancel
button pair. It reuses the same backdrop and modal-pop shadow so the stack reads
as two quiet planes.

## Do's and Don'ts

### Do:
- **Do** keep chrome quiet: warm-paper surfaces, hairline borders, muted-clay
  secondary text, ink reserved for primary actions.
- **Do** draw structure with 1px hairlines (`var(--border)`) and tonal fills.
- **Do** use pill geometry for labeled actions, 7px for compact controls, 4px
  inside menus.
- **Do** use one ink element per cluster — the primary action; ghost everything
  else until hover.
- **Do** use Nunito for display headings, Geist for body, Geist Mono for links,
  code, and keyboard hints.
- **Do** keep focus visible with the 3px blue ring on every interactive element.
- **Do** use warm-paper or the oklch background for surfaces, never `#ffffff`.
- **Do** give every quiet control a hover-stone fill so affordances are
  discoverable without being loud.
- **Do** reserve the soft modal/menu shadow for the overlay plane only.

### Don't:
- **Don't** use gradients, hover transforms (scale/translate), or shadows on
  surfaces for elevation or feedback.
- **Don't** introduce a chromatic accent color — the palette is monochrome warm
  stone; red is reserved for destructive actions.
- **Don't** use pure `#ffffff` surfaces or pure-black shadows.
- **Don't** bring back bold, high-contrast, visually assertive chrome — the
  anti-reference the system is replacing.
- **Don't** let a section heading read smaller than its row labels (16px 500
  muted is the floor for modal section heads).
- **Don't** hardcode colors outside the token system; reference
  `var(--background)`, `var(--foreground)`, `var(--border)`, etc.
- **Don't** add kickers/eyebrows or decorative labels — restraint extends to
  copy hierarchy.
- **Don't** render text below 11px.
