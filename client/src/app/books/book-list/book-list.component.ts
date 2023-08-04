import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BookParams } from 'src/app/_models/bookParams';
import { Genres } from 'src/app/_models/genres';
import { Pagination } from 'src/app/_models/pagination';
import { SearchPara } from 'src/app/_models/searchPara';
import { Title } from 'src/app/_models/title';
import { BooksService } from 'src/app/_services/books.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  books : any;
  titles: Title[] = [];
  titles$:Observable<Title[]> | undefined;
  registerMode =false;
  genres: Genres[];
  pagination: Pagination;
  bookParams: BookParams;
  searchParams: SearchPara;
  pageNumber = 1;
pageSize = 12;
genreIdSelected = 1;
baseUrl = environment.apiUrl;


  constructor(private http : HttpClient, private bookService: BooksService) { }

  ngOnInit(): void {
   
    this.loadBooks();
    this.getGenre();
  }
  onGenreSelected(genreId: number){
    this.genreIdSelected = genreId;
    this.loadBooks();

  }


  loadBooks(){
    this.bookService.getBooks(this.pageNumber, this.pageSize, this.genreIdSelected).subscribe({
      next: response => {
        this.titles = response.result;
        this.pagination = response.pagination;
      }
    })
  }



    // if(this.titles)
    // {
    //   this.bookService.setUserParams(this.bookParams);
    //   this.bookService.getTitles(this.bookParams).subscribe({
    //     next: response => {
    //       if(response.result && response.pagination) {
    //         this.titles = response.result;
    //         this.pagination = response.pagination;
    //       }
    //     }
    //   })
    // }
    // this.bookService.getTitles(this.pageNumber, this.pageSize).subscribe({
    //   next: response => {
    //     this.titles = response.result;
    //     this.pagination = response.pagination;
    //   }
    // })
  //}

  onSearch(){
    this.bookParams.search =this.searchTerm.nativeElement.value;
    this.loadBooks();
  }

  onReset(){
    this.searchTerm.nativeElement.value = undefined;
    this.searchParams = new SearchPara();
    this.loadBooks();

  }
  pageChanged(event: any){
    if(this.pageNumber !== event.page)
    this.pageNumber = event.page;

    this.loadBooks();
  }

  getBooks() {
    this.http.get(this.baseUrl).subscribe({
      next: response => this.books = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  getGenre(){
   this.bookService.getGenre().subscribe(response => {
    this.genres = [{id: 0, name: 'All'}, ...response];
   }, error => {
    console.log(error);
   });
  }
}

//  // books : any;
//   titles: Title[] = [];
//   //titles$:Observable<Title[]> | undefined;
//   registerMode =false;
//   pagination: Pagination | undefined;
//   bookParams : BookParams | undefined;
//   genres: Genres[];
//   genreIdselected: number;

//   constructor(private http : HttpClient, private bookService: BooksService) {
//     this.bookParams = this.bookService.getBookParams();
//    }

//   ngOnInit(): void {
//     this.loadTitles() ;
//     this.getGenre();
//   }

//   loadTitles(){
//     if(this.bookParams)
//     {
//       this.bookService.setBookParams(this.bookParams);
//       this.bookService.getTitles(this.bookParams).subscribe({
//         next: response => {
//           if(response.result && response.pagination) {
//             this.titles = response.result;
//             this.pagination = response.pagination;
//           }
//         }
//       })
//     }
//   }

//   // getBooks() {
//   //   this.http.get('http://localhost:5000/api/books').subscribe({
//   //     next: response => this.books = response,
//   //     error: error => console.log(error),
//   //     complete: () => console.log('Request has completed')
//   //   })
//   // }

//   // getTitles(){
//   //   this.bookService.getTitles(this.genreIdselected).subscribe(response => {
//   //     this.titles = response.data;
//   //   }, error => {
//   //     console.log(error);
//   //   });
//   // }

//   getGenre(){
//    this.bookService.getGenre().subscribe(response => {
//     this.genres = [{id: 0, name: 'All'}, ...response];
//    }, error => {
//     console.log(error);
//    });
//   }

//   // onGenreSelected(genreId: number) {
//   //   this.genreIdselected = genreId;
//   //   this.getBooks();
//   // }


//   // loadMembers() {
//   //   if(this.bookParams)
//   //   {
//   //     this.bookService.setUserParams(this.userParams);
//   //     this.membersService.getMembers(this.userParams).subscribe({
//   //       next: response => {
//   //         if(response.result && response.pagination) {
//   //           this.members = response.result;
//   //           this.pagination = response.pagination;

//   //         }
//   //       }
//   //     })
//   //   }

//   // }
// }
