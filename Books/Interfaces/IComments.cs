using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Books.DTOs;
using Books.Entities;
using Books.Helpers;

namespace Books.Interfaces
{
    public interface IComments
    {
        void AddComment(Comment comment);
        void DeleteComment(Comment comment);
        Task<Comment> GetComment(int id);
        Task<IEnumerable<CommentDto>> GetCommentsThread(string reviewTitle);
        Task<ReviewLike> GetReviewLike(int sourceUserId, int targetReviewId);
        Task<PagedList<CreateCommentDto>> GetLikes(FollowsParams followsParams);
        Task<AppUser> GetUserWithLikes(int userId);
    }
}