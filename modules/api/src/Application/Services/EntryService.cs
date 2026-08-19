using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Features.Workspaces;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Errors;
using KnowledgeManagementApp.Api.Domain.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Services;

public class EntryService : IEntryService
{
    private readonly IEntryRepository _entryRepository;
    private readonly IPermissionService _permissionService;
    private readonly IUnitOfWork _unitOfWork;

    public EntryService(
        IEntryRepository entryRepository,
        IPermissionService permissionService,
        IUnitOfWork unitOfWork
    )
    {
        _entryRepository = entryRepository;
        _permissionService = permissionService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<EntryResultDto>> CreateEntryAsync(
        Guid userId,
        CreateEntryRequestDto request,
        CancellationToken cancellationToken
    )
    {
        if (
            !await _permissionService.HasPermissionAsync(
                userId,
                request.WorkspaceId,
                WorkspacePermissionsConstants.EntriesCreate.Name
            )
        )
        {
            return Result<EntryResultDto>.Failure(WorkspaceMemberErrors.InsufficientPermission);
        }

        var entry = new Entry()
        {
            UserId = userId,
            WorkspaceId = request.WorkspaceId,
            Type = request.Type,
            Title = request.Title,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow,
        };
        await _entryRepository.AddAsync(entry);
        await _unitOfWork.SaveChangesAsync();

        var mapper = new EntryMapper();

        return Result<EntryResultDto>.Success(mapper.EntryToEntryResultDto(entry));
    }

    public async Task<Result<IEnumerable<EntryResultDto>>> GetEntriesAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _entryRepository.GetAllByUserIdAsync(userId);
        var mapper = new EntryMapper();
        var entries = result.Select((entry, _) => mapper.EntryToEntryResultDto(entry));
        return Result<IEnumerable<EntryResultDto>>.Success(entries);
    }

    public async Task<Result<EntryResultDto>> GetEntryAsync(
        Guid userId,
        GetEntryRequestDto request,
        CancellationToken cancellationToken = default
    )
    {
        var entry = await _entryRepository.FindByIdAsync(request.Id);
        if (entry is null)
        {
            return Result<EntryResultDto>.Failure(Error.NotFound("ENTRY_NOT_FOUND", "Entry not found."));
        }

        if (!await _permissionService.HasPermissionAsync(userId, entry.WorkspaceId, WorkspacePermissionsConstants.EntriesRead.Name))
        {
            return Result<EntryResultDto>.Failure(WorkspaceMemberErrors.InsufficientPermission);
        }

        var mapper = new EntryMapper();

        return Result<EntryResultDto>.Success(mapper.EntryToEntryResultDto(entry));
    }

    public async Task<Result> UpdateEntryAsync(
        Guid userId,
        UpdateEntryRequestDto request,
        CancellationToken cancellationToken = default
    )
    {
        var entry = await _entryRepository.FindByIdAsync(request.Id);
        if (entry is null)
        {
            return Result.Failure(Error.NotFound("ENTRY_NOT_FOUND", "Entry not found."));
        }

        if (!await _permissionService.HasPermissionAsync(userId, entry.WorkspaceId, WorkspacePermissionsConstants.EntriesUpdate.Name))
        {
            return Result.Failure(WorkspaceMemberErrors.InsufficientPermission);
        }

        entry.Type = request.Type;
        entry.Title = request.Title;
        entry.Content = request.Content;

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }
}
