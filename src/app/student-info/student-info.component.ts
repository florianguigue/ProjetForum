import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {SharedService} from '../services/shared.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';
import {CookieService} from 'ngx-cookie-service';

interface DialogData {
  user: User;
}

/**
 * Module d'affichage des informations de l'étudiant candidat (Identité, Résumé, CV).
 */
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['../styles/student-info.css']
})
export class StudentInfoComponent implements OnInit {

  pdfSrc = '/src/assets/attestation_CVEC.pdf';

  connectedUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cookieService: CookieService,
    private userService: UserService,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
  }

  addToWishList() {
    this.connectedUser = this.userService.createUser(this.cookieService.get('user'));
    let alreadyAdded = false;

    this.connectedUser.wishlist.forEach((wish) => {
      if (wish.id === this.data.user.id) {
        alreadyAdded = true;
      }
    });

    if (!alreadyAdded) {
      const studentWish = {
        'id': this.data.user.id,
        'name': this.data.user.displayName,
        'position': this.connectedUser.wishlist.length + 1
      };
      this.connectedUser.wishlist.push(studentWish);

      this.userService.updateUser(this.connectedUser.id, { 'wish_list': this.connectedUser.wishlist}).subscribe(
        () => {
          this.notifications.success(studentWish.name + ' a été ajouté à la wishlist', '');
        }, () => {
          this.notifications.error('Erreur lors de l\'ajout à la wishlist', '');
        }
      );
    }
  }

}
