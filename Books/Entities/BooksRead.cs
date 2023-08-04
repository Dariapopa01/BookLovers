using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Entities
{
    public class BooksRead
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public AppBooks TargetBook { get; set; }
        public int TargetBookId { get; set; }
    }
}