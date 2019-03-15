import { Injectable } from '@angular/core';
import {SharedService} from './shared.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpHeader = {
    headers: new HttpHeaders({
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODkwNjlmOWFmZTMxMTY3OGVlNjlmNyIsImlhdCI6MTU1MjQ4NDI3Mn0.iRbdQaNuXwD3rShvBgdYV4rqFJMJtdRjXwvWKalVQWg'// this.sharedService.connectedUser.token
    })
  };

  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) { }

  public getUserList(): Observable<any> {
    return this.httpClient.get(this.sharedService.baseUrl + '/users', this.httpHeader);
  }

  public getUser(id: string): Observable<any> {
    return this.httpClient.get(this.sharedService.baseUrl + /users/ + id, this.httpHeader);
  }

  public updateUser(id: string, body: object): Observable<any> {
    return this.httpClient.put(this.sharedService.baseUrl + /users/ + id, body, this.httpHeader);
  }
}
