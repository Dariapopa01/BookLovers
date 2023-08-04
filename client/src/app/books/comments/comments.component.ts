import { NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/_services/books.service';
import { CommentsService } from 'src/app/_services/comments.service';
import { Comment } from 'src/app/_models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @ViewChild('commentForm') commentForm?: NgForm
  @Input() reviewTitle: string;
  @Input() comments: Comment[] = [];
  commentContent = '';

  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    //this.loadComments()
  }


  loadComments(){
    if(this.reviewTitle){
      this.commentService.getCommentsThread(this.reviewTitle).subscribe({
        next: comments => this.comments = comments
      })
    }
  }

  sendComment(){
    if(!this.reviewTitle) return;
    this.commentService.sendComment(this.reviewTitle, this.commentContent).subscribe({
      next: comment => {
        this.comments.push(comment);
        this.commentForm.reset();
      }
    })
  }

}
