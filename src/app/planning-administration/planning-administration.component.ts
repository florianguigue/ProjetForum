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
  public maxMeetings = 0;

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
        this.setMaxMeetings(users.filter((user) => {
          return user.user_type.localeCompare(AccountType.COMPANY) === 0;
        }));
      }, (error) => {

      });
    });
  }

  setMaxMeetings(companies) {
    companies.forEach((company) => {
      const meetingSize = this.getPlanningByC(company._id).length;
      this.maxMeetings = meetingSize > this.maxMeetings ? meetingSize : this.maxMeetings;
    });
  }

  getPlanningByC(companyId) {
    return this.planning.filter(meeting => {
      return meeting.company.id.localeCompare(companyId) === 0;
    });
  }

}
