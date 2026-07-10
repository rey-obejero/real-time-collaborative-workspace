using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasKey(role => role.Id);
        builder.HasIndex(role => role.Name).IsUnique();
        builder.HasData(
            WorkspacesRoles.VIEWER,
            WorkspacesRoles.COLLABORATOR,
            WorkspacesRoles.ADMINISTRATOR,
            WorkspacesRoles.OWNER
        );
    }
}
