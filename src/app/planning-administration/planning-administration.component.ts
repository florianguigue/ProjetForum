import {Component, OnInit} from '@angular/core';
import {PlanningService} from '../services/planning.service';
import {Meeting} from '../model/meeting';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {AccountType} from '../enums/account-type.enum';
import * as _ from 'lodash';

@Component({
  selector: 'app-planning-administration',
  templateUrl: './planning-administration.component.html',
  styleUrls: ['../styles/planning-administration.css']
})
export class PlanningAdministrationComponent implements OnInit {

  public planning = [];
  public companies = [];
  public hours = [];

  constructor(
    private planningService: PlanningService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUserList().subscribe((users) => {
      this.companies = users.filter(function (user) {
        return user.user_type.localeCompare(AccountType.COMPANY) === 0;
      });
      this.planningService.getPlanning().subscribe((meetings) => {
        Object.keys(meetings).map((meetingKey, index) => {
          const meeting = meetings[meetingKey];
          const companyWS = _.find(users, ['_id', meeting.company]);
          const applicantWS = _.find(users, ['_id', meeting.applicant]);
          const company = new User(companyWS._id, companyWS.email, companyWS.account, companyWS.userType, companyWS.wishList);
          const applicant = new User(applicantWS._id, applicantWS.email, applicantWS.account, applicantWS.userType, applicantWS.wishList);
          const newMeeting = new Meeting(meeting._id, company, applicant,
            meeting.start_date, meeting.end_date, meeting.description, meeting.room);
          this.planning.push(newMeeting);
        });
        this.setHours();
      }, (error) => {

      });
    });
  }

  setHours() {
    const min = Math.min(...this.planning.map(meeting => new Date(meeting.start_date).getTime()));
    const max = Math.max(...this.planning.map(meeting => new Date(meeting.start_date).getTime()), 0);
    const interval = Math.abs(new Date(this.planning[0].start_date).getTime() / 60000 -
      new Date(this.planning[0].end_date).getTime() / 60000);

    const range = (new Date(max).getTime() - new Date(min).getTime()) / interval / 60000;
    let i = 0;
    while (i < range) {
      const date = new Date(min);
      this.hours.push(this.convertMinsToHrsMins((date.getHours() * 60) + (date.getMinutes() + i * interval)));
      i++;
    }
  }

  getPlanningByC(companyId) {
    return this.planning.filter(meeting => {
      return meeting.company.id.localeCompare(companyId) === 0;
    });
  }

  convertMinsToHrsMins(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const h1 = h < 10 ? '0' + h : h;
    const m1 = m < 10 ? '0' + m : m;
    return `${h1}h${m1}`;
  }
}
