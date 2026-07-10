using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IRoleRepository : IBaseRepository<Role>
{
    Task<Role?> FindByNameAsync(string name);
}
