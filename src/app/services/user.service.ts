import { Injectable } from '@angular/core';
import {SharedService} from './shared.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) { }

  public getUserList(): Observable<any> {
    return this.httpClient.get(this.sharedService.baseUrl + '/users');
  }

  public getUser(id: string): Observable<any> {
    return this.httpClient.get<User>(this.sharedService.baseUrl + /users/ + id);
  }
}
