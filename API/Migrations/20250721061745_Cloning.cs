using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Cloning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a3ebeb2-c450-4eb4-9ff4-3b19ab762eb5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c9240284-10f9-4e4f-b191-2036ac594196");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "335756ba-1ab4-4c6f-b5e1-e9b7841b2dce", null, "User", "USER" },
                    { "ad31da34-fd6f-4815-950f-89ca209ddd1a", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "335756ba-1ab4-4c6f-b5e1-e9b7841b2dce");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad31da34-fd6f-4815-950f-89ca209ddd1a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a3ebeb2-c450-4eb4-9ff4-3b19ab762eb5", null, "User", "USER" },
                    { "c9240284-10f9-4e4f-b191-2036ac594196", null, "Admin", "ADMIN" }
                });
        }
    }
}
