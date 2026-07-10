# Domain Layer

Innermost layer of Clean Architecture. Zero dependencies on other layers.

## Purpose

Defines enterprise business rules and core contracts. Contains:
- **Entities** — Core business objects
- **Errors** — Error types and error records for Result pattern
- **Interfaces** — Contracts for repositories (implemented in Infrastructure)

## Contracts

Repository interfaces are defined here and implemented in the Infrastructure layer.

| Interface | File | Responsibility |
|-----------|------|----------------|
| `IBaseRepository<T>` | `Interfaces/IBaseRepository.cs` | Generic CRUD (Add, GetAll, FindById, Update) |
| `IWorkspaceRepository` | `Interfaces/IWorkspaceRepository.cs` | Workspace-specific queries (FindByName, GetAllByUserId) |
| `IWorkspaceMemberRepository` | `Interfaces/IWorkspaceMemberRepository.cs` | Membership queries (FindByWorkspaceAndUser, GetByWorkspaceId) |
| `IRoleRepository` | `Interfaces/IRoleRepository.cs` | Role lookup (FindByName) |
| `IEntryRepository` | `Interfaces/IEntryRepository.cs` | Entry queries |
| `IUserRepository` | `Interfaces/IUserRepository.cs` | User queries |
| `IUnitOfWork` | `Interfaces/IUnitOfWork.cs` | Transaction boundary |

Implementations are in `Infrastructure/Repositories/` (legacy) or `Infrastructure/Persistence/Repositories/` (new).

## Entities

| Entity | File | Key Fields |
|--------|------|------------|
| `BaseEntity` | `Entities/BaseEntity.cs` | `Id`, `CreatedAt`, `UpdatedAt` |
| `User` | `Entities/User.cs` | Identity properties |
| `Workspace` | `Entities/Workspace.cs` | `UserId`, `Name` |
| `Entry` | `Entities/Entry.cs` | Workspace content |
| `WorkspaceMember` | `Entities/WorkspaceMember.cs` | `WorkspaceId`, `UserId`, `RoleId` |
| `Role` | `Entities/Role.cs` | `Name` |

## Errors

Errors define failure states returned via the Result pattern.

| Error | Type | Usage |
|-------|------|-------|
| `Error.Validation()` | `Validation` | Invalid input |
| `Error.NotFound()` | `NotFound` | Resource not found |
| `Error.Conflict()` | `Conflict` | Duplicate / state conflict |
| `Error.Forbidden()` | `Forbidden` | Insufficient permissions |
| `WorkspaceErrors` | — | Workspace-specific failures |
| `WorkspaceMemberErrors` | — | Membership-specific failures |

Custom error classes use the `Error` record and `ErrorType` enum. Controllers map `ErrorType` to HTTP status codes.
