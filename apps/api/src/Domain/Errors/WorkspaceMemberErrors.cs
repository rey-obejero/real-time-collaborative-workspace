namespace KnowledgeManagementApp.Api.Domain.Errors;

public static class WorkspaceMemberErrors
{
    public static Error UserNotMember = Error.NotFound(
        "USER_NOT_MEMBER",
        "User is not a member of the workspace."
    );

    public static Error AlreadyMember = Error.Conflict(
        "ALREADY_MEMBER",
        "User is already a member of the workspace."
    );

    public static Error RoleNotFound = Error.NotFound(
        "WORKSPACE_ROLE_NOT_FOUND",
        "Specified role does not exist."
    );

    public static Error InsufficientPermission = Error.Forbidden(
        "INSUFFICIENT_PERMISSION",
        "You do not have permission to perform this action."
    );
}
