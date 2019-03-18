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
import {CookieService} from 'ngx-cookie-service';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../styles/user-list.css']
})
export class UserListComponent implements OnInit {

  public users = [];
  private user: User;

  connectedUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private notifications: NotificationsService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.connectedUser = this.userService.createUser(this.cookieService.get('user'));
    console.log(this.connectedUser);
    this.userService.getUserList().subscribe(
      (response) => {
        response.forEach((user) => {
          this.user = new User(user._id, user.email, user.account, user.user_type, user.wish_list);
          this.users.push(this.user);
        });
        if (this.connectedUser.userType !== AccountType.ADMIN) {
          this.reduceListForSpecificUserType();
        }
      }, () => {
        const userType = this.connectedUser.userType === AccountType.COMPANY ? 'candidats' : 'enterprises';
        this.notifications.error('Erreur lors de la récupération des ' + userType, '', NOTIF_PARAMS);
      }
    );
  }

  reduceListForSpecificUserType() {
    _.remove(this.users, (user) => {
      const userType = this.connectedUser.userType === AccountType.COMPANY ? 'Company' : 'Applicant';
      return user.userType === userType;
    });
  }

  addToWishlist(user: User) {
    const connectedUser = this.connectedUser;
    console.log(connectedUser);


    connectedUser.wishlist[0][user.id] = Object.keys(connectedUser.wishlist[0]).length + 1;

    this.userService.updateUser(connectedUser.id, {'wish_list': connectedUser.wishlist}).subscribe(
      () => {
        this.notifications.success(user.displayName + ' a été ajouté à la wishlist', '', NOTIF_PARAMS);
        this.cookieService.set('user', JSON.stringify(connectedUser));
      }, () => {
        this.notifications.error('Erreur lors de l\'ajout à la wishlist', '', NOTIF_PARAMS);
      }
    );

  }

  remove(user: User) {
    delete this.connectedUser.wishlist[0][user.id];
    this.userService.updateUser(this.connectedUser.id, {'wish_list': this.connectedUser.wishlist}).subscribe(
      () => {
        this.notifications.success(user.displayName + ' a été supprimé de la wishlist', '', NOTIF_PARAMS);
        this.cookieService.set('user', JSON.stringify(this.connectedUser));
      }
    );
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(StudentInfoComponent, {
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
