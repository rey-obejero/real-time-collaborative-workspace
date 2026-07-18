using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleModelManagedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "CreatedAt", "Name" },
                values: new object[,]
                {
                    { new Guid("3fe7d464-5f70-4028-9be1-6e4759849c18"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Viewer" },
                    { new Guid("407cc258-6c26-4749-be3f-490e775fb230"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator" },
                    { new Guid("5328d63b-dbf3-4ab6-88d8-e80796ebc5fa"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Collaborator" },
                    { new Guid("a8a2c0f5-90be-4e3b-8f0c-00de603eadc9"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Owner" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("3fe7d464-5f70-4028-9be1-6e4759849c18"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("407cc258-6c26-4749-be3f-490e775fb230"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("5328d63b-dbf3-4ab6-88d8-e80796ebc5fa"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("a8a2c0f5-90be-4e3b-8f0c-00de603eadc9"));
        }
    }
}
