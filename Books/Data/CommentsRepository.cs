using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Books.DTOs;
using Books.Entities;
using Books.Helpers;
using Books.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Books.Data
{
    public class CommentsRepository : IComments
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public CommentsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public void AddComment(Comment comment)
        {
            _context.Comments.Add(comment);
        }

        public void DeleteComment(Comment comment)
        {
            _context.Comments.Remove(comment);
        }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments
            .Include(u => u.Sender)
            .Include(u => u.Review)
            .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsThread(string reviewTitle)
        {
            var comments = await _context.Comments
            .Include(u => u.Sender).ThenInclude(p => p.Photos)
            .Include(u => u.Review)
            .Where(m => m.Review.Content == reviewTitle)
            .OrderByDescending(m => m.CommentSent)
            .ToListAsync();

            return _mapper.Map<IEnumerable<CommentDto>>(comments);
        }

        public async Task<PagedList<CreateCommentDto>> GetLikes(FollowsParams followsParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var reviews = _context.Reviews.OrderBy(u => u.Id).AsQueryable();
            var likes = _context.CommentLikes.AsQueryable();

            if(followsParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId== followsParams.UserId);
                reviews = likes.Select(like => like.TargetReview);
            }

            var likeComment = reviews.Select(user => new CreateCommentDto
            {
                ReviewTitle = user.Content,
                Content = user.Content
            });

            return await PagedList<CreateCommentDto>.CreateAsync(likeComment, followsParams.PageNumber,
            followsParams.PageSize);
        }

        public async Task<ReviewLike> GetReviewLike(int sourceUserId, int targetReviewId)
        {
            return await _context.CommentLikes.FindAsync(sourceUserId, targetReviewId);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
           return await _context.Users
           .Include(x => x.LikedReviews)
           .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}