import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/_models/rating';
import { RatingsService } from 'src/app/_services/ratings.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() maxRating = 5;
 // @Output() onRating: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('ratingForm') ratingForm?: NgForm
  @Input() title?: string;
  @Input() ratings: Rating[] = [];
  selectedRate = 0;
  maxRatingArr = [];
  previousRate = 0;

  constructor(private ratingService: RatingsService) { }

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.loadRatings()
  }

  loadRatings(){
    if(this.title){
      this.ratingService.getRatingThread(this.title).subscribe({
        next: ratings => this.ratings = ratings
      })
    }
  }

  sendRating(){
    if(!this.title) return;
    this.ratingService.sendRating(this.title, this.selectedRate).subscribe({
      next: rating => {
        this.ratings.push(rating);
        this.ratingForm?.reset();
      }
    })
  }

  handleMouseEnter(index: number){
    this.selectedRate = index + 1;
  }

  handleMouseLeave(){
    if(this.previousRate !==0){
      this.selectedRate = this.previousRate;
    }
    else  {
      this.selectedRate = 0;
    }

  }
  // rate(index: number){
  //   this.selectedRate = index + 1;
  //   this.previousRate = this.selectedRate;
  //   this.onRating.emit(this.selectedRate);
  // }

}
