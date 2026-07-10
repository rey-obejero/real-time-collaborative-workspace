using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Repositories;

public class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<Role> _dbSet;

    public RoleRepository(KnowledgeManagementAppDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<Role>();
    }

    public async Task<Role?> FindByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(role => role.Name == name);
    }
}
