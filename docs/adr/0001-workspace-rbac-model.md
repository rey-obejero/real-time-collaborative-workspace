# ADR: Workspace RBAC Model

## Status

Accepted

## Context

The system is currently single-user-centric. To introduce collaboration, entity
relations for workspace memberships need to be defined, along with a permission
model to control what each member can do.

## Decision

Six tables represent workspace access:

- **Workspace** — retains its existing `UserId` field as the workspace owner reference (denormalized for fast lookup).
- **User** — already exists in the Identity system.
- **Role** — seeded roles: `Owner`, `Administrator`, `Collaborator`, `Viewer`. C# constants ensure typed references.
- **WorkspaceMember** — tracks which users belong to which workspace. Each membership row references a role. The owner is also added here as a member with the `Owner` role.
- **Permission** — seeded action strings in `resource:action` format (AWS IAM convention). Examples: `entries:create`, `members:manage`, `workspace:delete`.
- **RolePermission** — join table that assigns permissions to roles. Each role's permission set is explicit and flat (no inheritance).

### Permissions Model

#### Naming Convention

`resource:action` — groups related actions under a resource scope:

| Permission         | Owner | Admin | Collab | Viewer |
| ------------------ | ----- | ----- | ------ | ------ |
| `entries:read`     | ✅    | ✅    | ✅     | ✅     |
| `entries:create`   | ✅    | ✅    | ✅     | ❌     |
| `entries:update`   | ✅    | ✅    | ✅     | ❌     |
| `entries:delete`   | ✅    | ✅    | ✅     | ❌     |
| `members:read`     | ✅    | ✅    | ❌     | ❌     |
| `members:manage`   | ✅    | ✅    | ❌     | ❌     |
| `workspace:manage` | ✅    | ✅    | ❌     | ❌     |
| `workspace:delete` | ✅    | ❌    | ❌     | ❌     |

#### Assignment Model: Flat (no inheritance)

Each role's permissions are explicitly assigned in the `RolePermission` table. A
"Viewer" gets `entries:read`. An "Administrator" gets all Viewer permissions
plus `entries:create`, `entries:update`, `entries:delete`, `members:read`,
`members:manage`, and `workspace:manage`. No ParentRoleId or recursive lookup.

#### Compile-Time Safety

An `Application/Features/Workspaces/Permissions.cs` constants file mirrors
the DB values. Used in permission-check logic to prevent typos.

#### Documentation

`apps/api/docs/permissions.md` serves as the single source of truth for
available permissions and role mappings.

#### Drift Prevention

A unit test asserts that the `Permissions.All` set matches the count of seeded
permission rows, catching drift between code constants and database seed data.

#### Check Placement

A centralized `IPermissionService` exposes a single method:

```csharp
Task<bool> HasPermissionAsync(Guid userId, Guid workspaceId, string permission);
```

Services (WorkspaceService, EntryService) inject this and call it in guard
clauses, rather than hardcoding role-name checks or using authorization
attributes. This keeps permission logic in one place and makes it mockable.

### Owner Invariant

`Workspace.UserId` must match a `WorkspaceMember` row where
`Role.Name == "Owner"`. This invariant is enforced in the application layer,
which creates or updates both the workspace and its membership in a single unit
of work.

### Constraints

- One membership per user per workspace. Unique constraint on
  `WorkspaceMember(WorkspaceId, UserId)`.
- One permission per role per assignment. Composite unique on
  `RolePermission(RoleId, PermissionId)`.
- Permission names are unique.
- Role names are unique (global roles now, revisit for dynamic roles later).
- Workspace delete cascades to memberships and associated resources (hard
  delete for now, soft delete planned).
- User delete cascades to memberships. Orphaned entries from a deleted user are
  reassigned to the workspace owner (planned).
- Role FK on WorkspaceMember: `DeleteBehavior.Restrict` (cannot delete a role
  referenced by a membership).
- Roles, permissions, and role-permission assignments seeded via migration
  `HasData()`, not a startup initializer.

### Visibility

Membership equals visibility. Any user with a membership row in the workspace can
access it. Authorization at the operation level uses permission lookups (via
`IPermissionService`), not hardcoded role-name comparisons.

## Alternatives Considered

Chosen options are marked with "(x)".

### (x) Maintain `Workspace.UserId` with ownership syncing

Keep `UserId` as a direct owner reference AND add `WorkspaceMember` table. Sync
both in application layer.

- **Pro:** Fast lookup for owner. Simple querying for "my workspaces."
  Compatible with existing data. Has redundancy but is negligible.
- **Con:** Owner invariant must be maintained. Two sources of truth that can
  diverge if enforcement is bypassed.

### ( ) Drop `Workspace.UserId`, derive owner from membership entry

Remove `Workspace.UserId` entirely. Ownership determined by querying
`WorkspaceMember` for the row with `Role.Name == "Owner"`.

- **Pro:** Single source of truth. No owner invariant needed.
- **Con:** Owner lookup requires a join. Migration changes existing data.
  Workspace entity loses direct reference to owner.

### Permission Assignment: Flat vs Inherited

| Approach         | How                                                        | When to use                                          |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| (x) Flat         | Each role gets explicit permission set in `RolePermission` | Few roles (≤10). Simpler to reason about.            |
| ( ) Hierarchical | `Role.ParentRoleId` — permissions flow upward              | Many roles with overlapping sets. Auto-broadcasting. |

Chosen flat. With 4 roles and 8 permissions (18 assignment rows), the
overhead of flat is negligible. When dynamic roles arrive, flat is also simpler
for users to understand — they pick exactly which permissions to assign.

### Permission Check Placement: Inline vs IPermissionService vs Auth Filter

| Approach               | How                              | Pro                               | Con                                   |
| ---------------------- | -------------------------------- | --------------------------------- | ------------------------------------- |
| ( ) Inline             | Service queries Role directly    | Simple, no abstraction            | Boilerplate repeats across services   |
| (x) IPermissionService | Centralized `HasPermissionAsync` | Single mock, caching-friendly     | One more service abstraction          |
| ( ) Auth filter        | `[HasPermission("x")]` attribute | Declarative, visible on endpoints | Error handling outside Result pattern |

Chosen `IPermissionService`. Three services already need permission checks
(Workspace, Entry, Member). The abstraction pays for itself in testability and
centralized caching.

### Drift Prevention: Test vs Manual vs Auto-Generation

| Approach          | How                                                | Pro                          | Con                               |
| ----------------- | -------------------------------------------------- | ---------------------------- | --------------------------------- |
| (x) Test          | Assert `Permissions.All` count matches seeded rows | Catches drift before runtime | Requires running tests            |
| ( ) Manual        | No test; rely on developer discipline              | Zero setup                   | Drift silently breaks permissions |
| ( ) Auto-generate | Build step generates constants from migration      | Never drifts                 | Infrastructure overhead           |

Chosen test. Simple one-assertion test, negligible maintenance.

## Consequences

### Migration

Existing database will be wiped; existing workspaces and data are
non-critical. The migration seeds 8 permissions and 18 role-permission
assignments alongside the schema changes.

### API

Entity relations dictate the necessary endpoints.

The `CreateWorkspaceAsync` method inserts the requesting user as an owner
member in the `WorkspaceMember` table.

The `AddWorkspaceMemberAsync` method checks the requesting user's permission
via `IPermissionService.HasPermissionAsync(_, _, "members:manage")`.

Existing endpoints (entry creation, retrieval, etc.) gain permission checks
behind the same interface, replacing any hardcoded role-name comparisons.

### ERD

See ERD: `docs/features/workspaces/ (planned).
