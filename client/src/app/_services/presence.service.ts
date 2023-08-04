import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?:HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUser$ = this.onlineUserSource.asObservable();


  constructor(private toastr: ToastrService, private router:Router) { }

  createHubConnection(user: User){

    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'presence' ,{
      accessTokenFactory: () => user.token
    })
    .withAutomaticReconnect()
    .build()
    this.hubConnection
    .start().catch(error=>console.log(error));

    // this.hubConnection.on('UserIsOnline', username => {
    //   this.toastr.info(username + ' has connected');
    // })

    // this.hubConnection.on('UserIsOffline', username => {
    //   this.toastr.warning(username + ' has disconnected');
    // })

    this.hubConnection.on('UserIsOnline' , username => {
     this.onlineUser$.pipe(take(1)).subscribe({next: usernames =>
       this.onlineUserSource.next([...usernames,username])
     })
    })
     this.hubConnection.on('UserIsOffline' , username => {
       this.onlineUser$.pipe(take(1)).subscribe({next: usernames=>
         this.onlineUserSource.next([...usernames.filter(x => x! == username)])
       })
     })
     this.hubConnection.on('GetOnlineUsers' , (usernames: string[]) => {
       this.onlineUserSource.next(usernames);
     })
     this.hubConnection.on('NewMessageReceived', ({username, knownas}) => {
       this.toastr.info(knownas + ' has sent you a new message!')
       .onTap
       .pipe(take(1))
       .subscribe(() => this.router.navigateByUrl('/members/' + username +'?tab=Messages'));
     })
  }


  stopHubConnection(){
    this.hubConnection.stop().catch(error =>console.log(error));
  }
}
