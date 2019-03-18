import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {UserService} from '../services/user.service';
import * as _ from 'lodash';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../model/user';
import {NotificationsService} from 'angular2-notifications';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['../styles/wishlist.less']
})
export class WishlistComponent implements OnInit {

  public wishlist = [];

  connectedUser: User;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {
    this.connectedUser = this.userService.createUser(this.cookieService.get('user'));
    Object.keys(this.connectedUser.wishlist[0]).forEach(
      (key) => {
        this.userService.getUser(key).subscribe(
          (user) => {
            const value = {
              'id': key,
              'name': user.account.prenom !== undefined ? user.account.prenom + ' ' + user.account.name : user.account.name,
              'position': this.connectedUser.wishlist[0][key]
            };
            this.wishlist.push(value);
          }
        );
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    let nextPosition, id;

    this.wishlist.forEach((wish) => {
      if (wish.position === event.previousIndex + 1) {
        nextPosition = event.currentIndex + 1;
        id = wish.id;
      }

      if (event.previousIndex < event.currentIndex) {
        if (wish.position <= event.currentIndex + 1 && wish.position > event.previousIndex + 1) {
          wish.position--;
        }
      } else {
        if (wish.position > event.currentIndex && wish.position < event.previousIndex + 1) {
          wish.position++;
        }
      }
    });

    this.wishlist.forEach((wish) => {
      if (wish.id === id) {
        wish.position = nextPosition;
      }
    });
    moveItemInArray(this.wishlist, event.previousIndex, event.currentIndex);
  }

  remove(wish) {
    this.wishlist.forEach(
      (value) => {
        if (value.position > wish.position) {
          value.position--;
        }
      }
    );
    _.remove(this.wishlist, (value) => {
      return value.id === wish.id;
    });
  }

  validWishlist() {
    this.connectedUser.wishlist[0] = {};
    this.wishlist.forEach(
      (wish) => {
        this.connectedUser.wishlist[0][wish.id] = wish.position;
      }
    );

    this.userService.updateUser(this.connectedUser.id, {'wish_list': this.connectedUser.wishlist}).subscribe(
      () => {
        this.notifications.success('La wishlist a été modifié', '', NOTIF_PARAMS);
        this.cookieService.set('user', JSON.stringify(this.connectedUser));
      }
    );
  }
}
