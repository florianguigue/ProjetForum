import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import {UserService} from '../services/user.service';
import {SharedService} from '../services/shared.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['../styles/wishlist.less']
})
export class WishlistComponent implements OnInit {

  public wishlist = [];

  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.userService.getUser('5c8906069afe311678ee69f2'/*this.sharedService.connectedUser.id*/).subscribe(
      (user) => {
        this.wishlist = user.wish_list;
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
    console.log(this.wishlist);
  }

  remove(id: string) {
    _.remove(this.wishlist, (wish) => {
      return wish.id === id;
    });
  }

  validWishlist() {
    this.userService.updateUser(this.sharedService.connectedUser.id, { 'wish_list': this.wishlist}).subscribe();
  }
}
