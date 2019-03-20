import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {AccountType} from '../enums/account-type.enum';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../styles/nav.css']
})

export class NavigationComponent implements OnInit {

  public isAdmin = false;
  public userList;

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

    const user = this.userService.createUser(this.cookieService.get('user'));
    this.userList = user.userType.localeCompare(AccountType.COMPANY) === 0 ? 'Candidats' : 'Entreprises';
    console.log(this.userList);
    this.isAdmin = user.userType.localeCompare(AccountType.ADMIN) === 0;
  }

  disconnect() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}
