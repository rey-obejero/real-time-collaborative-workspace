using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Features.Workspaces;

public static class WorkspaceRolePermissionConstants
{
    // Owner — all 8 permissions
    public static RolePermission OwnerEntriesRead = new RolePermission
    {
        Id = Guid.Parse("1fb33824-a0d5-4be5-a14a-2709e4483485"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesRead.Id,
    };

    public static RolePermission OwnerEntriesCreate = new RolePermission
    {
        Id = Guid.Parse("b74745b9-fd0e-4491-9b3c-933d9b9ab696"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesCreate.Id,
    };

    public static RolePermission OwnerEntriesUpdate = new RolePermission
    {
        Id = Guid.Parse("06aa38ac-cdc9-491c-ab8e-3b9623063632"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesUpdate.Id,
    };

    public static RolePermission OwnerEntriesDelete = new RolePermission
    {
        Id = Guid.Parse("33e937f3-99bb-4f94-addf-51b57ce51d92"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesDelete.Id,
    };

    public static RolePermission OwnerMembersRead = new RolePermission
    {
        Id = Guid.Parse("36b882ab-685d-452d-88dd-4a78ad05a305"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.MembersRead.Id,
    };

    public static RolePermission OwnerMembersManage = new RolePermission
    {
        Id = Guid.Parse("4b0e960c-a5c8-4fb7-9dff-d58b0d8a5eac"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.MembersManage.Id,
    };

    public static RolePermission OwnerWorkspaceManage = new RolePermission
    {
        Id = Guid.Parse("ef3c39b9-a08e-48c6-a0c7-4df267c21f34"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.WorkspaceManage.Id,
    };

    public static RolePermission OwnerWorkspaceDelete = new RolePermission
    {
        Id = Guid.Parse("fd327e95-da08-4b2f-931c-6d464a74c5f7"),
        RoleId = WorkspaceRolesConstants.OWNER.Id,
        PermissionId = WorkspacePermissionsConstants.WorkspaceDelete.Id,
    };

    // Administrator — all except workspace:delete
    public static RolePermission AdminEntriesRead = new RolePermission
    {
        Id = Guid.Parse("c19c24d4-bedd-4cb4-9796-6f88299b5f69"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesRead.Id,
    };

    public static RolePermission AdminEntriesCreate = new RolePermission
    {
        Id = Guid.Parse("a89dbe19-e767-4e36-bf41-41448fb51580"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesCreate.Id,
    };

    public static RolePermission AdminEntriesUpdate = new RolePermission
    {
        Id = Guid.Parse("bce99ee3-daa7-4e3e-87bc-78d79d16e94b"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesUpdate.Id,
    };

    public static RolePermission AdminEntriesDelete = new RolePermission
    {
        Id = Guid.Parse("d48056fb-63ab-4d1f-b31a-7e62df40cfdc"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesDelete.Id,
    };

    public static RolePermission AdminMembersRead = new RolePermission
    {
        Id = Guid.Parse("821eba2b-7e27-4dff-bed4-d18e499171a7"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.MembersRead.Id,
    };

    public static RolePermission AdminMembersManage = new RolePermission
    {
        Id = Guid.Parse("5fde4a63-a323-4576-8b12-1e545dddb9c3"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.MembersManage.Id,
    };

    public static RolePermission AdminWorkspaceManage = new RolePermission
    {
        Id = Guid.Parse("50f13ec4-e14d-4b1f-b674-7c3b47fd2546"),
        RoleId = WorkspaceRolesConstants.ADMINISTRATOR.Id,
        PermissionId = WorkspacePermissionsConstants.WorkspaceManage.Id,
    };

    // Collaborator — entries only
    public static RolePermission CollaboratorEntriesRead = new RolePermission
    {
        Id = Guid.Parse("bab35ea7-6656-4dd6-82ec-3d52ae8520fd"),
        RoleId = WorkspaceRolesConstants.COLLABORATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesRead.Id,
    };

    public static RolePermission CollaboratorEntriesCreate = new RolePermission
    {
        Id = Guid.Parse("eff38bc1-1751-44da-802f-68b74204f45f"),
        RoleId = WorkspaceRolesConstants.COLLABORATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesCreate.Id,
    };

    public static RolePermission CollaboratorEntriesUpdate = new RolePermission
    {
        Id = Guid.Parse("1822074e-32ed-4c1e-bb2d-4df33b8c4dca"),
        RoleId = WorkspaceRolesConstants.COLLABORATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesUpdate.Id,
    };

    public static RolePermission CollaboratorEntriesDelete = new RolePermission
    {
        Id = Guid.Parse("19cf2b62-49a7-43e2-b650-24dafe7a9936"),
        RoleId = WorkspaceRolesConstants.COLLABORATOR.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesDelete.Id,
    };

    // Viewer — entries:read only
    public static RolePermission ViewerEntriesRead = new RolePermission
    {
        Id = Guid.Parse("931825a0-877b-41f0-8ab6-1c97115391d1"),
        RoleId = WorkspaceRolesConstants.VIEWER.Id,
        PermissionId = WorkspacePermissionsConstants.EntriesRead.Id,
    };
}
