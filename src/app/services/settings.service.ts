import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedService} from './shared.service';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
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

  public getSettings(): Observable<any> {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));
    return this.httpClient.get(this.sharedService.baseUrl + '/settings', { headers: headers});
  }

  public updateSettings(values) {
    const headers = this.httpHeader.headers.append('x-access-token', this.cookieService.get('token'));

    const settings = {
      start_time: +values.startTime.value,
      end_time: +values.endTime.value,
      time_meeting: +values.duration.value,
      max_rank: +values.maxRank.value
    };

    return this.httpClient.put( this.sharedService.baseUrl + '/settings', settings, { headers: headers });
  }
}
