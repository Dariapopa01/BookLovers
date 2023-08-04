import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/members';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']

})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined
  toggle = true;


  constructor(private memberService: MembersService, private toastr: ToastrService,
    public presence: PresenceService) { }

  ngOnInit(): void {
  }

  addFollow(member: Member){
    this.memberService.addFollow(member.userName).subscribe({
      next: () => {
        this.toastr.success('You have followed ' + member.knownAs)
        this.toggle = !this.toggle;

      }
    })
  }
  enableDisableRule() {
    this.toggle = !this.toggle;
    // this.status = this.toggle ? 'Enable' : 'Disable';
}

}
