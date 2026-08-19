using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Errors;
using KnowledgeManagementApp.Api.Domain.Interfaces;


namespace KnowledgeManagementApp.Api.Application.Services;

public class WorkspaceService : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUserContext _userContext;
    private readonly IPermissionService _permissionService;
    private readonly IUnitOfWork _unitOfWork;

    public WorkspaceService(
        IWorkspaceRepository workspaceRepository,
        IWorkspaceMemberRepository workspaceMemberRepository,
        IRoleRepository roleRepository,
        IUserRepository userRepository,
        IUserContext userContext,
        IPermissionService permissionService,
        IUnitOfWork unitOfWork
    )
    {
        _workspaceRepository = workspaceRepository;
        _workspaceMemberRepository = workspaceMemberRepository;
        _roleRepository = roleRepository;
        _userRepository = userRepository;
        _userContext = userContext;
        _permissionService = permissionService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<WorkspaceResultDto>> CreateWorkspaceAsync(
        Guid userId,
        string name,
        CancellationToken cancellationToken
    )
    {
        if (await _workspaceRepository.FindByNameAsync(name) is not null)
        {
            return Result<WorkspaceResultDto>.Failure(WorkspaceErrors.WorkspaceNameExists);
        }

        var workspace = new Workspace() { UserId = userId, Name = name };
        await _workspaceRepository.AddAsync(workspace);

        var ownerRole = await _roleRepository.FindByNameAsync("Owner");
        if (ownerRole is null)
        {
            return Result<WorkspaceResultDto>.Failure(WorkspaceMemberErrors.RoleNotFound);
        }

        await _workspaceMemberRepository.AddAsync(
            new WorkspaceMember()
            {
                WorkspaceId = workspace.Id,
                UserId = userId,
                RoleId = ownerRole.Id,
            }
        );

        await _unitOfWork.SaveChangesAsync();

        var mapper = new WorkspaceMapper();

        return Result<WorkspaceResultDto>.Success(mapper.WorkspaceToWorkspaceResultDto(workspace));
    }

    public async Task<Result<IEnumerable<WorkspaceResultDto>>> RetrieveAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _workspaceRepository.GetAllByUserIdAsync(userId);
        var mapper = new WorkspaceMapper();

        return Result<IEnumerable<WorkspaceResultDto>>.Success(
            result.Select(workspace => mapper.WorkspaceToWorkspaceResultDto(workspace)).ToList()
        );
    }

    public async Task<Result<WorkspaceResultDto>> FindByIdAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _workspaceRepository.FindByIdAsync(id);
        if (result is null)
        {
            return Result<WorkspaceResultDto>.Failure(WorkspaceErrors.NotFound);
        }

        var mapper = new WorkspaceMapper();

        return Result<WorkspaceResultDto>.Success(mapper.WorkspaceToWorkspaceResultDto(result));
    }

    public async Task<Result<WorkspaceMemberDto>> AddWorkspaceMemberAsync(
        Guid workspaceId,
        string targetEmail,
        string role,
        CancellationToken cancellationToken = default
    )
    {
        var workspace = await _workspaceRepository.FindByIdAsync(workspaceId);
        if (workspace is null)
        {
            return Result<WorkspaceMemberDto>.Failure(WorkspaceErrors.NotFound);
        }

        var currentUserId = _userContext.UserId;

        var currentMembership = await _workspaceMemberRepository.FindByWorkspaceAndUserAsync(
            workspaceId,
            currentUserId
        );
        if (currentMembership is null)
        {
            return Result<WorkspaceMemberDto>.Failure(WorkspaceMemberErrors.UserNotMember);
        }

        if (!await _permissionService.HasPermissionAsync(currentUserId, workspaceId, WorkspacePermissionsConstants.MembersManage.Name))
        {
            return Result<WorkspaceMemberDto>.Failure(WorkspaceMemberErrors.InsufficientPermission);
        }

        var targetUser = await _userRepository.FindByEmailAsync(targetEmail);
        if (targetUser is null)
        {
            return Result<WorkspaceMemberDto>.Failure(WorkspaceMemberErrors.UserNotFound);
        }

        var existingMembership = await _workspaceMemberRepository.FindByWorkspaceAndUserAsync(
            workspaceId,
            targetUser.Id
        );
        if (existingMembership is not null)
        {
            return Result<WorkspaceMemberDto>.Failure(WorkspaceMemberErrors.AlreadyMember);
        }

        var targetRole = await _roleRepository.FindByNameAsync(role);
        if (targetRole is null)
        {
            return Result<WorkspaceMemberDto>.Failure(WorkspaceMemberErrors.RoleNotFound);
        }

        var member = new WorkspaceMember()
        {
            WorkspaceId = workspaceId,
            UserId = targetUser.Id,
            RoleId = targetRole.Id,
        };
        await _workspaceMemberRepository.AddAsync(member);

        await _unitOfWork.SaveChangesAsync();

        return Result<WorkspaceMemberDto>.Success(
            new WorkspaceMemberDto(member.Id, member.WorkspaceId, member.UserId, targetRole.Name)
        );
    }
}
