import { Component, OnInit } from '@angular/core';

import { Pagination } from 'src/app/_models/pagination';
import { Title } from 'src/app/_models/title';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.css']
})
export class BooksReadComponent implements OnInit {
title: Title[] | undefined;
predicate = 'read';
pageNumber = 1;
pageSize = 6;
pagination : Pagination | undefined;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.loadReads();
  }

  loadReads() {
    this.booksService.getReads(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.title = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page)
    this.pageNumber = event.page;

    this.loadReads();
  }

}
