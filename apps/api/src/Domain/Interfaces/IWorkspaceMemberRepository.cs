using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IWorkspaceMemberRepository : IBaseRepository<WorkspaceMember>
{
    Task<WorkspaceMember?> FindByWorkspaceAndUserAsync(Guid workspaceId, Guid userId);

    Task<IEnumerable<WorkspaceMember>> GetByWorkspaceIdAsync(Guid workspaceId);
}
