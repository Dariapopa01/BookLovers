using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Books.Interfaces;

namespace Books.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            
        }

        public IGenreRepo GenreRepo => new GenreRepo(_context);

        public IBooks BookRepository => new BookRepository(_context, _mapper);

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public IFollowers FollowsRepository => new FollowsRepository(_context);

        public ILikes LikesRepository => new LikesRepository(_context,_mapper);

        public IRead ReadRepo => new ReadRepo(_context, _mapper);

        public IReview ReviewRepository => new ReviewRepository(_context,_mapper);

        public IReading ReadingRepository => new ReadingRepository(_context, _mapper);

        public IPhotoRepository PhotoRepository => new PhotoRepository(_context);

        public IComments CommentsRepository =>  new CommentsRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
    }
}