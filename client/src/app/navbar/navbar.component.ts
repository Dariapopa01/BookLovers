import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Member } from '../_models/members';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() member: Member | undefined
  model: any = {};


  constructor(public accountService: AccountService, private router: Router,
     private toastr: ToastrService) { }

  ngOnInit(): void {

  }


  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('');
        this.model = {};
      }

    })


  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }
}
