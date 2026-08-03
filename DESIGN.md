---
name: Workspace
description: A quiet, muted, tame PKM workspace on warm-stone neutrals.
colors:
  warm-paper: "#f4f4f1"
  ink: "#1c1917"
  ink-soft: "#f5f5f4"
  soft-stone: "#eae9e6"
  muted-clay: "#6d675f"
  hairline: "#e0dfdb"
  hairline-strong: "#cfceca"
  input-surface: "#fdfdfc"
  hover-stone: "#e2e1de"
  panel-dark: "#292524"
  border-dark: "#44403c"
  destructive: "#ff5f56"
  focus-ring: "rgba(59, 130, 246, 0.5)"
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
    backgroundColor: "#0c0a09"
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
    rounded: "{rounded.full}"
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
    backgroundColor: "{colors.soft-stone}"
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
quiet until you reach for them. The system is built on monochrome warmth: paper-
white-warm surfaces (`--background: #f4f4f1`), stone-gray neutrals, and pure ink
(`#1c1917`) used sparingly. Nothing shouts; the interface recedes so the work —
writing, organizing, thinking — is the loudest thing on screen.

The aesthetic is deliberately tame and muted. This is a rejection of the
product's earlier high-contrast, visually assertive chrome and of the corporate
"AI slop" look: no gradients, no saturated accent colors, no glowing buttons.
Every surface is flat, every divider is a 1px hairline, and every interactive
element is a small rounded control that wakes only on interaction.

Controls are refined and restrained. Interactive elements use soft pill geometry
(`border-radius: 9999px`) and compact 28px icon buttons with 7px corners. Hover
fills are one quiet step of stone (`--hover: #e2e1de`); the primary action on a
cluster is the single ink pill, and the rest of the cluster stays ghosted until
it earns attention.

**Key Characteristics:**
- Warm-stone monochrome neutrals; pure ink for primary actions, never bright hues.
- Fully flat surfaces; structure comes from 1px hairlines and tonal layering, never shadows.
- Pill geometry for interactive controls; 12px corners for cards; 7px for small controls and rows.
- Geist for body, Nunito for display headings, Geist Mono for labels and code.
- Quiet chrome: muted-clay secondary text, hairline borders, restrained hover fills.
- Dark mode inverts the same token system without changing the geometry.

## Colors

The palette is monochrome warmth — a warm stone family with a single ink accent
and a reserved red for destructive actions. There is no chromatic accent color;
differentiation comes from tonal steps, not hue.

