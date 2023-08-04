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
    public class FollowersController : BaseApiController
    {
       
        private readonly IUnitOfWork _unitOfWork;

        public FollowersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddFollow( string username)
        {
            var sourceUserId = User.GetUserId();
            var followedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _unitOfWork.FollowsRepository.GetUserWithFollows(sourceUserId);

            if(followedUser == null) return NotFound();

            if(sourceUser.UserName == username) return BadRequest("You can't follow yourself");
           
            var userFollow = await _unitOfWork.FollowsRepository.GetUserFollow(sourceUserId, followedUser.Id);

            if(userFollow != null) return BadRequest("already followed");

            userFollow = new UserFollow
            {
                SourceUserId = sourceUserId,
                TargetUserId = followedUser.Id
            };

            sourceUser.FollowedUsers.Add(userFollow);

            if(await _unitOfWork.SaveAsync()) return Ok();

            return BadRequest("Failed to follow");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<FollowDto>>> GetUserFollowers([FromQuery]FollowsParams followsParams)
        {

            followsParams.UserId = User.GetUserId();
            var users = await _unitOfWork.FollowsRepository.GetUsersFollows(followsParams);
            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage,
             users.PageSize,
             users.TotalCount, users.TotalPage));
            return Ok(users);
        }

    }
}