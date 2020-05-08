using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Aqua.TestPlatform.Migrations
{
    public partial class ark1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArkMaps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArkMaps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArkDinoTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ArkMapId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArkDinoTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArkDinoTypes_ArkMaps_ArkMapId",
                        column: x => x.ArkMapId,
                        principalTable: "ArkMaps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArkDinoEntities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Level = table.Column<int>(nullable: false),
                    X = table.Column<int>(nullable: false),
                    Y = table.Column<int>(nullable: false),
                    ArkDinoTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArkDinoEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArkDinoEntities_ArkDinoTypes_ArkDinoTypeId",
                        column: x => x.ArkDinoTypeId,
                        principalTable: "ArkDinoTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArkDinoEntities_ArkDinoTypeId",
                table: "ArkDinoEntities",
                column: "ArkDinoTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ArkDinoTypes_ArkMapId",
                table: "ArkDinoTypes",
                column: "ArkMapId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArkDinoEntities");

            migrationBuilder.DropTable(
                name: "ArkDinoTypes");

            migrationBuilder.DropTable(
                name: "ArkMaps");
        }
    }
}
