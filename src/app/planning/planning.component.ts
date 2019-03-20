import {Component, OnInit} from '@angular/core';
import {AccountType} from '../enums/account-type.enum';
import {User} from '../model/user';
import {Meeting} from '../model/meeting';
import {PlanningService} from '../services/planning.service';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import * as _ from 'lodash';
import {UserInfoComponent} from '../user-info/user-info.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['../styles/planning.css']
})
export class PlanningComponent implements OnInit {

  public planning = [];
  private userList = [];
  public user;
  public userType;
  public meetingUserType;

  constructor(
    private planningService: PlanningService,
    private userService: UserService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.user = this.userService.createUser(this.cookieService.get('user'));
    if (this.user.userType.localeCompare(AccountType.COMPANY) === 0) {
      this.userType = AccountType.COMPANY;
      this.meetingUserType = AccountType.APPLICANT;
    } else {
      this.meetingUserType = AccountType.COMPANY;
      this.userType = AccountType.APPLICANT;
    }
    this.userService.getUserList().subscribe((users) => {
      this.userList = users;
      this.planningService.getPlanning().subscribe((meetings) => {
        meetings = Object.values(meetings).filter(meeting => meeting.applicant.localeCompare(this.user.id) === 0);
        Object.keys(meetings).map((meetingKey) => {
          const meeting = meetings[meetingKey];
          let userWS;
          if (this.userType.localeCompare(AccountType.APPLICANT) === 0) {
            userWS = _.find(this.userList, ['_id', meeting.company]);
          } else {
            userWS = _.find(this.userList, ['_id', meeting.applicant]);
          }
          const user = new User(userWS._id, userWS.email, userWS.account, userWS.userType, userWS.wishList);
          const newMeeting = new Meeting(meeting._id, user, this.user,
            meeting.start_date, meeting.end_date, meeting.description, meeting.room);
          this.planning.push(newMeeting);
        });
        this.planning = this.planning.filter(meeting => {
          if (this.userType.localeCompare(AccountType.APPLICANT)) {
            return meeting.company.id.localeCompare(this.user.id) === 0;
          } else {
            return meeting.applicant.id.localeCompare(this.user.id) === 0;
          }
        });
      });
    }, (error) => {

    });
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserInfoComponent, {
      panelClass: 'full-width-dialog',
      width: '100%',
      data: {
        user: user
      },
    });

    document.getElementsByTagName('html')[0].classList.add('overflow-hidden');

    dialogRef.afterClosed().subscribe(result => {
      document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
    });
  }
}
