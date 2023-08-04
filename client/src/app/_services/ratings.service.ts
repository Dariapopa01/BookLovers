import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Rating } from '../_models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) {

   }


  getRatingss(pageNumber: number, pageSize: number, container: string){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Rating[]>(this.baseUrl + 'ratings', params, this.http);
  }

  getRatingThread(title: string){
    return this.http.get<Rating[]>(this.baseUrl + 'ratings/thread/' + title);

  }
  sendRating(username: string, rate: number){
    return this.http.post<Rating>(this.baseUrl + 'ratings',
     {bookTitle: username, rate});
  }
  deleteMesssage(id: number) {
    return this.http.delete(this.baseUrl + 'review/' + id);
  }


}
