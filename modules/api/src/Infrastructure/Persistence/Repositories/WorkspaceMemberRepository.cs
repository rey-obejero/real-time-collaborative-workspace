using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Repositories;

public class WorkspaceMemberRepository : BaseRepository<WorkspaceMember>, IWorkspaceMemberRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<WorkspaceMember> _dbSet;

    public WorkspaceMemberRepository(KnowledgeManagementAppDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<WorkspaceMember>();
    }

    public async Task<WorkspaceMember?> FindByWorkspaceAndUserAsync(Guid workspaceId, Guid userId)
    {
        return await _dbSet.FirstOrDefaultAsync(
            member => member.WorkspaceId == workspaceId && member.UserId == userId
        );
    }

    public async Task<IEnumerable<WorkspaceMember>> GetByWorkspaceIdAsync(Guid workspaceId)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(member => member.WorkspaceId == workspaceId)
            .ToListAsync();
    }
}
