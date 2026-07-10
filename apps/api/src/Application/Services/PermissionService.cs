using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Domain.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Services;

public class PermissionService : IPermissionService
{
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository;
    private readonly IPermissionRepository _permissionRepository;

    public PermissionService(
        IWorkspaceMemberRepository workspaceMemberRepository,
        IPermissionRepository permissionRepository
    )
    {
        _workspaceMemberRepository = workspaceMemberRepository;
        _permissionRepository = permissionRepository;
    }

    public async Task<bool> HasPermissionAsync(Guid userId, Guid workspaceId, string permission)
    {
        var membership = await _workspaceMemberRepository.FindByWorkspaceAndUserAsync(
            workspaceId,
            userId
        );
        if (membership is null)
        {
            return false;
        }

        var permissionEntity = await _permissionRepository.FindByNameAsync(permission);
        if (permissionEntity is null)
        {
            return false;
        }

        return await _permissionRepository.RoleHasPermissionAsync(
            membership.RoleId,
            permissionEntity.Id
        );
    }
}
