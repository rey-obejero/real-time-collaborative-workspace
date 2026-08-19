# Workspace Permissions

## Model

Permissions use the `resource:action` or `noun:verb` naming convention.
Each permission is a string assigned to roles via the `RolePermission` table.
Permission-to-role assignment is flat; each role's permission set is explicit
with no inheritance. That is, there are no mechanisms for higher roles to
automatically inherit the permissions of lower roles, such as the "Administrator"
role inheriting all the permissions of the "Collaborator" role without manual assignment.

## Available Permissions

| Permission         | Description                         |
| ------------------ | ----------------------------------- |
| `workspace:manage` | Rename workspace, update settings   |
| `workspace:delete` | Delete the workspace                |
| `members:read`     | View workspace member list          |
| `members:manage`   | Add, remove, or change member roles |
| `entries:read`     | View entries in a workspace         |
| `entries:create`   | Create new entries                  |
| `entries:update`   | Edit existing entries               |
| `entries:delete`   | Delete entries                      |

## Available Roles

| Permission         | Owner | Administrator | Collaborator | Viewer |
| ------------------ | ----- | ------------- | ------------ | ------ |
| `workspace:manage` | x     | x             | -            | -      |
| `workspace:delete` | x     | -             | -            | -      |
| `members:read`     | x     | x             | -            | -      |
| `members:manage`   | x     | x             | -            | -      |
| `entries:read`     | x     | x             | x            | x      |
| `entries:create`   | x     | x             | x            | -      |
| `entries:update`   | x     | x             | x            | -      |
| `entries:delete`   | x     | x             | x            | -      |

## Permissions Validation

All permission checks go through `IPermissionService`:

```csharp
bool hasPermission = await _permissionService.HasPermissionAsync(
    userId,
    workspaceId,
    WorkspacePermissionsConstants.EntriesCreate
);
```

Services inject `IPermissionService` and call `HasPermissionAsync` in guard clauses.
The service returns `Error.Forbidden` (HTTP 403) when permission is denied.

## Design-Time/Compile-Time Safety

The class in `Application/Features/Workspaces/WorkspacePermissionsConstants.cs` defines string
constants for every permission. These constants are used instead of raw strings in
code. This typed approach mitigates the risk of invalid permission strings.

## Seeding

Permissions and role-permission assignments are seeded via EF Core migration
`HasData()`. See existing migration files for the exact seed data.
