# Web Layer

API endpoints and HTTP concerns. Depends on Application layer.

## Controllers

Controllers follow REST conventions with route prefix `/api/v1/`.

- Actions are decorated with `[Authorize]` for authenticated endpoints
- Methods extract the current user via `IUserContext` (not manual claim parsing)
- All actions return `IActionResult` using `ToActionResult` extensions

### Pattern

```csharp
[Authorize]
[HttpPost("{workspaceId:guid}/members", Name = "AddWorkspaceMember")]
[ProducesResponseType<WorkspaceMemberDto>(StatusCodes.Status201Created)]
public async Task<IActionResult> AddWorkspaceMember(AddWorkspaceMemberRequestDto request)
{
    var result = await _workspaceService.AddWorkspaceMemberAsync(
        _userContext.UserId, request.WorkspaceId, request.UserId, request.Role);

    return result.ToActionResult<WorkspaceMemberDto>(value =>
        StatusCode(StatusCodes.Status201Created, value));
}
```

## ResultExtensions

`ResultExtensions.ToActionResult()` bridges the Application Result pattern to HTTP responses.

```csharp
// For Result (no return value)
result.ToActionResult(() => Ok())

// For Result<T> (with return value)
result.ToActionResult<WorkspaceMemberDto>(value => Ok(value))
```

### Error → HTTP Mapping

| ErrorType | Response |
|-----------|----------|
| `Validation` | `400 BadRequestObjectResult(error)` |
| `NotFound` | `404 NotFoundObjectResult(error)` |
| `Conflict` | `409 ConflictObjectResult(error)` |
| `Forbidden` | `403 ObjectResult(error)` |
| `None` (fallback) | `500 ObjectResult(error)` |

## UserContext

`UserContext` (in `Web/Services/`) implements `IUserContext` from the Application layer. It reads `ClaimTypes.NameIdentifier` from the JWT token via `IHttpContextAccessor`.

```csharp
public class UserContext : IUserContext
{
    public Guid UserId => Guid.Parse(
        _httpContextAccessor.HttpContext!.User
            .FindFirst(ClaimTypes.NameIdentifier)!.Value);
}
```

Registered as Scoped in `WebServiceExtensions`.

## Request DTOs

Request DTOs (controller input contracts) live in `Web/Features/<Feature>/`. These are the types the controller accepts as `[FromBody]` parameters.

```
Web/
  Features/
    Workspaces/
      AddWorkspaceMemberRequestDto.cs
```

## Configuration

- **Auth:** JWT Bearer tokens with ASP.NET Core Identity
- **NSwag:** OpenAPI spec auto-generated; Bearer token security scheme configured
- **CORS:** AllowAnyOrigin in development
- **Route opts:** lowercase URLs enabled
