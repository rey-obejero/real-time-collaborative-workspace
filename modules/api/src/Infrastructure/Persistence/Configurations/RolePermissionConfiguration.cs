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
            WorkspaceRolePermissionConstants.OwnerEntriesRead,
            WorkspaceRolePermissionConstants.OwnerEntriesCreate,
            WorkspaceRolePermissionConstants.OwnerEntriesUpdate,
            WorkspaceRolePermissionConstants.OwnerEntriesDelete,
            WorkspaceRolePermissionConstants.OwnerMembersRead,
            WorkspaceRolePermissionConstants.OwnerMembersManage,
            WorkspaceRolePermissionConstants.OwnerWorkspaceManage,
            WorkspaceRolePermissionConstants.OwnerWorkspaceDelete,
            WorkspaceRolePermissionConstants.AdminEntriesRead,
            WorkspaceRolePermissionConstants.AdminEntriesCreate,
            WorkspaceRolePermissionConstants.AdminEntriesUpdate,
            WorkspaceRolePermissionConstants.AdminEntriesDelete,
            WorkspaceRolePermissionConstants.AdminMembersRead,
            WorkspaceRolePermissionConstants.AdminMembersManage,
            WorkspaceRolePermissionConstants.AdminWorkspaceManage,
            WorkspaceRolePermissionConstants.CollaboratorEntriesRead,
            WorkspaceRolePermissionConstants.CollaboratorEntriesCreate,
            WorkspaceRolePermissionConstants.CollaboratorEntriesUpdate,
            WorkspaceRolePermissionConstants.CollaboratorEntriesDelete,
            WorkspaceRolePermissionConstants.ViewerEntriesRead
        );
    }
}
