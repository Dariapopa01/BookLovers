using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Books.Data.Migrations
{
    /// <inheritdoc />
    public partial class LikesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CommentLikes",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    TargetReviewId = table.Column<int>(type: "INTEGER", nullable: false),
                    AppBooksId = table.Column<int>(type: "INTEGER", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentLikes", x => new { x.SourceUserId, x.TargetReviewId });
                    table.ForeignKey(
                        name: "FK_CommentLikes_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommentLikes_AspNetUsers_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommentLikes_BooksTable_AppBooksId",
                        column: x => x.AppBooksId,
                        principalTable: "BooksTable",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommentLikes_Reviews_TargetReviewId",
                        column: x => x.TargetReviewId,
                        principalTable: "Reviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentLikes_AppBooksId",
                table: "CommentLikes",
                column: "AppBooksId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentLikes_AppUserId",
                table: "CommentLikes",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentLikes_TargetReviewId",
                table: "CommentLikes",
                column: "TargetReviewId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentLikes");
        }
    }
}
