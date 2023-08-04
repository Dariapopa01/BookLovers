import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Review } from 'src/app/_models/review';
import {Comment} from 'src/app/_models/comment';
import { CommentsService } from 'src/app/_services/comments.service';
import { ReviewsService } from 'src/app/_services/reviews.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
reviews1:Review[] = [];
  reviews = new Review();
  pagination?: Pagination;
  container='Sent';
  pageNumber = 1;
  pageSize = 5;
  loading=false;
comments: Comment[] = [];
filter = false;
filter1 = false;



  constructor(private reviewService: ReviewsService, private commentService: CommentsService) { }

  ngOnInit(): void {
    this.loadReviews();
   // this.loadComments();
    //this.reviewService.getReviewThread(title);
  }

  loadReviews(){
    this.loading = true;
    this.reviewService.getReviews(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.reviews1 = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    })
  }

  pageChanged(event: any){

    if(this.pageNumber !== event.page) {
      this.pageNumber= event.page;
      this.loadReviews();
    }}

    loadComments() {

      this.commentService.getCommentsThread(this.reviews.content).subscribe(
        comments =>
        {
          this.comments = comments;
        }
      )


    }

    registerToggle(){
      this.filter = !this.filter;
    }
    cancelRegisterMode(event: boolean){
      this.filter = event;
    }
    registerToggle1(){
      this.filter1 = !this.filter1;
    }
    cancelRegisterMode1(event: boolean){
      this.filter1 = event;
    }

    }
