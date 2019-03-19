import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedService} from './shared.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
  }

  public getPlanning() {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.get(this.sharedService.baseUrl + '/meetings', { headers: headers});
  }
}
