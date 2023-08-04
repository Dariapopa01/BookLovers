import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Rating } from 'src/app/_models/rating';
import { Review } from 'src/app/_models/review';
import { Title } from 'src/app/_models/title';
import { BooksService } from 'src/app/_services/books.service';
import { RatingsService } from 'src/app/_services/ratings.service';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit {
  @Input() title1: Title | undefined;

  title = new Title();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] ;
  public propertyId: number;
  public mainPhotoUrl: string = null;
  reviews: Review[] = [];
  ratings: Rating[] = [];
  ratingDisplay = 0;



  constructor(private route: ActivatedRoute, private bookService: BooksService,
    private reviewService: ReviewsService, private ratingService: RatingsService) { }

  ngOnInit(): void {
    //this.loadTitles();
    // this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Title) =>{
        this.title = data['prp'];
        console.log(this.title);
      }
    );
    this.loadReviews();
    this.loadReviews();
    this.propertyId = +this.route.snapshot.params['id'];
    // this.galleryOptions = [
    //   {
    //       width: '100%',
    //       height: '465px',
    //       thumbnailsColumns: 4,
    //       imageAnimation: NgxGalleryAnimation.Slide,
    //       preview: true
    //   }
    // ];



    // this.galleryImages = this.getBookPhotos();

    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.bookService.getTitle(this.propertyId).subscribe(
    //       (data: Title) => {
    //         this.title = data;
    //       }
    //     );
    //   }
    // );

  }

//   getBookPhotos(){
//     const photoUrls = [];
//     console.log(this.title.bphotos)
//     for (const photo of this.title.bphotos) {
//             photoUrls.push(
//                 {
//                     small: photo.url,
//                     medium: photo.url,
//                     big: photo.url
//                 }
//             );}

//     return photoUrls;
// }


changePrimaryPhoto(mainPhotoUrl: string) {
  this.mainPhotoUrl = mainPhotoUrl;
}
// onRatingSet(rating: number): void {
//   if(!this.title) return;
//   this.ratingService.sendRating(this.title, this.ratingDisplay)
// }


sendRating(){
  if(!this.title) return;
  this.ratingService.sendRating(this.title.title, this.ratingDisplay).subscribe({
    next: rating => {
      this.ratings.push(rating);
    }
  })
}
loadRatings(){
  if(!this.title){
    this.ratingService.getRatingThread(this.title.title).subscribe({
      next: ratings => this.ratings = ratings
    })
  }
}
handleRating(rate: number){
  //alert(`The user selected ${rate}`);

}

  // getImages(){
  //   if(!this.title) return [];
  //   const imageUrls = [];
  //   for (const photo of this.title.photob){
  //     imageUrls.push({
  //       small: photo.urlBook,
  //       medium: photo.urlBook,
  //       big: photo.urlBook
  //     })
  //   }
  //   return imageUrls;
  // }

  loadReviews(){
    this.reviewService.getReviewThread(this.title.title).subscribe
    (reviews => {
      this.reviews = reviews;
    })
  }
}
