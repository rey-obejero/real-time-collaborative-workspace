using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KnowledgeManagementApp.Api.apps.api.src.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedWorkspaceRolePermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "RolePermission",
                columns: new[] { "Id", "CreatedAt", "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { new Guid("06aa38ac-cdc9-491c-ab8e-3b9623063632"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("d6470d94-f1ed-4f16-96e5-0005b50c497c"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("1822074e-32ed-4c1e-bb2d-4df33b8c4dca"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("d6470d94-f1ed-4f16-96e5-0005b50c497c"), new Guid("23123b2c-c866-4a81-ad0c-f46a6a064abf") },
                    { new Guid("19cf2b62-49a7-43e2-b650-24dafe7a9936"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("4caaacd1-8765-4929-89be-b6bb71d30e9e"), new Guid("23123b2c-c866-4a81-ad0c-f46a6a064abf") },
                    { new Guid("1fb33824-a0d5-4be5-a14a-2709e4483485"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("3b97e8de-04a8-4ae9-8836-997975e4b113"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("33e937f3-99bb-4f94-addf-51b57ce51d92"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("4caaacd1-8765-4929-89be-b6bb71d30e9e"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("36b882ab-685d-452d-88dd-4a78ad05a305"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6f6b9bcf-29b1-4599-af3b-de7b9ddaa7ad"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("4b0e960c-a5c8-4fb7-9dff-d58b0d8a5eac"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("daa5c99f-42b2-4319-8fc9-742097361d15"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("50f13ec4-e14d-4b1f-b674-7c3b47fd2546"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("bd671330-80a4-4f8c-a9fb-5c7d436ca669"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("5fde4a63-a323-4576-8b12-1e545dddb9c3"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("daa5c99f-42b2-4319-8fc9-742097361d15"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("821eba2b-7e27-4dff-bed4-d18e499171a7"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6f6b9bcf-29b1-4599-af3b-de7b9ddaa7ad"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("931825a0-877b-41f0-8ab6-1c97115391d1"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("3b97e8de-04a8-4ae9-8836-997975e4b113"), new Guid("ab6df8d1-1dcb-443a-90f7-875a09f85bc9") },
                    { new Guid("a89dbe19-e767-4e36-bf41-41448fb51580"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ffbce3f0-bf63-4f8a-b0d2-9d33c58faa91"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("b74745b9-fd0e-4491-9b3c-933d9b9ab696"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ffbce3f0-bf63-4f8a-b0d2-9d33c58faa91"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("bab35ea7-6656-4dd6-82ec-3d52ae8520fd"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("3b97e8de-04a8-4ae9-8836-997975e4b113"), new Guid("23123b2c-c866-4a81-ad0c-f46a6a064abf") },
                    { new Guid("bce99ee3-daa7-4e3e-87bc-78d79d16e94b"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("d6470d94-f1ed-4f16-96e5-0005b50c497c"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("c19c24d4-bedd-4cb4-9796-6f88299b5f69"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("3b97e8de-04a8-4ae9-8836-997975e4b113"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("d48056fb-63ab-4d1f-b31a-7e62df40cfdc"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("4caaacd1-8765-4929-89be-b6bb71d30e9e"), new Guid("66c6f395-b8b8-4d9c-9fe2-54749440997d") },
                    { new Guid("ef3c39b9-a08e-48c6-a0c7-4df267c21f34"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("bd671330-80a4-4f8c-a9fb-5c7d436ca669"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") },
                    { new Guid("eff38bc1-1751-44da-802f-68b74204f45f"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ffbce3f0-bf63-4f8a-b0d2-9d33c58faa91"), new Guid("23123b2c-c866-4a81-ad0c-f46a6a064abf") },
                    { new Guid("fd327e95-da08-4b2f-931c-6d464a74c5f7"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6cfc23d8-fbce-435d-960d-1c58979a5008"), new Guid("6c8ca538-d3cb-46e3-bf32-1e692f16013c") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("06aa38ac-cdc9-491c-ab8e-3b9623063632"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("1822074e-32ed-4c1e-bb2d-4df33b8c4dca"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("19cf2b62-49a7-43e2-b650-24dafe7a9936"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("1fb33824-a0d5-4be5-a14a-2709e4483485"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("33e937f3-99bb-4f94-addf-51b57ce51d92"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("36b882ab-685d-452d-88dd-4a78ad05a305"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("4b0e960c-a5c8-4fb7-9dff-d58b0d8a5eac"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("50f13ec4-e14d-4b1f-b674-7c3b47fd2546"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("5fde4a63-a323-4576-8b12-1e545dddb9c3"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("821eba2b-7e27-4dff-bed4-d18e499171a7"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("931825a0-877b-41f0-8ab6-1c97115391d1"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("a89dbe19-e767-4e36-bf41-41448fb51580"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("b74745b9-fd0e-4491-9b3c-933d9b9ab696"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("bab35ea7-6656-4dd6-82ec-3d52ae8520fd"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("bce99ee3-daa7-4e3e-87bc-78d79d16e94b"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("c19c24d4-bedd-4cb4-9796-6f88299b5f69"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("d48056fb-63ab-4d1f-b31a-7e62df40cfdc"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("ef3c39b9-a08e-48c6-a0c7-4df267c21f34"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("eff38bc1-1751-44da-802f-68b74204f45f"));

            migrationBuilder.DeleteData(
                table: "RolePermission",
                keyColumn: "Id",
                keyValue: new Guid("fd327e95-da08-4b2f-931c-6d464a74c5f7"));
        }
    }
}
