using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddClientAllocationToClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "14ce6d9a-5cd3-4a2d-bc5d-0cdcf9071d10");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30958f9d-d5ed-426d-b10f-feaca9b2bb4b");

            migrationBuilder.AddColumn<string>(
                name: "ClientAllocation",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0c9f8851-5393-48df-bc75-c8f9a909584a", null, "User", "USER" },
                    { "eafb1381-1a86-4281-af41-14d33fa228e3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c9f8851-5393-48df-bc75-c8f9a909584a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eafb1381-1a86-4281-af41-14d33fa228e3");

            migrationBuilder.DropColumn(
                name: "ClientAllocation",
                table: "Clients");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "14ce6d9a-5cd3-4a2d-bc5d-0cdcf9071d10", null, "User", "USER" },
                    { "30958f9d-d5ed-426d-b10f-feaca9b2bb4b", null, "Admin", "ADMIN" }
                });
        }
    }
}
