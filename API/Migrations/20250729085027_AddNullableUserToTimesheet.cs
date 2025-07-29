using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddNullableUserToTimesheet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c9f8851-5393-48df-bc75-c8f9a909584a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eafb1381-1a86-4281-af41-14d33fa228e3");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Timesheets",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2b8bcd0c-058d-41f2-9ec0-adce06cfa74f", null, "Admin", "ADMIN" },
                    { "86bad6d1-b531-4d4b-b0f0-5cdc5c6af15c", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_UserId",
                table: "Timesheets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheets_AspNetUsers_UserId",
                table: "Timesheets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Timesheets_AspNetUsers_UserId",
                table: "Timesheets");

            migrationBuilder.DropIndex(
                name: "IX_Timesheets_UserId",
                table: "Timesheets");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2b8bcd0c-058d-41f2-9ec0-adce06cfa74f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "86bad6d1-b531-4d4b-b0f0-5cdc5c6af15c");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Timesheets");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0c9f8851-5393-48df-bc75-c8f9a909584a", null, "User", "USER" },
                    { "eafb1381-1a86-4281-af41-14d33fa228e3", null, "Admin", "ADMIN" }
                });
        }
    }
}
