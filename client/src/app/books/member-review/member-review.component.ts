import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/_models/rating';
import { Review } from 'src/app/_models/review';
import { RatingsService } from 'src/app/_services/ratings.service';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-member-review',
  templateUrl: './member-review.component.html',
  styleUrls: ['./member-review.component.css']
})
export class MemberReviewComponent implements OnInit {

  @ViewChild('reviewForm') reviewForm?: NgForm
  @Input() title?: string;
 // @Input() username?: string;
  @Input() reviews: Review[] = [];

  ratingSelected = 0;
  reviewContent = '';



  constructor(private reviewService: ReviewsService, private ratingService: RatingsService) { }

  ngOnInit(): void {
    // this.loadReviews();
  }

  loadReviews() {
    if(this.title){
      this.reviewService.getReviewThread(this.title).subscribe({
        next: reviews => this.reviews  = reviews
      })


    }
  }

  sendReview(){
    if(!this.title) return;
    this.reviewService.sendReview(this.title, this.reviewContent,this.ratingSelected).subscribe({
      next: review => {
        this.reviews.push(review);
        this.reviewForm?.reset();
      }
    })



  }

}
