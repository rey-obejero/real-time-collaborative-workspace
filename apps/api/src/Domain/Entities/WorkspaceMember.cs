namespace KnowledgeManagementApp.Api.Domain.Entities;

public class WorkspaceMember : BaseEntity
{
    public Guid WorkspaceId { get; set; }
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }
}
