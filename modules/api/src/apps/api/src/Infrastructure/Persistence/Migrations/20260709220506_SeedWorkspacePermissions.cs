using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KnowledgeManagementApp.Api.apps.api.src.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedWorkspacePermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Permission",
                columns: new[] { "Id", "CreatedAt", "Name" },
                values: new object[,]
                {
                    { new Guid("3b97e8de-04a8-4ae9-8836-997975e4b113"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "entries:read" },
                    { new Guid("4caaacd1-8765-4929-89be-b6bb71d30e9e"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "entries:delete" },
                    { new Guid("6cfc23d8-fbce-435d-960d-1c58979a5008"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "workspace:delete" },
                    { new Guid("6f6b9bcf-29b1-4599-af3b-de7b9ddaa7ad"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "members:read" },
                    { new Guid("bd671330-80a4-4f8c-a9fb-5c7d436ca669"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "workspace:manage" },
                    { new Guid("d6470d94-f1ed-4f16-96e5-0005b50c497c"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "entries:update" },
                    { new Guid("daa5c99f-42b2-4319-8fc9-742097361d15"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "members:manage" },
                    { new Guid("ffbce3f0-bf63-4f8a-b0d2-9d33c58faa91"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "entries:create" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("3b97e8de-04a8-4ae9-8836-997975e4b113"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("4caaacd1-8765-4929-89be-b6bb71d30e9e"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("6cfc23d8-fbce-435d-960d-1c58979a5008"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("6f6b9bcf-29b1-4599-af3b-de7b9ddaa7ad"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("bd671330-80a4-4f8c-a9fb-5c7d436ca669"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("d6470d94-f1ed-4f16-96e5-0005b50c497c"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("daa5c99f-42b2-4319-8fc9-742097361d15"));

            migrationBuilder.DeleteData(
                table: "Permission",
                keyColumn: "Id",
                keyValue: new Guid("ffbce3f0-bf63-4f8a-b0d2-9d33c58faa91"));
        }
    }
}
