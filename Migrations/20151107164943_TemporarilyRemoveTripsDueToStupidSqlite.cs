using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace pubtrip_redux.Migrations
{
    public partial class TemporarilyRemoveTripsDueToStupidSqlite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Trip");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trip",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    PubId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trip", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trip_Pub_PubId",
                        column: x => x.PubId,
                        principalTable: "Pub",
                        principalColumn: "Id");
                });
        }
    }
}
