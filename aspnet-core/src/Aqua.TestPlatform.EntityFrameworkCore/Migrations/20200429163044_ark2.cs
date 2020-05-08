using Microsoft.EntityFrameworkCore.Migrations;

namespace Aqua.TestPlatform.Migrations
{
    public partial class ark2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "ArkDinoEntities");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ArkMaps",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ArkDinoTypes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "ArkMaps");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ArkDinoTypes");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ArkDinoEntities",
                type: "text",
                nullable: true);
        }
    }
}
