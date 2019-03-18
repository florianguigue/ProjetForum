import { Injectable } from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _baseUrl = 'http://localhost:3000';

  private _isConnected: boolean;

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
}
