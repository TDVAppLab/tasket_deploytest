#nullable disable

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "t_tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "end_date_actual",
                table: "t_tasks",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "t_tasks");

            migrationBuilder.DropColumn(
                name: "end_date_actual",
                table: "t_tasks");
        }
    }
}
