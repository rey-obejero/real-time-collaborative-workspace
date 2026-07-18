using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KnowledgeManagementApp.Api.apps.api.src.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixRolesSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "CreatedAt", "Name" },
                values: new object[,]
                {
                    { new Guid("23123b2c-c866-4a81-ad0c-f46a6a064abf"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Collaborator" },
                    { new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator" },
                    { new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Owner" },
                    { new Guid("ab6df8d1-1dcb-443a-90f7-875a09f85bc9"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Viewer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("23123b2c-c866-4a81-ad0c-f46a6a064abf"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c"));

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: new Guid("ab6df8d1-1dcb-443a-90f7-875a09f85bc9"));

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
    }
}
