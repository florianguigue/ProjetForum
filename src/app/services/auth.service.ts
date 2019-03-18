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
    return this.cookieService.check('token');
  }
}
