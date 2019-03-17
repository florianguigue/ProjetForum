import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../styles/nav.css']
})

export class NavigationComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public sharedService: SharedService
  ) {
  }

  ngOnInit() {
    window.addEventListener('scroll', function (e) {
      if (window.scrollY > 50) {
        document.getElementsByTagName('nav')[0].classList.add('bg-white');
      } else if (window.scrollY < 50) {
        document.getElementsByTagName('nav')[0].classList.remove('bg-white');
      }
    });
  }

  disconnect() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}
