import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Read } from 'src/app/_models/read';
import { Title } from 'src/app/_models/title';
import { BooksService } from 'src/app/_services/books.service';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
@Input() member?: string;
titles$:Observable<Title[]> | undefined;
titles: Title[] = [];
@Input() reading: Read[] = [];
container='Read';
  constructor(private reviewServ: ReviewsService, private bookService: BooksService) { }

  ngOnInit(): void {

    //this.titles$ = this.bookService.getTitles();
    this.loadReviews();
  }

  loadReviews() {
    if(this.member){
      this.reviewServ.getThread(this.member).subscribe({
        next: reads => this.reading  = reads
      })


    }
}}
