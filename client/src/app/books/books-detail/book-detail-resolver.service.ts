import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Title } from "src/app/_models/title";
import { BooksService } from "src/app/_services/books.service";

@Injectable({
  providedIn: 'root'
})
export class BookDetailResolverService implements Resolve<Title>{


  constructor(private bookService: BooksService) {


  }
  resolve(route: ActivatedRouteSnapshot): Title | Observable<Title>  {

    return this.bookService.getTitle(route.paramMap.get('title')!);
  }
}
