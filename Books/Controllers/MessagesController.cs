using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Books.DTOs;
using Books.Entities;
using Books.Extensions;
using Books.Helpers;
using Books.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Books.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
     
        public MessagesController(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
           
            
        }   
        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();
            if (username == createMessageDto.RecipientUsername.ToLower())
                return BadRequest("Cannot send messages");

            var sender = await _uow.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await _uow.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);
            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };
            _uow.MessageRepository.AddMessage(message);
            if (await _uow.SaveAsync()) return Ok(_mapper.Map<MessageDto>(message));
            return BadRequest("Failed to send message");

        }

         [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>>  GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username=User.GetUsername();
            var messages = await _uow.MessageRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage,
             messages.PageSize,
             messages.TotalCount, messages.TotalPage));
            return messages;
        }
        
       
          [HttpDelete("{id}")]     
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username=User.GetUsername();

            var message= await _uow.MessageRepository.GetMessage(id);

            if(message.Sender.UserName != username && message.Recipient.UserName != username) return Unauthorized();

            if(message.Sender.UserName == username) message.SenderDeleted = true;

            if(message.Recipient.UserName == username) message.RecipientDeleted = true;

            if(message.SenderDeleted && message.RecipientDeleted) _uow.MessageRepository.DeleteMessage(message);

            if(await _uow.SaveAsync()) return Ok();

            return BadRequest("Problem deleting message");  
        }
    }
}