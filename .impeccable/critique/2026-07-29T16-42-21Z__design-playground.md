---
target: design/playground snip (workspace prototype)
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 1
timestamp: 2026-07-29T16-42-21Z
slug: design-playground
---
# Design Critique: Workspace Prototype (`design/playground`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Save indicator works but create/delete/invite give zero feedback |
| 2 | Match System / Real World | 3 | PARA collections map naturally; "Schemas" label is inside jargon |
| 3 | User Control and Freedom | 2 | Back + ESC work; no undo, no cancel on any destructive path |
| 4 | Consistency and Standards | 3 | Pill geometry consistent; chat bubble uses `rounded-lg` (should be `rounded-full` per design system); hardcoded `#d4d4d4`/`#e5e5e5` in tweaks CSS |
| 5 | Error Prevention | 1 | No confirmation dialogs. Trash non-functional. "soon" label on disabled item with no explanation |
| 6 | Recognition Rather Than Recall | 2 | Icons + counts help; no favorites, no breadcrumbs, no recent-entry quick picker |
| 7 | Flexibility and Efficiency | 1 | Only Ctrl+K and ESC work. No Cmd+N, no Cmd+/ palette, no bulk actions, no keyboard nav in search |
| 8 | Aesthetic and Minimalist Design | 4 | Whitespace is layout. Every element earns place. Strong Ollama-inspired restraint. |
| 9 | Error Recovery | 0 | Trash non-functional. No undo. No version history. No error messages anywhere. |
| 10 | Help and Documentation | 1 | "Press / to insert blocks..." is sole hint. No onboarding, no tooltips, no empty-state guidance |
| **Total** | | **19/40** | **Poor** |

## Design Specificity Verdict

The prototype faithfully translates Ollama's pill geometry, paper-white canvas, and muted grays into a productivity workspace. The token system maps cleanly to DESIGN.md — that's rare and valuable.

But several moments drift into generic-minimal-dashboard territory: the list-view table, settings modal, and conversations panel could swap into any SaaS app unchanged. The product's distinctive "structure meets fluidity" positioning (typed objects + freeform editing) only truly lands in one place: the property-chip row below the editor title, where schema metadata sits as a peer with prose.

**LLM assessment**: Grounded but not yet distinctive. The design system is applied with discipline; the product identity is not yet authored into the chrome.

**Deterministic scan** (detect.mjs): 1 real finding — `layout-transition` on Conversations.astro:3 (width animation causes layout thrash). 3 `overused-font` findings were false positives (Inter is the intentional body font per design tokens).

## Overall Impression

The bones are good. The CSS variable architecture is clean, the pill geometry is consistent, the editor reading experience is genuinely pleasant. But Ollama's "defiantly minimal" ethos was designed for a marketing page with one CTA — a PKM workspace has dozens of interactive surfaces per screen, and the same restraint that makes a landing page elegant makes a productivity tool feel sterile and under-equipped. The biggest gap: the product promises "keyboard-first interaction" in PRODUCT.md but delivers only two keyboard shortcuts. Every other issue flows from this core tension between marketing-page restraint and workspace-tool capability.

## What's Working

1. **Token discipline.** CSS variable system maps 1:1 to DESIGN.md. Dark mode is a clean inversion. No hardcoded colors in components (modulo 2 tweaks-CSS exceptions). This is production-grade foundations.

2. **Property chips in editor.** Status · Priority · Due · Tags as inline pills below the title is the single most product-specific design decision. It embodies "structure meets fluidity" — typed metadata as peers with prose.

3. **Editor reading experience.** 30px display title, narrow `max-w-2xl` column, clean whitespace, subtle sync indicator. This is a place someone could think and write.

## Priority Issues

### [P1] No keyboard efficiency layer
**What**: Only Ctrl+K (search) and ESC work. No Cmd+N (new entry), no Cmd+Enter (save), no Cmd+/ (command palette), no J/K navigation in list, no arrow-key nav in search results.
**Why it matters**: PRODUCT.md explicitly promises "keyboard-first interaction." Power users (Alex) will abandon on day one. Jordan will be confused about what's possible.
**Fix**: Implement keyboard shortcuts for all primary actions. Show a cheatsheet on `?` key.
**Command**: `$impeccable shape`

### [P1] Zero error recovery
**What**: No undo functionality. Trash is a non-functional placeholder. No confirmation on any destructive action. No error messages anywhere.
**Why it matters**: Users will inevitably delete entries, make mistakes, or hit unexpected states. With no safety net, every action feels high-risk. The "sync is trust" product principle is undercut by "delete is permanent."
**Fix**: Make trash functional (soft delete with 30-day recovery). Add undo toasts. Add confirmation dialogs for entry deletion and workspace-level actions.
**Command**: `$impeccable harden`

