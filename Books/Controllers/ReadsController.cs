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
    public class ReadsController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        
        public ReadsController(IUnitOfWork uow)
        {
            _uow = uow;

            
        }

        [HttpPost("{title}")]
        public async Task<ActionResult> AddRead (string title)
        { 
            var sourceUserId = User.GetUserId();
            var bookLiked = await _uow.BookRepository.GetBooksByTitleAsync(title);
            var sourceUser = await _uow.ReadRepo.GetUserWithReads(sourceUserId);

            if(bookLiked ==  null) return NotFound();

            var bookLike = await _uow.ReadRepo.GetBooksRead(sourceUserId, bookLiked.Id);

            if(bookLike != null) return BadRequest("Already liked");

            bookLike = new BooksRead
            {
                SourceUserId = sourceUserId,
                TargetBookId = bookLiked.Id
            };

            sourceUser.ReadBooks.Add(bookLike);
            if(await _uow.SaveAsync()) return Ok();

            return BadRequest("Failed to like");
            
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ReadDto>>> GetUserReads([FromQuery] FollowsParams readParams)
        {
            readParams.UserId = User.GetUserId();
            var users = await _uow.ReadRepo.GetReadsForUser(readParams);
            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage,users.PageSize,
            users.TotalCount,users.TotalPage));

            return Ok(users);

        }

    }
}