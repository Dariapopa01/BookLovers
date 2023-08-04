using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Books.DTOs;
using Books.Entities;
using Books.Extensions;
using Books.Helpers;
using Books.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Books.Controllers
{
    public class FavoriteController : BaseApiController
    {
        
        private readonly IUnitOfWork _uow;
        public FavoriteController(IUnitOfWork uow)
        {
          
          _uow = uow;
            
        }

        [HttpPost("{title}")]
        public async Task<ActionResult> AddLike (string title)
        { 
            var sourceUserId = User.GetUserId();
            var bookLiked = await _uow.BookRepository.GetBooksByTitleAsync(title);
            var sourceUser = await _uow.LikesRepository.GetUserWithLikes(sourceUserId);

            if(bookLiked ==  null) return NotFound();

            var bookLike = await _uow.LikesRepository.GetBookLike(sourceUserId, bookLiked.Id);

            if(bookLike != null) return BadRequest("Already liked");

            bookLike = new FavoriteBook
            {
                SourceUserId = sourceUserId,
                TargetBookId = bookLiked.Id
            };

            sourceUser.LikedBooks.Add(bookLike);
            if(await _uow.SaveAsync()) return Ok();

            return BadRequest("Failed to like");
            
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery] FollowsParams likeParams)
        {
            likeParams.UserId = User.GetUserId();
            var users = await _uow.LikesRepository.GetUserLikes(likeParams);
            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage,users.PageSize,
            users.TotalCount,users.TotalPage));

            return Ok(users);

        }
        [HttpGet("thread/{username}")]//review carte de la utilizator conectat
         public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikeThread(string title, string username)
        {
            var currentUsername = User.GetUsername();
            return Ok(await _uow.LikesRepository.GetLikesThread(title, username));
        } 

        
    }
}