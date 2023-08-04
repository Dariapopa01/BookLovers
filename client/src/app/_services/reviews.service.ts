import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Review } from '../_models/review';
import { Read } from '../_models/read';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  baseUrl=environment.apiUrl;


  constructor(private http: HttpClient) { }

  getReviews(pageNumber: number, pageSize: number, container: string){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Review[]>(this.baseUrl + 'review', params, this.http);
  }

  getReviewThread(title: string){
    return this.http.get<Review[]>(this.baseUrl + 'review/thread/' + title);

  }

  getThread(member: string){
    return this.http.get<Read[]>(this.baseUrl + 'reading/thread/' + member);
  }
  sendReview(username: string, content: string, rate:number){
    return this.http.post<Review>(this.baseUrl + 'review',
     {bookTitle: username, content, rate});
  }
  deleteMesssage(id: number) {
    return this.http.delete(this.baseUrl + 'review/' + id);
  }
}
