using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Configurations;

public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.HasKey(permission => permission.Id);
        builder.HasIndex(permission => permission.Name).IsUnique();
        builder.HasData(
            WorkspacePermissionsConstants.EntriesRead,
            WorkspacePermissionsConstants.EntriesCreate,
            WorkspacePermissionsConstants.EntriesUpdate,
            WorkspacePermissionsConstants.EntriesDelete,
            WorkspacePermissionsConstants.MembersRead,
            WorkspacePermissionsConstants.MembersManage,
            WorkspacePermissionsConstants.WorkspaceManage,
            WorkspacePermissionsConstants.WorkspaceDelete
        );
    }
}
