# Infrastructure Layer

External concerns: database, authentication, JWT. Depends on Domain layer; implements Domain interfaces.

## Purpose

Houses implementations of contracts defined in the Domain layer. Contains:
- **EF Core DbContext** — Database access
- **Repository implementations** — Domain interface implementations
- **Identity & Auth** — ApplicationUser, JWT token service, ASP.NET Core Identity integration
- **Entity Configurations** — EF Core `IEntityTypeConfiguration<T>` classes

## Contract → Implementation Mapping

Contracts defined in `Domain/Interfaces/` are implemented in `Infrastructure/`.

| Domain Contract | Implementation | Location |
|----------------|---------------|----------|
| `IUnitOfWork` | `UnitOfWork` | `Infrastructure/Persistence/UnitOfWork.cs` |
| `IUserRepository` | `UserRepository` | `Infrastructure/Repositories/` |
| `IWorkspaceRepository` | `WorkspaceRepository` | `Infrastructure/Repositories/` |
| `IEntryRepository` | `EntryRepository` | `Infrastructure/Repositories/` |
| `IWorkspaceMemberRepository` | `WorkspaceMemberRepository` | `Infrastructure/Persistence/Repositories/` |
| `IRoleRepository` | `RoleRepository` | `Infrastructure/Persistence/Repositories/` |
| `IIdentityService` | `IdentityService` | `Infrastructure/Auth/` |
| `IJwtTokenService` | `JwtTokenService` | `Infrastructure/Auth/` |

**Note:** Repository locations follow a transitional pattern. Legacy repos use `Infrastructure/Repositories/`; newer repos use `Infrastructure/Persistence/Repositories/`. This inconsistency will be resolved in a future refactor.

## DbContext

`KnowledgeManagementAppDbContext` inherits from `IdentityDbContext<ApplicationUser>` for ASP.NET Core Identity integration.

- Entity type configurations applied via `ApplyConfigurationsFromAssembly()`
- No explicit `DbSet<T>` properties — entities registered through configuration classes

## Entity Configurations

Configuration classes in `Infrastructure/Persistence/Configurations/` use `IEntityTypeConfiguration<T>` to define:

| Configuration | Entity | Key Constraints |
|--------------|--------|----------------|
| `RoleConfiguration` | `Role` | Unique index on `Name` |
| `WorkspaceMemberConfiguration` | `WorkspaceMember` | Composite unique on `(WorkspaceId, UserId)`; FK to Role with `DeleteBehavior.Restrict` |

## Identity & Auth

- **ApplicationUser** — Custom Identity user class
- **IdentityRole** — ASP.NET Core Identity roles (not the application Role entity)
- **JwtTokenService** — Token generation with configurable issuer/audience/secret

## DI Registration

All infrastructure services are registered via `InfrastructureServiceExtensions.AddInfrastructure()`:

- DbContext (Scoped)
- Identity + JWT services (Scoped)
- All repositories (Scoped)
- JWT options (Configure)

```csharp
services.AddScoped<IWorkspaceRepository, WorkspaceRepository>();
```
