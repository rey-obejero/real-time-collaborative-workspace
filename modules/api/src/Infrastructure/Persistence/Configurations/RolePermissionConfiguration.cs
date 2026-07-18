using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Configurations;

public class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.HasIndex(rp => new { rp.RoleId, rp.PermissionId }).IsUnique();

        builder
            .HasOne<Role>()
            .WithMany()
            .HasForeignKey(rp => rp.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne<Permission>()
            .WithMany()
            .HasForeignKey(rp => rp.PermissionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            WorkspacesRolePermissions.OwnerEntriesRead,
            WorkspacesRolePermissions.OwnerEntriesCreate,
            WorkspacesRolePermissions.OwnerEntriesUpdate,
            WorkspacesRolePermissions.OwnerEntriesDelete,
            WorkspacesRolePermissions.OwnerMembersRead,
            WorkspacesRolePermissions.OwnerMembersManage,
            WorkspacesRolePermissions.OwnerWorkspaceManage,
            WorkspacesRolePermissions.OwnerWorkspaceDelete,
            WorkspacesRolePermissions.AdminEntriesRead,
            WorkspacesRolePermissions.AdminEntriesCreate,
            WorkspacesRolePermissions.AdminEntriesUpdate,
            WorkspacesRolePermissions.AdminEntriesDelete,
            WorkspacesRolePermissions.AdminMembersRead,
            WorkspacesRolePermissions.AdminMembersManage,
            WorkspacesRolePermissions.AdminWorkspaceManage,
            WorkspacesRolePermissions.CollaboratorEntriesRead,
            WorkspacesRolePermissions.CollaboratorEntriesCreate,
            WorkspacesRolePermissions.CollaboratorEntriesUpdate,
            WorkspacesRolePermissions.CollaboratorEntriesDelete,
            WorkspacesRolePermissions.ViewerEntriesRead
        );
    }
}
