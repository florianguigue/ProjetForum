import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {AccountType} from '../enums/account-type.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../model/user';
import {CookieService} from 'ngx-cookie-service';


/**
 * Module de gestion de l'authentification pour les étudiants, les entreprises et les administrateurs.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/login.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifications: NotificationsService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.login();
    }
  }

  login() {
    const body = {
      'email': this.email,
      'password': this.password
    };
    this.userService.login(body).subscribe(
      (response) => {
        if (response.success === false) {
          this.notifications.error('Email ou mot de passe incorrect', '', {
            timeOut: 6000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true
          });
        } else {
          const user = response.user;
          this.sharedService.connectedUser = new User(user._id, user.email, user.account, user.user_type, user.wish_list);

          this.cookieService.set('id', this.sharedService.connectedUser.id);
          this.cookieService.set('token', response.token);

          switch (this.sharedService.connectedUser.userType) {
            case AccountType.ADMIN:
              this.router.navigate(['administration']);
              break;
            case AccountType.COMPANY:
              this.router.navigate(['users']);
              break;
            case AccountType.APPLICANT:
              this.router.navigate(['users']);
          }
        }
      }, (error) => {
        this.notifications.error('Erreur lors de la connexion', 'Contacter l\'administrateur');
      }
    );
  }
}
