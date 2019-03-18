import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './user.service';
import {SharedService} from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private sharedService: SharedService,
  ) { }

  public isAuthenticated(): boolean {
    if (!this.cookieService.check('token')) {
      return false;
    } else {
      this.userService.getUserList().subscribe((list) => {
        this.sharedService.userList = list;
      });
      return true;
    }
  }
}