### Primary
- **Ink** (#1c1917): Foreground text and the one strong surface. The primary
  button (`.primary-btn`), active emphasis, and the inverted "owner" badge all
  use ink. In dark mode ink becomes the background and `ink-soft` (#f5f5f4) the
  foreground. Ink is scarce — it marks the primary action per cluster, nothing else.

### Neutral
- **Warm Paper** (#f4f4f1): The canvas. Background, card, and popover surfaces in
  light mode (dark: `#1c1917`). Slightly warmer than pure white by design; never
  use `#ffffff` for a surface.
- **Soft Stone** (#eae9e6): Muted fills — secondary and accent surfaces, active
  sidebar rows, the search/create slab. Dark: `#292524`.
- **Hover Stone** (#e2e1de): The one-step hover fill. Every quiet control (ghost
  buttons, nav rows, icon buttons, chips) fills with hover-stone on hover.
- **Muted Clay** (#6d675f): Secondary text — metadata, placeholders, section
  headings. Contrast on warm-paper is comfortable but unmistakably secondary.
- **Hairline** (#e0dfdb): 1px borders and dividers. Structure is drawn in
  hairline, never in shadow. **Hairline Strong** (#cfceca) for emphasized edges.
- **Input Surface** (#fdfdfc): The faintly brighter field background for inputs
  and search fields (dark: `#1c1917`).
- **Destructive** (#ff5f56): Reserved for delete/revoke actions only, used
  sparingly.

### Named Rules
**The Workbench Rule.** Ink appears once per viewport cluster. The single black
pill is the primary action; everything else on the workbench is hairline and
muted until interacted with. The restraint is the design.

**The Hairline Rule.** Structure is drawn with 1px `var(--border)` hairlines and
tonal fills, never with shadows. If a section needs separation, reach for a
hairline first and a fill second.

## Typography

**Display Font:** Nunito (with ui-sans-serif, system-ui fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace fallback)

**Character:** A rounded geometric display paired with a clean, neutral sans body
— friendly but not childish, precise but not stiff. Geist keeps long-form reading
calm; Nunito gives the rare heading a soft, approachable curve. Geist Mono marks
system identities: invite links, keyboard hints, and code.

### Hierarchy
- **Display** (Nunito 500, 20px, 1.2): Surface titles — the modal heading
  ("Settings"). The only face that carries Nunito.
- **Body** (Geist 400, 16px, 1.5): Default text, prose, entry content
  (`.prose-readable`).
- **Title / Row Label** (Geist 400, 14px): Row and list labels (`.wv-row-label`,
  `.nav-row` items, header actions).
- **Label** (Geist 500, 12px): Field labels (`.wv-field-label`), buttons, chips,
  property values, keyboard hints.
- **Meta** (Geist 400, 12px): Secondary metadata — emails, timestamps,
  counts (`.wv-row-meta`).
- **Micro** (Geist 500, 11px): Badges and status labels (`.wv-role-badge`,
  `.status-label-only`).

### Named Rules
**The Type Ratio Rule.** Display (20px Nunito) → section head (14px 500 muted) →
row label (14px 400) → metadata (12px muted). Each step down both shrinks and
mutes; never let a section heading read smaller or weaker than the row labels it
leads.

## Layout

A single full-height workspace frame: a fixed sidebar and a main column that
holds the header bar and the content surface, with overlays (floating toolbar,
slash menu, modals) stacked above.

- **Frame:** `h-full w-full flex` — sidebar + `<main class="flex-1 flex flex-col">`.
- **Header bar:** 56px tall (`h-14`), `px-6`, `grid grid-cols-[1fr_auto_1fr]`,
  hairline bottom border. Left: back/forward/recent. Center: breadcrumb.
  Right: theme toggle, share, Ask AI.
- **Content column:** List view is a bordered card at `w-[85%] mx-auto px-8 py-8`;
  the editor surface sits full-width below the list.
- **Spacing rhythm:** a 4/8/12/24px scale — `gap-1`(4px) inside icon clusters,
  `gap-2`(8px) between related controls, `px-3`(12px) button padding,
  `24px` section margins and modal padding. Section headings sit at
  `24px 0 4px`.
- **Density:** comfortable. Rows pad `8px` vertically, controls are 28px tall,
  small buttons `h-7` (28px) with `px-2` (8px). No cramped 6px-vertical rows.
- **Responsive:** no breakpoint system is implemented; the workspace is
  desktop-first. Long fields shrink (`min-width: 0`, ellipsis) before wrapping.

## Elevation & Depth

Fully flat. There are no elevation shadows in the system. Depth is conveyed
entirely by 1px hairlines and tonal layering: a card is warm-paper on
warm-paper, separated by a hairline border; a hover state is one stone step
darker; a floating menu (`.floating-pop`, tooltips) sits above by carrying a
hairline border and its own background, not a shadow.

The only `box-shadow` in the codebase is the accessibility focus ring — a 3px
blue ring (`0 0 0 3px rgba(59, 130, 246, 0.5)`, `--ring`) on focused controls
and menu items. Focus rings are an accessibility affordance, not an elevation
mechanism; they are the sole chromatic element permitted.

### Named Rules
**The Flat-By-Default Rule.** No surface casts a shadow. If an element needs to
read above another, give it a hairline border and a background — never a drop
shadow. Do not reintroduce elevation as a decorative layer.

## Shapes

The form language is gentle circles and soft rectangles on a flat plane.

- **Pills** (`9999px`): every interactive control that carries a label — buttons,
  chips, badges, search pills, the circular close and avatar.
- **Controls** (7px): compact square-ish controls and rows — nav rows, header
  icon buttons, small buttons, inputs, the floating-menu rows, invite links.
- **Cards** (12px, `--radius: 0.75rem`): the entry table card, modal card.
- **Inner slabs** (8px, `--radius-md`): tooltips, the search/create cluster
  (`.vp2-shell`), dropdown panels.
- **Borders:** 1px hairlines only. No double borders, no embossed edges.
- **Avatars:** circular (`border-radius: 9999px`), 18px inline in rows, 20–24px
  in headers and menus.

### Named Rules
**The Pill Rule.** If it's interactive, it's a pill or a 7px control — never a
sharp square, never a playful squircle. Radius choice signals affordance: pills
for labeled actions, 7px for quiet square controls, 12px for containers.

## Components

### Buttons
- **Shape:** labeled actions are pills (`9999px`); compact controls are 7px.
  Small buttons are `h-7 px-2`, `text-[12px]`–`text-[14px]`, medium `px-3 py-1.5`.
- **Primary** (`.primary-btn`): ink pill, `ink-soft` text. Hover: `#0c0a09`
  (dark: `#e7e5e4`). Reserved for the one action per cluster.
- **Ghost** (`.ghost-btn`): warm-paper pill, ink text. Hover: hover-stone fill.
- **Outline** (header Share, settings Edit): transparent, 1px hairline border,
  ink text, hover-stone fill on hover.
- **Text** (`.ask-ai-text`): transparent, ink/muted text, hover-stone fill on
  hover, icons at 2px stroke.
- **Icon** (`.header-btn`, `.wv-row-icon-btn`): 28×28, 7px radius, muted-clay
  icon; hover-stone fill and ink icon on hover. Never bare squares.

### Chips / Badges
- **Property chip** (`.property-chip`): 12px pill, warm-paper fill, muted-clay
  label + ink value, 4px inner gap.
- **Type pill** (`.type-pill`): 12px 500 pill distinguishing entry types.
- **Status badge** (`.status-label-only`): 12px 500 pill, capitalized label.
- **Role badge** (`.wv-role-badge`): 11px 500 pill, hairline border, warm-paper
  fill; the owner role inverts to ink fill with warm-paper text.
- **Avatar chip** (`.avatar-chip`): 18px circle, 10px 600 initials, soft-stone fill.

### Inputs / Fields
- **Style:** 12px text, 7px radius, `--input` background (input-surface / dark
  `#1c1917`), hairline border. Widths: 240px standard, 150px inline invite,
  200px settings rows.
- **Focus:** 3px blue ring (`--ring`) via `.focus-ring`; text controls drop
  their default outline in favor of the ring.

### Navigation
- **Sidebar rows** (`.nav-row`): 7px radius, muted-clay text; hover fills
  hover-stone and darkens to ink; the active row fills soft-stone with ink text.
- **Tabs:** `.field-tab` — ink underline on active; `.section-tab` — soft-stone
  pill fill on active.
- **Header controls:** 28px icon buttons with hover tooltips (12px, 8px radius,
  hairline border, warm-paper fill) and keyboard hints in Geist Mono.

### Cards / Containers
- **Corner Style:** 12px (entry table `rounded-t-lg`, modal `rounded-lg`).
- **Background:** warm-paper (`--card`).
- **Border:** 1px hairline (`var(--border)`).
- **Shadow Strategy:** none — see Elevation & Depth.
- **Internal Padding:** 24px modal canvas, `px-8 py-8` list, 12px inner panels.

### Signature Component: The Settings Modal
A `max-w-2xl` card, `rounded-lg`, hairline border, `bg-popover` (warm-paper).
Header stacks a 20px Nunito title over a 13px muted subtitle, close button
aligned to the title line. Sections separated by 1px rules; rows are
`wv-row` label/value pairs with 10px vertical padding and hairline dividers
between member rows. The invitation row is an action-first cluster: username
input, outline Add button, "or", outline Generate-link button, expiry select —
with the generated link appearing as a 12px Geist Mono chip.

## Do's and Don'ts

### Do:
- **Do** keep chrome quiet: warm-paper surfaces, hairline borders, muted-clay
  secondary text, ink reserved for primary actions.
- **Do** draw structure with 1px hairlines (`var(--border)`) and tonal fills,
  never shadows.
- **Do** use pill geometry for labeled actions and 7px for compact controls.
- **Do** use one ink element per cluster — the primary action; ghost everything
  else until hover.
- **Do** use Nunito for display headings, Geist for body, Geist Mono for links,
  code, and keyboard hints.
- **Do** keep focus visible with the 3px blue ring on every interactive element.
- **Do** use warm-paper (`#f4f4f1`) for surfaces; it is warmer than `#ffffff` by
  design.
- **Do** give every quiet control a hover-stone fill so affordances are
  discoverable without being loud.

### Don't:
- **Don't** use shadows, gradients, or hover transforms (scale/translate) for
  elevation or feedback.
- **Don't** introduce a chromatic accent color — the palette is monochrome warm
  stone; red is reserved for destructive actions.
- **Don't** use pure `#ffffff` surfaces or pure-black shadows.
- **Don't** bring back bold, high-contrast, visually assertive chrome — the
  anti-reference the system is replacing.
- **Don't** let a section heading read smaller than its row labels (14px 500
  muted is the floor for section heads).
- **Don't** hardcode colors outside the token system; reference
  `var(--background)`, `var(--foreground)`, `var(--border)`, etc.
- **Don't** add kickers/eyebrows or decorative labels — restraint extends to
  copy hierarchy.
- **Don't** render text below 11px.
