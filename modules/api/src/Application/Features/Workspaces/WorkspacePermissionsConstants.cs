using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Features.Workspaces;

public static class Permissions
{
    public static Permission EntriesRead = new Permission
    {
        Id = Guid.Parse("3b97e8de-04a8-4ae9-8836-997975e4b113"),
        Name = "entries:read",
    };

    public static Permission EntriesCreate = new Permission
    {
        Id = Guid.Parse("ffbce3f0-bf63-4f8a-b0d2-9d33c58faa91"),
        Name = "entries:create",
    };

    public static Permission EntriesUpdate = new Permission
    {
        Id = Guid.Parse("d6470d94-f1ed-4f16-96e5-0005b50c497c"),
        Name = "entries:update",
    };

    public static Permission EntriesDelete = new Permission
    {
        Id = Guid.Parse("4caaacd1-8765-4929-89be-b6bb71d30e9e"),
        Name = "entries:delete",
    };

    public static Permission MembersRead = new Permission
    {
        Id = Guid.Parse("6f6b9bcf-29b1-4599-af3b-de7b9ddaa7ad"),
        Name = "members:read",
    };

    public static Permission MembersManage = new Permission
    {
        Id = Guid.Parse("daa5c99f-42b2-4319-8fc9-742097361d15"),
        Name = "members:manage",
    };

    public static Permission WorkspaceManage = new Permission
    {
        Id = Guid.Parse("bd671330-80a4-4f8c-a9fb-5c7d436ca669"),
        Name = "workspace:manage",
    };

    public static Permission WorkspaceDelete = new Permission
    {
        Id = Guid.Parse("6cfc23d8-fbce-435d-960d-1c58979a5008"),
        Name = "workspace:delete",
    };
}
