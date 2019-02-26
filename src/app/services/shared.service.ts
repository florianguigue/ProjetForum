import { Injectable } from '@angular/core';
import { AccountType } from '../enums/account-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _accountType: AccountType;

  constructor() { }


  get accountType(): AccountType {
    return this._accountType;
  }

  set accountType(value: AccountType) {
    this._accountType = value;
  }
}
