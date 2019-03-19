import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _baseUrl = 'http://localhost:3000';

  private _isConnected: boolean;

  private _userList = [];

  constructor() { }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(value: boolean) {
    this._isConnected = value;
  }


  get userList(): any[] {
    return this._userList;
  }

  set userList(value: any[]) {
    this._userList = value;
  }
}
