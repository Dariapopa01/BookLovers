using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.DTOs
{
    public class CreateCommentDto
    {
         public string ReviewTitle { get; set; }
        public string Content { get; set; }
    }
}