namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IPermissionService
{
    Task<bool> HasPermissionAsync(Guid userId, Guid workspaceId, string permission);
}
