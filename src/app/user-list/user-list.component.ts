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
  ) { }

  ngOnInit() {
    this.connectedUser = this.userService.createUser(this.cookieService.get('user'));
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
    let alreadyAdded = false;

    connectedUser.wishlist.forEach((wish) => {
      if (wish.id === user.id) {
        alreadyAdded = true;
      }
    });

    if (!alreadyAdded) {
      const studentWish = {
        'id': user.id,
        'name': user.displayName,
        'position': this.connectedUser.wishlist.length + 1
      };
      connectedUser.wishlist.push(studentWish);

      this.userService.updateUser(connectedUser.id, { 'wish_list': connectedUser.wishlist}).subscribe(
        () => {
          this.notifications.success(studentWish.name + ' a été ajouté à la wishlist', '', NOTIF_PARAMS);
        }, () => {
          this.notifications.error('Erreur lors de l\'ajout à la wishlist', '', NOTIF_PARAMS);
        }
      );
    } else {
      const type = this.connectedUser.userType === AccountType.COMPANY ? 'ce candidat' : 'cette entreprise';
      this.notifications.warn('Vous ne pouvez ajouter ' + type + ' car il est déjà présent dans votre liste de souhait.', '', NOTIF_PARAMS);
    }
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
