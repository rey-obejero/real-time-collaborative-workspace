# Web Client Standards

## ShadCN Component Philosophy

**Edit primitives (`ui/`) directly for design tokens; wrappers = pure composition.**

- **Primitives** (`button.tsx`, `input.tsx`, `dialog.tsx`, `card.tsx`, etc.) — edit `ui/` files directly. They're small, single-purpose, and used everywhere. Editing propagates the design system consistently.
- **Composites** (`sidebar.tsx`) — a wrapper in `components/` may carry app-specific logic (nav data, routes, menus). The primitive should carry design tokens (radii, colors, sizes). Avoid duplicating token overrides in the wrapper.

### Sidebar Refactor (Known Follow-up)

Move design tokens out of `components/sidebar/sidebar.tsx` into `ui/sidebar.tsx`:
- Standardize `rounded-[7px]` and `rounded-[4px]` magic numbers → `rounded-md`
- Push muted label color (`text-muted-foreground`) into `SidebarGroupLabel`
- Reduce wrapper to pure composition (structure + data only)
