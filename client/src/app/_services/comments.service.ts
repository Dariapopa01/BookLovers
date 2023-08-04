import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCommentsThread(reviewTitle: string)
  {
    return this.http.get<Comment[]>(this.baseUrl + 'comments/thread/' + reviewTitle);
  }

  sendComment(reviewTitle:string, content:string){
    return this.http.post<Comment>(this.baseUrl + 'comments',{reviewTitle, content})
  }


}
