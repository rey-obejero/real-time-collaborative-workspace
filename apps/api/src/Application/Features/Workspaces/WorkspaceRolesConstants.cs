using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Features.Workspaces;

public static class WorkspacesRoles
{
    public static Role VIEWER = new Role
    {
        Id = Guid.Parse("ab6df8d1-1dcb-443a-90f7-875a09f85bc9"),
        Name = "Viewer",
    };

    public static Role COLLABORATOR = new Role
    {
        Id = Guid.Parse("23123b2c-c866-4a81-ad0c-f46a6a064abf"),
        Name = "Collaborator",
    };

    public static Role ADMINISTRATOR = new Role
    {
        Id = Guid.Parse("66c6f395-b8b8-4d9c-9fe2-54749440997d"),
        Name = "Administrator",
    };

    public static Role OWNER = new Role
    {
        Id = Guid.Parse("6c8ca538-d3cb-46e3-bf32-1e692f16013c"),
        Name = "Owner",
    };
}
