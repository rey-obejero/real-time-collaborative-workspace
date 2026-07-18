namespace KnowledgeManagementApp.Api.Web.Features.Workspaces;

public record AddWorkspaceMemberRequestDto(Guid UserId, string Role);
