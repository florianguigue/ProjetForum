import { Injectable } from '@angular/core';
import { AccountType } from '../enums/account-type.enum';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _baseUrl = 'http://localhost:3000';

  private _connectedUser: User;

  constructor() { }

  get connectedUser(): User {
    return this._connectedUser;
  }

  set connectedUser(value: User) {
    this._connectedUser = value;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }
}
