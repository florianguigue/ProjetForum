import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import * as _ from 'lodash';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private sharedService: SharedService,
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {
  }

  public login(body: object): Observable<any> {
    return this.httpClient.post(this.sharedService.baseUrl + '/login', body);
  }

  public getUserList(): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.get(this.sharedService.baseUrl + '/users', { headers: headers});
  }

  public getUser(id: string): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.get(this.sharedService.baseUrl + /users/ + id, { headers: headers});
  }

  public updateUser(id: string, body: object): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.put(this.sharedService.baseUrl + /users/ + id, body, { headers: headers});
  }

  public deleteUser(id: string): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.delete(this.sharedService.baseUrl + /users/ + id, { headers: headers});
  }

  public isUserLogged() {
    if (_.isNil(this.sharedService.connectedUser) && this.cookieService.check('id')) {
      this.getUser(this.cookieService.get('id')).subscribe(
        (user) => {
          this.sharedService.connectedUser = new User(user._id, user.email, user.account, user.user_type, user.wish_list);
        }
      );
    }
  }
}
