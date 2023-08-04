import { Injectable } from '@angular/core';
import { ReplaySubject, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/book';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title } from '../_models/title';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Genres } from '../_models/genres';
import { Pagination } from '../_models/pagination';
import { BookParams } from '../_models/bookParams';
import { Read } from '../_models/read';
import { SearchPara } from '../_models/searchPara';
import { Review } from '../_models/review';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.apiUrl;
  titles : Title[] = [];
  titleCache = new Map();
  book: Book | undefined;
  bookParams: BookParams | undefined;
  searchParams: SearchPara;

  constructor(private http : HttpClient) { }

  getTitles(bookParams: BookParams, genreId?: number)
  {
    const response = this.titleCache.get(Object.values(this.bookParams).join('-'));
    let params = getPaginationHeaders(bookParams.pageNumber, bookParams.pageSize);
    if(genreId) {
    params = params.append('GenreId', genreId.toString());
    }
      return getPaginatedResult<Title[]>(this.baseUrl + 'books', params, this.http).pipe(
      map(response => {
        this.titleCache.set(Object.values(bookParams).join('-'), response);
        return response;
      })
    );


    // if(this.titles.length > 0) return of(this.titles);
    // return this.http.get<Title[]>(this.baseUrl + 'books').pipe(
    //   map(titles => {
    //     this.titles = titles;
    //     return titles;
    //   })
    // );
  }

  getUserParams(){
    return this.bookParams;
  }

  setUserParams(params: BookParams){
    this.bookParams = params;
  }

  resetUserParams(){
    if(this.book) {
      this.bookParams = new BookParams(this.book);
      return this.bookParams;
    }
    return;


  }

  getTitle(title: string) {
    const titl = [...this.titleCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result),[])
    .find((titl: Title) => titl.title === title);
    if(titl) return of(titl);
    // return this.http.get<Title>(this.baseUrl + 'books/detail' + id.toString());
   return this.http.get<Title>(this.baseUrl + 'books/detail/' + title);
  //  return this.getTitles().pipe(
  //   map(propertiesArray => {
  //     return propertiesArray.find(p => p.id === id);
  //   })
  // );
    }

  addLike(title: string)
    {
      return this.http.post(this.baseUrl + 'favorite/' + title, {});
    }

    addReviewLike(id: number)
    {
      return this.http.post(this.baseUrl + 'comments/' + id, {});
    }

    getReviewLikes(predicate: string, pageNumber:number, pageSize: number)
    {
      let params = getPaginationHeaders(pageNumber,pageSize);
      params = params.append('predicate', predicate);
      return getPaginatedResult<Review[]>(this.baseUrl + 'comments' , params, this.http);
    }



  addBook(title: string)
  {
    return this.http.post<Read[]>(this.baseUrl + 'reading' + title, {});
  }

  getThread(member: string){
    return this.http.get<Read[]>(this.baseUrl + 'reading/thread/' + member)
  }
  getReviews(pageNumber: number, pageSize: number, container: string){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Read[]>(this.baseUrl + 'reading', params, this.http);
  }

  getBooks(pageNumber: number, pageSize: number, genreId?: number){
    let params = getPaginationHeaders(pageNumber, pageSize);
    if(genreId) {
      params = params.append('GenreId', genreId.toString());}


    return getPaginatedResult<Title[]>(this.baseUrl + 'books', params, this.http);
  }

    getLikes(predicate: string, pageNumber:number, pageSize: number)
    {
      let params = getPaginationHeaders(pageNumber,pageSize);
      params = params.append('predicate', predicate);
      return getPaginatedResult<Title[]>(this.baseUrl + 'favorite' , params, this.http);
    }

    addRead(title: string)
    {
      return this.http.post(this.baseUrl + 'reads/' + title, {});
    }

    getReads(predicate: string, pageNumber:number, pageSize: number)
    {
      let params = getPaginationHeaders(pageNumber,pageSize);
      params = params.append('predicate', predicate);
      return getPaginatedResult<Title[]>(this.baseUrl + 'reads' , params, this.http);
    }
    getGenre(){
      return this.http.get<Genres[]>(this.baseUrl + 'genre/genres');
    }


}

//   baseUrl = environment.apiUrl;
//   titles : Title[] ;
//   titleCache = new Map();
//   book: Book | undefined;
//   bookParams: BookParams | undefined;
//   private currentBook = new ReplaySubject<Book | null>(1);
//   titles$ = this.currentBook.asObservable();

//   constructor(private http : HttpClient) {
//     this.titles$.pipe(take(1)).subscribe({
//       next: book => {
//         if(book) {
//           this.bookParams = new BookParams(book);
//           this.book = book;
//           }
//       }
//     })
//    }

// getBookParams() {
//   return this.bookParams;
// }

// setBookParams(params: BookParams){
//   this.bookParams = params;
// }

// resetBookParams(){
//   if(this.book) {
//     this.bookParams = new BookParams(this.book);
//     return this.bookParams;
//   }
//   return;
// }

// getTitles(bookParams: BookParams) {
//   const response = this.titleCache.get(Object.values(bookParams).join('-'));

//   if(response) return of(response);
//   let params = getPaginationHeaders(bookParams.pageNumber, bookParams.pageSize);

//    params = params.append('genre', bookParams.genre);

//    return getPaginatedResult<Title[]>(this.baseUrl + 'books', params, this.http).pipe(
//     map(response => {
//       this.titleCache.set(Object.values(bookParams).join('-'),response);
//       return response;
//     })
//    );

// }

// getTitle(book: string){
//   const title= [...this.titleCache.values()]
//     .reduce((arr, elem) => arr.concat(elem.result),[])
//     .find((title: Title) => title.title === book);

//     if(book) return of(book);

//     return this.http.get<Title>(this.baseUrl + 'books/' + title);
//   }




//   // getTitles(genreId?: number) {
//   //   let params = new HttpParams();

//   //   if(genreId){
//   //     params = params.append('genreId', genreId.toString());
//   //   }
//   //   //if(this.titles.length > 0) return of(this.titles);
//   //   return this.http.get<Title[]>(this.baseUrl + 'books')
//   //   .pipe(
//   //     map(titles => {
//   //       this.titles = titles;
//   //       return titles;
//   //     })
//   //   );
//   // }

//   // getTitle(id: number) {
//   //   // const titl = [...this.titleCache.values()]
//   //   // .reduce((arr, elem) => arr.concat(elem.result),[])
//   //   // .find((titl: Title) => titl.id === id);
//   //   // if(titl) return of(titl);
//   //   // return this.http.get<Title>(this.baseUrl + 'books/detail' + id.toString());
//   //  // return this.http.get<Title[]>(this.baseUrl + 'books/detail/' + id.toString());
//   //  return this.getTitles().pipe(
//   //   map(propertiesArray => {
//   //     return propertiesArray.find(p => p.id === id);
//   //   })
//   // );
//   //   }

//   addLike(title: string)
//     {
//       return this.http.post(this.baseUrl + 'favorite/' + title, {});
//     }

//     getLikes(predicate: string, pageNumber:number, pageSize: number)
//     {
//       let params = getPaginationHeaders(pageNumber,pageSize);
//       params = params.append('predicate', predicate);
//       return getPaginatedResult<Title[]>(this.baseUrl + 'favorite' , params, this.http);
//     }

//     getGenre(){
//       return this.http.get<Genres[]>(this.baseUrl + 'genre/genres');
//     }


// }

