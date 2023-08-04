import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Title } from 'src/app/_models/title';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-books-liked',
  templateUrl: './books-liked.component.html',
  styleUrls: ['./books-liked.component.css']
})
export class BooksLikedComponent implements OnInit {
title: Title[] | undefined;
predicate = 'liked';
pageNumber = 1;
pageSize = 6;
pagination: Pagination | undefined;

  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.booksService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.title = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page)
    this.pageNumber = event.page;

    this.loadLikes();
  }

}
