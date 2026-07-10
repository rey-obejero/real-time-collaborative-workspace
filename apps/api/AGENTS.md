# API AGENTS.md

## Project Overview

ASP.NET Core REST API (.NET 10, Clean Architecture). Backend for the Knowledge Management app.

**Architecture:** Clean Architecture with 4 layers:
- **Web** (`src/Web/`) — Controllers, middleware, HTTP concerns
- **Application** (`src/Application/`) — Business logic, commands, queries, DTOs
- **Infrastructure** (`src/Infrastructure/`) — EF Core DbContext, Identity, JWT, repo implementations
- **Domain** (`src/Domain/`) — Entities, errors, repository interfaces (contracts)

**Dependency flow:** Web → Application → Infrastructure → Domain

## Setup Commands

```bash
# Build
dotnet build src/

# Run with hot reload
dotnet watch run --project src/

# EF Core migrations
dotnet ef migrations add <Name> --project src/
dotnet ef database update --project src/
```

## Architecture Patterns

### Result Pattern

All service methods return `Result` or `Result<T>` from `Application/Result.cs`:

```csharp
// Success
return Result<T>.Success(value);

// Failure
return Result<T>.Failure(Error.NotFound("Workspace.NotFound", "Workspace not found"));
```

Controllers map Results to HTTP responses via `ResultExtensions.ToActionResult`.

### ErrorType → HTTP Status

| ErrorType | HTTP Status |
|-----------|-------------|
| `Validation` | 400 |
| `NotFound` | 404 |
| `Conflict` | 409 |
| `Forbidden` | 403 |
| `None` | 500 |

### Repository Pattern

- **Contract** defined in `Domain/Interfaces/` (e.g., `IWorkspaceRepository`)
- **Implementation** in `Infrastructure/` (e.g., `WorkspaceRepository`)
- Base CRUD via `BaseRepository<T>` in `Domain/Interfaces/`
- Registered via `InfrastructureServiceExtensions.AddInfrastructure()`

### Unit of Work

`IUnitOfWork` with `SaveChangesAsync()` wraps EF Core transactions. All mutations within a single UoW scope commit atomically.

### IUserContext

Extracts current user ID from JWT claims via `IHttpContextAccessor`. Injected into services that need to identify the requesting user.

## Code Style

- **C# conventions:** Microsoft C# Coding Conventions. PascalCase public, camelCase locals
- **Namespaces:** `KnowledgeManagementApp.Api.<Layer>.<Subfolder>`
- **Validation:** FluentValidation for request DTOs
- **Mapping:** Mapperly for object-to-object mapping
- **Logging:** Serilog
- **API docs:** NSwag for OpenAPI
- **Entity config:** EF Core `IEntityTypeConfiguration<T>` in `Infrastructure/Persistence/Configurations/`

## Repository Locations

| Layer | Interfaces | Implementations (new) | Implementations (legacy) |
|-------|------------|----------------------|-------------------------|
| Domain | `Domain/Interfaces/` | — | — |
| Infrastructure | — | `Infrastructure/Persistence/Repositories/` | `Infrastructure/Repositories/` |

New repositories (`WorkspaceMemberRepository`, `RoleRepository`) use `Infrastructure/Persistence/Repositories/`. Legacy repositories (`WorkspaceRepository`) remain in `Infrastructure/Repositories/`. This inconsistency is accepted and will be resolved in a future refactor.

## Git Conventions

- Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- Branch naming: `feature/description`, `fix/description`
