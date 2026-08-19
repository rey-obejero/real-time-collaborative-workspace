using FluentValidation;
using KnowledgeManagementApp.Api.Application.Features.Workspaces;

namespace KnowledgeManagementApp.Api.Web.Features.Workspaces;

public class AddWorkspaceMemberRequestValidator : AbstractValidator<AddWorkspaceMemberRequestDto>
{
    public AddWorkspaceMemberRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Role).NotEmpty().Must(role => WorkspaceRolesConstants.AllRoleNames.Contains(role));
    }
}
