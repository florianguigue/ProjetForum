import {AccountType} from '../enums/account-type.enum';
import {Account} from './account';
import * as _ from 'lodash';

export class User {
  private _id: string;
  private email: string;
  private account: Account;
  private user_type: AccountType;
  private wish_list = [];
  private _displayName: string;


  constructor(id: string, email: string, account: Account, userType: string, wishlist: Array<any>) {
    this.id = id;
    this.email = email;
    this.account = account;

    this.wish_list = wishlist;

    switch (userType) {
      case 'Applicant':
        this.user_type = AccountType.APPLICANT;
        break;
      case 'Company':
        this.user_type = AccountType.COMPANY;
        break;
      case 'Administrator':
        this.user_type = AccountType.ADMIN;
        break;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get getEmail(): string {
    return this.email;
  }

  set setEmail(value: string) {
    this.email = value;
  }

  get getAccount(): Account {
    return this.account;
  }

  set setAccount(value: Account) {
    this.account = value;
  }

  get userType(): AccountType {
    return this.user_type;
  }

  set userType(value: AccountType) {
    this.user_type = value;
  }

  get wishlist(): Array<any> {
    return this.wish_list;
  }

  set wishlist(value: Array<any>) {
    this.wish_list = value;
  }

  get displayName(): string {
    return !_.isNil(this.account.prenom) ? this.account.prenom + ' ' + this.account.name : this.account.name;
  }
}
