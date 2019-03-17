import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedService} from './shared.service';
import {Observable} from 'rxjs';
import {Settings} from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  httpHeader = {
    headers: new HttpHeaders({
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjN2ZlODQ3YjQ4NzdlMGQxNTI4NGRlZSIsImlhdCI6MTU1MjYzNjU1N30.3I0fy20WGfCdfZACT2naEkBGPPY1C1OYcnCSnMEn77o',
      'content-type': 'application/json'
    })
  };

  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) {
  }

  public getSettings(): Observable<any> {
    return this.httpClient.get(this.sharedService.baseUrl + '/settings', this.httpHeader);
  }

  public updateSettings(values) {
    const settings = {
      start_time: +values.startTime.value,
      end_time: +values.endTime.value,
      time_meeting: +values.duration.value,
      max_rank: +values.maxRank.value
    };

    return this.httpClient.put( this.sharedService.baseUrl + '/settings', settings, this.httpHeader);
  }
}
