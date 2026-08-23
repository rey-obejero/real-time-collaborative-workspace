using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Services;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Errors;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.UnitTests.Fakes;
using NSubstitute;

namespace KnowledgeManagementApp.Api.UnitTests;

public class WorkspaceServiceTests
{
    private readonly IWorkspaceRepository _workspaceRepository =
        Substitute.For<IWorkspaceRepository>();
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository =
        Substitute.For<IWorkspaceMemberRepository>();
    private readonly IRoleRepository _roleRepository = Substitute.For<IRoleRepository>();
    private readonly IUserRepository _userRepository = Substitute.For<IUserRepository>();
    private readonly UserContextFake _userContext = new();
    private readonly IPermissionService _permissionService = Substitute.For<IPermissionService>();
    private readonly IUnitOfWork _unitOfWork = Substitute.For<IUnitOfWork>();

    private readonly WorkspaceService _service;

    public WorkspaceServiceTests()
    {
        _service = new WorkspaceService(
            _workspaceRepository,
            _workspaceMemberRepository,
            _roleRepository,
            _userRepository,
            _userContext,
            _permissionService,
            _unitOfWork
        );
    }

    [Fact]
    public async Task AddWorkspaceMemberAsync_WithValidInput_ReturnsSuccess()
    {
        var workspaceId = Guid.NewGuid();
        var currentUserId = Guid.NewGuid();
        var targetUserId = Guid.NewGuid();
        var targetEmail = "member@example.com";
        var roleName = "Collaborator";

        _userContext.UserId = currentUserId;

        _workspaceRepository
            .FindByIdAsync(workspaceId)
            .Returns(new Workspace { Id = workspaceId, Name = "Workspace" });
        _workspaceMemberRepository
            .FindByWorkspaceAndUserAsync(workspaceId, currentUserId)
            .Returns(new WorkspaceMember { WorkspaceId = workspaceId, UserId = currentUserId });
        _permissionService
            .HasPermissionAsync(
                currentUserId,
                workspaceId,
                WorkspacePermissionsConstants.MembersManage.Name
            )
            .Returns(true);
        _userRepository
            .FindByEmailAsync(targetEmail)
            .Returns(new User { Id = targetUserId, Email = targetEmail });
        _workspaceMemberRepository
            .FindByWorkspaceAndUserAsync(workspaceId, targetUserId)
            .Returns((WorkspaceMember?)null);
        _roleRepository.FindByNameAsync(roleName).Returns(new Role { Name = roleName });

        var result = await _service.AddWorkspaceMemberAsync(workspaceId, targetEmail, roleName);

        Assert.True(result.IsSuccess);
        Assert.Equal(targetUserId, result.Value.UserId);
        Assert.Equal(roleName, result.Value.Role);
        await _workspaceMemberRepository.Received(1).AddAsync(Arg.Any<WorkspaceMember>());
        await _unitOfWork.Received(1).SaveChangesAsync();
    }

    [Fact]
    public async Task AddWorkspaceMemberAsync_WithoutManagePermission_ReturnsInsufficientPermission()
    {
        var workspaceId = Guid.NewGuid();
        var currentUserId = Guid.NewGuid();

        _userContext.UserId = currentUserId;
        _workspaceRepository
            .FindByIdAsync(workspaceId)
            .Returns(new Workspace { Id = workspaceId, Name = "Workspace" });
        _workspaceMemberRepository
            .FindByWorkspaceAndUserAsync(workspaceId, currentUserId)
            .Returns(new WorkspaceMember { WorkspaceId = workspaceId, UserId = currentUserId });
        _permissionService
            .HasPermissionAsync(
                currentUserId,
                workspaceId,
                WorkspacePermissionsConstants.MembersManage.Name
            )
            .Returns(false);

        var result = await _service.AddWorkspaceMemberAsync(
            workspaceId,
            "member@example.com",
            "Collaborator"
        );

        Assert.True(result.IsFailure);
        Assert.Equal(WorkspaceMemberErrors.InsufficientPermission, result.Error);
        await _unitOfWork.DidNotReceive().SaveChangesAsync();
    }
}
