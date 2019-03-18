import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private userService: UserService
  ) { }

  public isAuthenticated(): boolean {
    if (!this.cookieService.check('token')) {
      return false;
    } else {
      this.userService.addLoggedUser();
      return true;
    }
  }
}
