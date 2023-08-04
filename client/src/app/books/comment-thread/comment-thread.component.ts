import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/_services/comments.service';
import { Comment } from 'src/app/_models/comment';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css']
})
export class CommentThreadComponent implements OnInit {

  @Input() reviewTitle: string;
  @Input() comments: Comment[] = [];
  commentContent = '';

  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(){
    if(this.reviewTitle){
      this.commentService.getCommentsThread(this.reviewTitle).subscribe({
        next: comments => this.comments = comments
      })
    }
  }
}
