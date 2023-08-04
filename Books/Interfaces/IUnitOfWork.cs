using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Interfaces
{
    public interface IUnitOfWork
    {
        IGenreRepo GenreRepo { get; }
        Task<bool> SaveAsync();
        IBooks BookRepository  { get; }
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get;} 
        IFollowers FollowsRepository { get; }
        ILikes LikesRepository { get; }
        IRead ReadRepo { get; }
        IReview ReviewRepository {get;}
        IReading ReadingRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IComments CommentsRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}