### [P2] Accessibility gaps
**What**: `outline: none` on all inputs/textareas/contenteditable removes default focus rings. Status dots are 8px and use color-only encoding (no text label). `.focus-ring` class exists but is not consistently applied. No ARIA landmarks, no modal focus trapping, no `role="dialog"`. `select-none` on body prevents text selection globally.
**Why it matters**: Keyboard-only users (Sam) cannot navigate. Screen readers have no structure. Color-blind users cannot distinguish status dots. Users who select text in the editor will be confused.
**Fix**: Restore visible focus indicators on all interactive elements. Add text labels to status indicators. Add ARIA roles to modals and panels. Remove `select-none` from body (scope to non-editor areas).
**Command**: `$impeccable audit`

### [P2] Discoverability deficit
**What**: Conversations panel hidden behind icon-only button with no label. Slash commands require knowing to type `/`. No tooltips anywhere. No onboarding path. Empty states show bare "This set is currently empty." with no guidance.
**Why it matters**: First-timer (Jordan) lands on an empty workspace with no idea what to do. Riley sees "No results" with no suggestion for next action. Hidden features might as well not exist.
**Fix**: Add tooltip hints on first visit. Upgrade empty states with contextual CTAs ("Create your first entry"). Show keyboard-shortcut cheatsheet. Consider a brief onboarding overlay (skippable).
**Command**: `$impeccable onboard`

### [P3] Conversations feel disconnected
**What**: Panel opens globally — not tied to the active entry. Messages reference entries by title only. No way to start a discussion from the editor itself.
**Why it matters**: The "threaded conversations on entries" capability loses value when conversations float free from the content they discuss.
**Fix**: Link conversations to specific entries. Show which entry a thread belongs to. Add "Start discussion" action in editor toolbar.
**Command**: `$impeccable shape`

## Persona Red Flags

**Alex (Power User)**: Critical failures. Only Ctrl+K + ESC work. No bulk selection in list view. No quick-capture from anywhere (`Cmd+N`?). No command palette. No J/K list navigation. No drag-to-reorder entries. Alex abandons within hours, not days.

**Sam (Accessibility-Dependent)**: Critical failures. Focus outlines disabled globally. Status dots are color-only (8px, no text label). Modal focus not trapped — tab can escape behind backdrop. No `<nav>`, `<main>`, or `<aside>` landmarks. Contrast ratio of `muted-foreground` (#737373) on white at 12px fails WCAG AA (4.6:1 passes for large text but not for 12px body).

**Jordan (First-Timer)**: Jordan opens the app and sees: a sidebar with icons and unlabeled counts, a list view that says "No entries," a "Create" button with 5+ choices. No "Getting started" prompt. No tooltip on hover. No empty-state CTA. Jordan abandons in 30 seconds.

**Riley (Edge Cases)**: Riley piles 50 tags on one entry → property chip line overflows. Riley creates a 500-character title → no truncation guidance. Riley refreshes mid-edit → state is not preserved (no draft recovery). Riley hits "Delete" → no confirmation, entry gone.

## Minor Observations

- DiceBear uses v10 API in sidebar header, v7 in dropdown — mismatching avatar styles
- Hardcoded `#d4d4d4` / `#e5e5e5` in `.tweaks-chips-bordered` CSS — should use `var(--hairline-strong)` / `var(--hairline)`
- Conversations panel uses `w-0 hidden` toggle — `display: none` prevents CSS transitions, making the slide feel instant/janky
- Search modal footer says "↑↓ navigate · ↵ open" but keyboard nav is not implemented — misleading affordance
- `select-none` on `<body>` conflicts with the editor's `contenteditable` — users cannot select text in the reading view
- `no-scrollbar` hides scrollbars entirely — users lose scroll-position awareness (especially in modal content canvases)
- Tweaks toolbar uses `text-[11px]` for icon-set buttons — violates AGENTS.md 12px minimum
- Chat reply input is `text-[12px]` — below the 14px body-text minimum size
- No `max-w` constraint on sidebar dropdown menus — long workspace names could overflow

## Questions to Consider

1. **The Ollama tension**: Ollama's design language was built for a marketing page with one CTA per viewport. A PKM workspace has 10+ interactive surfaces per screen. At what point does "defiantly minimal" become "hostile to productivity"? Is the design system ready for an Operate-mode surface with hundreds of entries, filters, and multi-step workflows?

2. **Tweaks toolbar — prototype or feature?**: The tweaks panel exposes design-system decisions (density, chip style, card edge, status display, icon set) to end users. Is this a prototype-only artifact, or is the product planning user-customizable chrome? If the latter, the architecture should be prepared for that contract.

3. **What happens at scale?**: The sidebar has 3 collections + 5 schemas + Trash. When a user has 200+ entries, "All" becomes useless. Is there a plan for search-first navigation, recent-filter persistence, or sidebar virtualization?

4. **The property chips are generative — why read-only?**: The property-chip row is the most distinctive design decision in the prototype. It currently displays metadata read-only. Could users add/edit properties inline from the chip row? That would make "structure meets fluidity" interactive, not just visual.

5. **"Ask AI" has no behavior yet**: When it ships, will it open a modal, a side panel, or inline? The "ambient AI" product principle suggests inline — but the header placement suggests modal. The interaction model should be decided before the behavior is built.
