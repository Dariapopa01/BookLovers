using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Helpers
{
    public class ReviewParams : PaginationParams
    {
         public string Username { get; set; }
         public string BookTitle { get; set; }
        public string Container { get; set; } = "Sent";
    }
}