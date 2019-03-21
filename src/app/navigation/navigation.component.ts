import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {AccountType} from '../enums/account-type.enum';
import {UserService} from '../services/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../styles/nav.css']
})

export class NavigationComponent implements OnInit {

  picture: string;

  public isAdmin = false;
  public userList;
  public user: User;

  constructor(
    public cookieService: CookieService,
    public userService: UserService,
    private router: Router
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

    this.user = this.userService.createUser(this.cookieService.get('user'));
    this.userList = this.user.userType.localeCompare(AccountType.COMPANY) === 0 ? 'Candidats' : 'Entreprises';
    this.isAdmin = this.user.userType.localeCompare(AccountType.ADMIN) === 0;
  }

  disconnect() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}
