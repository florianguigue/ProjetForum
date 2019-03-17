import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {SharedService} from '../services/shared.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sharedService: SharedService,
    private userService: UserService,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
  }

  addToWishList() {
    const connectedUser = this.sharedService.connectedUser;
    let alreadyAdded = false;

    connectedUser.wishlist.forEach((wish) => {
      if (wish.id === this.data.user.id) {
        alreadyAdded = true;
      }
    });

    if (!alreadyAdded) {
      const studentWish = {
        'id': this.data.user.id,
        'name': this.data.user.displayName,
        'position': this.sharedService.connectedUser.wishlist.length + 1
      };
      connectedUser.wishlist.push(studentWish);

      this.userService.updateUser(connectedUser.id, { 'wish_list': connectedUser.wishlist}).subscribe(
        () => {
          this.notifications.success(studentWish.name + ' a été ajouté à la wishlist', '');
        }, () => {
          this.notifications.error('Erreur lors de l\'ajout à la wishlist', '');
        }
      );
    }
  }

}
