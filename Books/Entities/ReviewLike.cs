using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Entities
{
    public class ReviewLike
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public Review TargetReview { get; set; }
        public int TargetReviewId { get; set; }
    }
}