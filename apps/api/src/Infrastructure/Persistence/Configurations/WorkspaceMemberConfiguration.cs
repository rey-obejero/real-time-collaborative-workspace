using KnowledgeManagementApp.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Configurations;

public class WorkspaceMemberConfiguration : IEntityTypeConfiguration<WorkspaceMember>
{
    public void Configure(EntityTypeBuilder<WorkspaceMember> builder)
    {
        builder.HasIndex(member => new { member.WorkspaceId, member.UserId }).IsUnique();

        builder
            .HasOne<Role>()
            .WithMany()
            .HasForeignKey(member => member.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
