import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountType} from '../enums/account-type.enum';
import {NotificationsService} from 'angular2-notifications';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../styles/account.css']
})
export class AccountComponent implements OnInit {

  userForm: FormGroup;

  public user: User;
  public userTypes = [];

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public cookieService: CookieService,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {
    this.userTypes.push(AccountType.COMPANY);
    this.userTypes.push(AccountType.APPLICANT);

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      userType: ['Company', Validators.required]
    });
  }

  get userF() {
    return this.userForm.controls;
  }

  onSubmit() {
    let account;
    if ((AccountType.APPLICANT).localeCompare(this.userForm.controls.userType.value) === 0) {
      account = {
        prenom: this.userForm.controls.prenom.value,
        name: this.userForm.controls.name.value,
        picture: '../../assets/images/CGI-Logo.jpg'
      };
    } else {
      account = {
        name: this.userForm.controls.name.value,
        picture: '../../assets/images/CGI-Logo.jpg'
      };
    }

    const newUser = {
      wish_list: [{}],
      email: this.userForm.controls.email.value,
      password: 'password',
      account: account,
      user_type: this.userForm.controls.userType.value
    };
    this.userService.createUserWS(newUser).subscribe(
      (res) => {
        if (res.success) {
          this.notifications.success('Utilisateur créer avec succès', '', NOTIF_PARAMS);
        } else {
          this.notifications.error('Impossible de créer l\'utilisateur, l\'email est peut être déjà utilisé', '', NOTIF_PARAMS);
        }
      },
      error => {
        this.notifications.error('Erreur lors de la création de l\'utilisateur', '', NOTIF_PARAMS);
      }
    );
  }
}
