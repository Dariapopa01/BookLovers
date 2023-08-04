import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/_models/review';
import { RatingsService } from 'src/app/_services/ratings.service';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-review-thread',
  templateUrl: './review-thread.component.html',
  styleUrls: ['./review-thread.component.css']
})
export class ReviewThreadComponent implements OnInit {

  @Input() title?: string;
  // @Input() username?: string;
   @Input() reviews: Review[] = [];

   ratingSelected = 0;
   reviewContent = '';
  constructor(private reviewService: ReviewsService, private ratingService: RatingsService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    if(this.title){
      this.reviewService.getReviewThread(this.title).subscribe({
        next: reviews => this.reviews  = reviews
      })


    }
  }

}
