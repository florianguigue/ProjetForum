import {AccountType} from '../enums/account-type.enum';
import {Account} from './account';
import * as _ from 'lodash';

export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _account: Account;
  private _userType: AccountType;
  private _wishlist = [];
  private _displayName: string;


  constructor(id: string, email: string, account: Account, userType: string, wishlist: Array<any>) {
    this.id = id;
    this._email = email;
    this._account = account;

    this._wishlist = wishlist;

    switch (userType) {
      case 'Applicant':
        this._userType = AccountType.APPLICANT;
        break;
      case 'Company':
        this._userType = AccountType.COMPANY;
        break;
      case 'Administrator':
        this._userType = AccountType.ADMIN;
        break;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get account(): Account {
    return this._account;
  }

  set account(value: Account) {
    this._account = value;
  }

  get userType(): AccountType {
    return this._userType;
  }

  set userType(value: AccountType) {
    this._userType = value;
  }

  get wishlist(): Array<any> {
    return this._wishlist;
  }

  set wishlist(value: Array<any>) {
    this._wishlist = value;
  }


  get displayName(): string {
    return !_.isNil(this._account.prenom) ? this._account.prenom + ' ' + this._account.name : this._account.name;
  }
}
