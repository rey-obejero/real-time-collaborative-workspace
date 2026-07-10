# Application Layer

Business logic orchestrator. Depends on Domain layer interfaces; has no dependency on Infrastructure.

## Result Pattern

All service methods return `Result` or `Result<T>` (defined in `Result.cs`).

### Return Types

```csharp
// Operation with no return value
public Result DoSomething(...)

// Operation returning a value
public Result<WorkspaceResultDto> CreateWorkspaceAsync(...)
```

### Creating Results

```csharp
// Success
return Result.Success();
return Result<WorkspaceResultDto>.Success(dto);

// Failure — use Error factory methods
return Result<WorkspaceResultDto>.Failure(Error.NotFound("Code", "Message"));
return Result<WorkspaceResultDto>.Failure(WorkspaceErrors.NotFound);
```

### Error Factories

| Factory | ErrorType | When to Use |
|---------|-----------|-------------|
| `Error.Validation(code, message)` | `Validation` | Invalid input, business rule violation |
| `Error.NotFound(code, message)` | `NotFound` | Resource does not exist |
| `Error.Conflict(code, message)` | `Conflict` | Duplicate, state conflict |
| `Error.Forbidden(code, message)` | `Forbidden` | Insufficient permissions |

### ErrorType → HTTP Mapping

Controllers automatically map `ErrorType` to HTTP status codes via `ResultExtensions`:

| ErrorType | HTTP Status |
|-----------|-------------|
| `Validation` | 400 Bad Request |
| `NotFound` | 404 Not Found |
| `Conflict` | 409 Conflict |
| `Forbidden` | 403 Forbidden |
| `None` | 500 Internal Server Error |

## Service Pattern

- **Interface:** `Application/Interfaces/` (e.g., `IWorkspaceService`)
- **Implementation:** `Application/Services/` (e.g., `WorkspaceService`)
- Services are injected into controllers via constructor DI
- Services take domain interfaces as constructor parameters (not infrastructure types)

## IUserContext

`IUserContext` (in `Application/Interfaces/`) provides the current authenticated user's ID. Implemented by `UserContext` in `Web/Services/` which extracts the value from JWT claims.

```csharp
public interface IUserContext
{
    Guid UserId { get; }
}
```

## Validation

FluentValidation is used for request DTO validation. Validators are registered in the DI container.

## DTOs

- **Request DTOs:** Defined in `Web/Features/<Feature>/` (controller input contracts) or `Application/Dtos/` (shared)
- **Result DTOs:** Defined in `Application/Features/<Feature>/` or `Application/Dtos/`
- Mapping between entities and DTOs uses Mapperly

## Feature Organization

```
Application/
  Features/
    Workspaces/
      Constants.cs      — Role names and other constants
      WorkspaceMemberDto.cs — Membership result DTO
  Interfaces/
    IWorkspaceService.cs
    IUserContext.cs
  Services/
    WorkspaceService.cs
  Dtos/                 — Shared DTOs
  Result.cs             — Result pattern types
```
