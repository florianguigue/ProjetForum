import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {MAT_DIALOG_DATA} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';
import {CookieService} from 'ngx-cookie-service';
import * as _ from 'lodash';
import {AccountType} from '../enums/account-type.enum';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

interface DialogData {
  user: User;
}

/**
 * Module d'affichage des informations de l'étudiant candidat (Identité, Résumé, CV).
 */
@Component({
  selector: 'app-student-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['../styles/user-info.css']
})
export class UserInfoComponent implements OnInit {

  public connectedUser: User;

  pdfSrc = '/src/assets/attestation_CVEC.pdf';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cookieService: CookieService,
    private userService: UserService,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.connectedUser = this.userService.createUser(this.cookieService.get('user'));
  }

  addToWishList() {
    const connectedUser = this.connectedUser;
    let alreadyAdded = false;

    connectedUser.wishlist.forEach((wish) => {
      if (!_.isNil(wish[this.data.user.id])) {
        alreadyAdded = true;
      }
    });

    if (!alreadyAdded) {
      connectedUser.wishlist[0][this.data.user.id] = connectedUser.wishlist.length + 1;

      this.userService.updateUser(connectedUser.id, { 'wish_list': connectedUser.wishlist}).subscribe(
        () => {
          this.notifications.success(this.data.user.displayName + ' a été ajouté à la wishlist', '', NOTIF_PARAMS);
          this.cookieService.set('user', JSON.stringify(connectedUser));
        }, () => {
          this.notifications.error('Erreur lors de l\'ajout à la wishlist', '', NOTIF_PARAMS);
        }
      );
    } else {
      const type = connectedUser.userType === AccountType.COMPANY ? 'ce candidat' : 'cette entreprise';
      this.notifications.warn('Vous ne pouvez ajouter ' + type + ' car il est déjà présent dans votre liste de souhait.', '', NOTIF_PARAMS);
    }
  }

  remove() {
    delete this.connectedUser.wishlist[0][this.data.user.id];
    this.userService.updateUser(this.connectedUser.id, {'wish_list': this.connectedUser.wishlist}).subscribe(
      () => {
        this.notifications.success(this.data.user.displayName + ' a été supprimé de la wishlist', '', NOTIF_PARAMS);
        this.cookieService.set('user', JSON.stringify(this.connectedUser));
      }
    );
  }

}
