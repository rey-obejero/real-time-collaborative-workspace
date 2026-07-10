# Domain Entity FK Convention

Domain entities use primitive FK values (`Guid SomeOtherEntityId`), not
navigation properties (`SomeOtherEntity SomeOtherEntity` or Data Annotations).

FK relationships configured declaratively in
`Infrastructure/Persistence/Configurations/`, not inferred.

## Rationale

- Keeps infrastructure concerns out of Domain.
- Entity configuration classes explicitly declare FK and delete behavior (e.g., Cascade, Restrict).

## Pattern

```csharp
// Domain entity
public class SomeEntity : BaseEntity
{
    public Guid SomeOtherEntityId { get; set; }
}

// Infrastructure config
public class SomeEntityConfiguration : IEntityTypeConfiguration<SomeEntity>
{
    public void Configure(EntityTypeBuilder<SomeEntity> builder)
    {
        builder
            .HasOne<SomeOtherEntity>()
            .WithMany()
            .HasForeignKey(se => se.SomeOtherEntityId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
```
