using Microsoft.EntityFrameworkCore.Migrations;

namespace DbRepository.Migrations
{
    public partial class @as : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_GenrePreference_PreferencesID",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_PreferencesID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PreferencesID",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "GenrePreference",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GenrePreference_UserID",
                table: "GenrePreference",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_GenrePreference_Users_UserID",
                table: "GenrePreference",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GenrePreference_Users_UserID",
                table: "GenrePreference");

            migrationBuilder.DropIndex(
                name: "IX_GenrePreference_UserID",
                table: "GenrePreference");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "GenrePreference");

            migrationBuilder.AddColumn<int>(
                name: "PreferencesID",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_PreferencesID",
                table: "Users",
                column: "PreferencesID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_GenrePreference_PreferencesID",
                table: "Users",
                column: "PreferencesID",
                principalTable: "GenrePreference",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
