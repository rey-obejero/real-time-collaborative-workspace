using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Repositories;

public class PermissionRepository : BaseRepository<Permission>, IPermissionRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;

    public PermissionRepository(KnowledgeManagementAppDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Permission?> FindByNameAsync(string name)
    {
        return await _dbContext
            .Set<Permission>()
            .FirstOrDefaultAsync(permission => permission.Name == name);
    }

    public async Task<bool> RoleHasPermissionAsync(Guid roleId, Guid permissionId)
    {
        return await _dbContext
            .Set<RolePermission>()
            .AnyAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);
    }
}
