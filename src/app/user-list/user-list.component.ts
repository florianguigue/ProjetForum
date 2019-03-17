import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {SharedService} from '../services/shared.service';
import {AccountType} from '../enums/account-type.enum';
import * as _ from 'lodash';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {StudentInfoComponent} from '../student-info/student-info.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../styles/user-list.css']
})
export class UserListComponent implements OnInit {

  public users = [];
  private user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private notifications: NotificationsService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      (response) => {
        response.forEach((user) => {
          this.user = new User(user._id, user.email, user.account, user.user_type, user.wish_list);
          this.users.push(this.user);
        });
        if (this.sharedService.connectedUser.userType !== AccountType.ADMIN) {
          this.reduceListForSpecificUserType();
        }
      }, () => {
        const userType = this.sharedService.connectedUser.userType === AccountType.COMPANY ? 'candidats' : 'enterprises';
        this.notifications.error('Erreur lors de la récupération des ' + userType, '');
      }
    );
  }

  reduceListForSpecificUserType() {
    _.remove(this.users, (user) => {
      const userType = this.sharedService.connectedUser.userType === AccountType.COMPANY ? 'Company' : 'Applicant';
        return user.userType === userType;
    });
  }

  addToWishlist(user: User) {
    const newWIsh = {
      'id': user.id,
      'name': user.displayName,
      'position': this.sharedService.connectedUser.wishlist.length + 1
    };
    this.sharedService.connectedUser.wishlist.push(newWIsh);
    this.userService.updateUser(this.sharedService.connectedUser.id, { 'wish_list' : this.sharedService.connectedUser.wishlist}).subscribe(
      () => {
        this.notifications.success(user.displayName + ' a été ajouté à la wishlist', '');
      }, () => {
        this.notifications.error('Erreur lors de l\'ajout à la wishlist', '');
      }
    );
  }

  openDialog(user: User) {
    console.log(user);
    this.dialog.open(StudentInfoComponent, {
      data: {
        user: user
      },
    });
  }
}
