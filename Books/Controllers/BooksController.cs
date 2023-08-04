using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Books.Data;
using Books.DTOs;
using Books.Entities;
using Books.Extensions;
using Books.Helpers;
using Books.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Books.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
 //   [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class BooksController : ControllerBase
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;


        public BooksController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
           
            _photoService = photoService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
           
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<BookDto>>> GetBooks([FromQuery] BookParams bookParams, int? genreId)
        {
            var books = await _unitOfWork.BookRepository.GetBooksAsync(bookParams,genreId);
            Response.AddPaginationHeader(new PaginationHeader(books.CurrentPage,books.PageSize,books.TotalCount,
            books.TotalPage));
          
            return Ok(books);
        }

         [HttpGet("detail/{title}")]
       
        public async Task<ActionResult<BookDto>> GetBookDetail(string title)
        {
            return await _unitOfWork.BookRepository.GetTitleAsync(title);
            // var books = await _unitOfWork.BookRepository.GetBookDetailAsync(id);
            // var booksDto = _mapper.Map<BookDto>(books);

            // var averageVote = 0.0;
            // var userVote = 0;

            // if(await _context.Ratings.AnyAsync(x => x.BookId == id))
            // {
            //     averageVote = await _context.Ratings.Where(x => x.BookId == id)
            //         .AverageAsync(x => x.Rate);

            //     if (HttpContext.User.Identity.IsAuthenticated)
            //     {
            //           var username = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "nameId").Value;   
            //           var user = await _userManager.FindByNameAsync(username);
            //           var userId = user.Id;

            //           var ratingDb = await _context.Ratings.FirstOrDefaultAsync(x => x.BookId == id && 
            //                 x.UserId == userId);

            //           if (ratingDb != null)
            //           {
            //             userVote = ratingDb.Rate;
            //           }
            //     }
            // }

            // booksDto.AverageVote = averageVote;
            // booksDto.UserVote = userVote;

            //return Ok(booksDto);
        }

        
        [HttpPost("add/photo/{bookId}")]
        
        public async Task<ActionResult<BookPhotoDto>> AddPhoto(IFormFile file, int bookId)
        {
            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null)
                return BadRequest(result.Error.Message);
          

            var property = await _unitOfWork.BookRepository.GetBooksByIdAsync(bookId);

            // if (property.PostedBy != userId)
            //     return BadRequest("You are not authorised to upload photo for this property");

            var photo = new BookPhoto
            {
                UrlBook = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (property.BPhotos.Count == 0)
            {
                photo.IsMain = true;
            }

            property.BPhotos.Add(photo);
            if (await _unitOfWork.SaveAsync()) return _mapper.Map<BookPhotoDto>(photo);

            return BadRequest("Some problem occured in uploading photo..");
        }

         [HttpPost("set-main-photo/{photoId}/{id}")]
        public async Task<IActionResult> SetMainPhoto(int photoId, int id)
        {
           var book = await _unitOfWork.BookRepository.GetBooksByIdAsync(photoId);

            var photo = book.BPhotos.FirstOrDefault(p => p.Id == id);

            if (photo == null)
                return BadRequest("No such property or photo exists");

            if (photo.IsMain)
                return BadRequest("This is already a primary photo");


            var currentPrimary = book.BPhotos.FirstOrDefault(p => p.IsMain);
            if (currentPrimary != null) currentPrimary.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.SaveAsync()) return NoContent();

            return BadRequest("Failed to set primary photo");
            
        }

        [HttpDelete("delete-photo/{photoId}/{id}")]
        public async Task<ActionResult> DeletePhoto(int photoId, int id)
        {
            var book = await _unitOfWork.BookRepository.GetBooksByIdAsync(photoId);

            var photo = book.BPhotos.FirstOrDefault(x => x.Id == id);

            if(photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("you cannot delete your main photo");

            if(photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);

            }
            book.BPhotos.Remove(photo);

            if (await _unitOfWork.SaveAsync()) return Ok();
            return BadRequest("Problem deleting photo");
        }
        



        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks()
        // {
        //     var books = await _booksRepository.GetTitlesAsync();
           

        //     return Ok(books);

        // }

        // [HttpGet("{title}")] //title of books
        // public async Task<ActionResult<BookDto>> GetBook(string title)
        // {
        //    var book =   await _booksRepository.GetTitleAsync(title);
        //   return  _mapper.Map<BookDto>(book);
           
        // }
       
        //  [HttpPost("add")] //POST : api/account/register
        // public async Task<ActionResult<BookDto>> AddBook(AddBookDto addDto)
        // {
        //     if(await BookExists(addDto.Title)) return BadRequest("Book already exists");

        //     var book = _mapper.Map<AppBooks>(addDto);

        //     book.Title = addDto.Title.ToLower();

        //     _context.BooksTable.Add(book);
        //     await _context.SaveChangesAsync();
           
             
        //     return new BookDto
        //     {
        //         Title = book.Title,
        //         Author = book.Author,
        //         Genre = book.Genre.Name,
        //         Description = book.Description,
                
        //     };
    
        // }
        // private async Task<bool> BookExists(string title)
        // {
        //     return await _context.BooksTable.AnyAsync(x => x.Title == title.ToLower());//x refers to the Users method
        // }

        

       

        // [HttpDelete("delete-photo/{title}/{photoId}")]
        // public async Task<ActionResult> DeletePhoto(int photoId, string title)
        // {
        //     var book = await _booksRepository.GetBookByTitleAsync(title);

        //     var photo = book.BPhotos.FirstOrDefault(x => x.Id == photoId);

        //     if(photo == null) return NotFound();

        //     if (photo.IsMain) return BadRequest("you cannot delete your main photo");

        //     // if(photo.PublicIdBook != null)
        //     // {
        //     //     var result = await this.photoService.DeletePhotoAsync(photo.PublicIdBook);
        //     //     if(result.Error != null) return BadRequest(result.Error.Message);

        //     // }
        //     // book.BPhotos.Remove(photo);

        //     if (await _booksRepository.SaveAllAsync()) return Ok();
        //     return BadRequest("Problem deleting photo");
        // }

        //  [HttpPut]
        // public async Task<ActionResult> UpdateBook(BookUpdateDto bookUpdateDto, string title)
        // {
            
        //     var book = await _booksRepository.GetBookByTitleAsync(title);
        //     if (book == null) return NotFound();

        //     _mapper.Map(bookUpdateDto, book);

        //     if(await _booksRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to update user");
        // }




        
        
    }
}