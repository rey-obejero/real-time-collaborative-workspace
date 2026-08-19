using System.Security.Claims;
using FluentValidation;
using KnowledgeManagementApp.Api.Application;
using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Domain.Errors;
using KnowledgeManagementApp.Api.Web.Extensions;
using KnowledgeManagementApp.Api.Web.Features.Workspaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Web.Controllers;

[ApiController()]
[Route("api/v1/workspaces")]
public class WorkspaceController : ControllerBase
{
    private readonly IWorkspaceService _workspaceService;
    private readonly IValidator<AddWorkspaceMemberRequestDto> _addMemberValidator;
    private readonly ILogger<WorkspaceController> _logger;

    public WorkspaceController(
        IWorkspaceService workspaceService,
        IValidator<AddWorkspaceMemberRequestDto> addMemberValidator,
        ILogger<WorkspaceController> logger
    )
    {
        _workspaceService = workspaceService;
        _addMemberValidator = addMemberValidator;
        _logger = logger;
    }

    [Authorize]
    [HttpPost(Name = "CreateWorkspace")]
    [ProducesResponseType<WorkspaceResultDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateWorkspace(CreateWorkspaceRequestDto request)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _workspaceService.CreateWorkspaceAsync(userId, request.Name);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Workspace creation failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<WorkspaceResultDto>(value =>
            CreatedAtRoute("CreateWorkspace", value)
        );
    }

    [Authorize]
    [HttpGet(Name = "RetrieveWorkspaces")]
    [ProducesResponseType<IEnumerable<WorkspaceResultDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RetrieveWorkspaces()
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _workspaceService.RetrieveAsync(userId);

        return result.ToActionResult<IEnumerable<WorkspaceResultDto>>(value => Ok(value));
    }

    [Authorize]
    [HttpPost("{workspaceId:Guid}/members", Name = "AddWorkspaceMember")]
    [ProducesResponseType<WorkspaceMemberDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status403Forbidden)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddWorkspaceMember(
        [FromRoute] Guid workspaceId,
        [FromBody] AddWorkspaceMemberRequestDto request
    )
    {
        var validation = await _addMemberValidator.ValidateAsync(request);
        if (!validation.IsValid)
        {
            return Result
                .Failure(Error.Validation("WorkspaceMember.Invalid", "Workspace member adding failed."))
                .ToActionResult();
        }

        var result = await _workspaceService.AddWorkspaceMemberAsync(
            workspaceId,
            request.Email,
            request.Role
        );

        return result.ToActionResult<WorkspaceMemberDto>(value =>
            StatusCode(StatusCodes.Status201Created, value)
        );
    }

    [Authorize]
    [HttpGet("{Id:Guid}", Name = "FindWorkspace")]
    [ProducesResponseType<WorkspaceResultDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RetrieveWorkspace([FromRoute] FindWorkspaceRequestDto request)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _workspaceService.FindByIdAsync(userId, request.Id);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Workspace retrieval failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<WorkspaceResultDto>(value => Ok(value));
    }
}
