import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import * as _ from 'lodash';
import {User} from '../model/user';
import {FileUploader} from 'ng2-file-upload';

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
    return this.httpClient.get(this.sharedService.baseUrl + '/users', {headers: headers});
  }

  public getUser(id: string): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.get(this.sharedService.baseUrl + /users/ + id, {headers: headers});
  }

  public updateUser(id: string, body: object): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.put(this.sharedService.baseUrl + /users/ + id, body, {headers: headers});
  }

  public deleteUser(id: string): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.delete(this.sharedService.baseUrl + /users/ + id, {headers: headers});
  }

  public createUserWS(body: object): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.post(this.sharedService.baseUrl + '/users', body, {headers: headers});
  }

  public newPassword(user): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.get(this.sharedService.baseUrl + '/users/password/' + user.id, {headers: headers});
  }

  public createUser(u: string): User {
    const user = JSON.parse(u);
    return new User(user._id, user.email, user.account, user.user_type, user.wish_list);
  }

  public uploadFile(uploader: FileUploader) {
    uploader.queue.forEach(item => {
      item.upload();
    });
    if (uploader.getNotUploadedItems().length === 0) {
      uploader.clearQueue();
    }
  }

  public getFile(fileName: string): Observable<any> {
    return this.httpClient.get(this.sharedService.baseUrl + '/getFile/' + fileName);
  }
}
