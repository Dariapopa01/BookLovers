using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public AppUser Sender { get; set; }
        public int ReviewId { get; set; }
        public string ReviewTitle { get; set; }
        public  Review Review { get; set; }
        public string Content { get; set; }
       
        public  DateTime? DateSent { get; set; }
        public DateTime CommentSent { get; set; } = DateTime.UtcNow;
        public bool SenderDeleted{ get; set; }
    }
}