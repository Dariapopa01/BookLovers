import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/members';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
 // members$:Observable<Member[]> | undefined;
 members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  filter = false;


  constructor(private membersService: MembersService) {
      this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    //this.members$ = this.membersService.getMembers();
    this.loadMembers();
  }

  onSearch(){
    this.userParams.search = this.searchTerm.nativeElement.value;
    this.loadMembers();
  }

  onReset(){
    this.searchTerm.nativeElement.value = undefined;
    this.pagination = new Pagination();
    this.loadMembers();
  }

  registerToggle(){
    this.filter = !this.filter;
  }
  cancelRegisterMode(event: boolean){
    this.filter = event;
  }

  loadMembers() {
    if(this.userParams)
    {
      this.membersService.setUserParams(this.userParams);
      this.membersService.getMembers(this.userParams).subscribe({
        next: response => {
          if(response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;

          }
        }
      })
    }

  }

  resetFilters(){

    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();

  }

  pageChanged(event: any){
    if(this.userParams.pageNumber !== event.page)
    this.userParams.pageNumber = event.page;
    this.membersService.setUserParams(this.userParams);
    this.loadMembers();
  }


}
