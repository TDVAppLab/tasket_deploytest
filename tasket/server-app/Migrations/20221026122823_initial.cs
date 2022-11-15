#nullable disable

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "t_tasks",
                columns: table => new
                {
                    id_task = table.Column<Guid>(type: "TEXT", nullable: false),
                    title = table.Column<string>(type: "TEXT", nullable: true),
                    is_finish = table.Column<bool>(type: "INTEGER", nullable: false),
                    end_date_scheduled = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_tasks", x => x.id_task);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_tasks");
        }
    }
}
