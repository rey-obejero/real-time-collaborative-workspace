namespace KnowledgeManagementApp.Api.Application.Features.Workspaces;

public record WorkspaceMemberDto(Guid Id, Guid WorkspaceId, Guid UserId, string Role);
