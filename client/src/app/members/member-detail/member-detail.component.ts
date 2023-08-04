import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/members';
import { Message } from 'src/app/_models/message';
import { Read } from 'src/app/_models/read';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member | undefined;
  galleryOptions: NgxGalleryOptions[] =[];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];
  user: User;
  readings: Read[] = [];


  constructor(private memberService: MembersService, private route: ActivatedRoute,
    private messageService: MessageService, private reviewser:ReviewsService,
    public presence:PresenceService, private accountServie:AccountService, private router:Router) {
      this.accountServie.currentUser$.pipe(take(1)).subscribe({
        next: user =>{
          if(user) this.user = user
        }
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

    ngOnInit(): void {
      this.route.data.subscribe({
        next: data => this.member = data['member']
      })
      this.loadReviews();
      this.route.queryParams.subscribe({
        next: params  => {
          params['tab'] && this.selectTab(params['tab'])
        }
      })
      this.galleryOptions = [
        {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview:false
        }
      ]
      this.galleryImages = this.getImages();


    }

    getImages(){
      if(!this.member) return [];
      const imageUrls = [];
      for (const photo of this.member.photos){
        imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url
        })
      }
      return imageUrls;
    }

    loadReviews(){
      this.reviewser.getThread(this.member.userName).subscribe
      (reads =>
        {this.readings = reads;
        })
    }

    loadMember() {
      var username = this.route.snapshot.paramMap.get('username')
      if(!username) return;
      this.memberService.getMember(username).subscribe({
        next: member => {
          this.member = member;

        }
      });
    }
    selectTab(heading: string){
      if (this.memberTabs) {
        this.memberTabs.tabs.find(x => x.heading === heading)!.active = true
      }
    }

    loadMessages(){
      this.messageService.getMessageThread(this.member.userName).subscribe
      (messages => {
        this.messages = messages;
      })
    }

    // onTabActivated(data : TabDirective){
    //   this.activeTab = data;
    //   if(this.activeTab.heading === 'Messages' && this.messages.length===0)
    //   {
    //     this.loadMessages();
    //     //this.messageService.createHubConnection(this.user, this.member.userName);
    //   }
    //   // else{
    //   //   this.messageService.stopHubConnection();
    //   // }
    // }

    onTabActivated(data:TabDirective){
      this.activeTab = data;
      if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
        this.messageService.createHubConnection(this.user, this.member.userName);
      }else{
        this.messageService.stopHubConnection();
      }
    }
    ngOnDestroy(): void {
      this.messageService.stopHubConnection();
    }

}
