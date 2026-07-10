using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IPermissionRepository : IBaseRepository<Permission>
{
    Task<Permission?> FindByNameAsync(string name);

    Task<bool> RoleHasPermissionAsync(Guid roleId, Guid permissionId);
}
