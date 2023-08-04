import { Book } from "./book";

export class BookParams {
  pageNumber = 1;
  pageSize = 20;
  orderBy = 'title';
  genre : string;
  search: string;
/**
 *
 */

 constructor(book: Book) {
  this.genre = book.genre;
 }
}

