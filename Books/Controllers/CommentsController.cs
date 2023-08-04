using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Books.DTOs;
using Books.Entities;
using Books.Extensions;
using Books.Helpers;
using Books.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Books.Controllers
{
  
    public class CommentsController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
       
        public CommentsController(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
            
        }

        [HttpPost]
        public async Task<ActionResult<CommentDto>> CreateComment(CreateCommentDto createCommentDto)
        {
            var username = User.GetUsername();
            var sender = await _uow.UserRepository.GetUserByUsernameAsync(username);
            var review = await _uow.ReviewRepository.GetReviewByContent(createCommentDto.ReviewTitle);

            if(review == null) return NotFound();

            var comment =  new Comment
            {
                Sender = sender,
                Review = review,
                SenderUsername = sender.UserName,
                ReviewTitle = review.Content,
                Content = createCommentDto.Content
            };

            _uow.CommentsRepository.AddComment(comment);
            if(await _uow.Complete()) return Ok(_mapper.Map<CommentDto>(comment));
            return BadRequest("Failed to add comment");

        }

        [HttpGet("thread/{reviewTitle}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsThread(string reviewTitle)
        {
            return Ok(await _uow.CommentsRepository.GetCommentsThread(reviewTitle));

        }

        [HttpPost("{id}")]
        public async Task<ActionResult> AddLike (int id)
        {
            var sourceUserId = User.GetUserId();
            var reviewLiked = await _uow.ReviewRepository.GetReview(id);
            var sourceUser = await _uow.CommentsRepository.GetUserWithLikes(sourceUserId);

            if(reviewLiked == null) return NotFound();

            var reviewLike = await _uow.CommentsRepository.GetReviewLike(sourceUserId, reviewLiked.Id);

            if(reviewLike !=null) return BadRequest("Already liked");

            reviewLike = new ReviewLike
            {
                SourceUserId = sourceUserId,
                TargetReviewId = reviewLiked.Id
            };
            sourceUser.LikedReviews.Add(reviewLike);
            if(await _uow.Complete()) return Ok();

            return BadRequest("Failed to like");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<CreateCommentDto>>> GetUserLikes([FromQuery]FollowsParams followsParams)
        {
            followsParams.UserId = User.GetUserId();
            var users = await _uow.CommentsRepository.GetLikes(followsParams);
            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize,
            users.TotalCount, users.TotalPage));

            return Ok(users);
        }

       
    }
}