import { Title } from "@angular/platform-browser";

export class Pagination
 {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  search: string;

 }

 export class PaginatedResult<T>{
  result?: T;
  pagination?: Pagination;
 }
