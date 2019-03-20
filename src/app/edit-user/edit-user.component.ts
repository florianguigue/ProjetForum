import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {SettingsService} from '../services/settings.service';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../model/user';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AccountType} from '../enums/account-type.enum';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

interface DialogData {
  user: User;
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['../styles/edit-user.css']
})
export class EditUserComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;
  public isCompany: boolean;

  constructor(
    private cookieService: CookieService,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifications: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit() {
    this.user = this.data.user;

    this.isCompany = AccountType.COMPANY.localeCompare(this.user.userType) === 0;
    this.userForm = this.formBuilder.group({
      email: [this.user.getEmail, Validators.required],
      name: [this.user.getAccount.name, Validators.required],
      prenom: [this.user.getAccount.prenom, Validators.required]
    });
  }

  onSubmit() {
    let account;
    if (!this.isCompany) {
      account = {
        prenom: this.userForm.controls.prenom.value,
        name: this.userForm.controls.name.value,
        description: this.user.getAccount.description,
        picture: '../../assets/images/pexel.jpg'
      };
    } else {
      account = {
        name: this.userForm.controls.name.value,
        description: this.user.getAccount.description,
        picture: '../../assets/images/CGI-Logo.jpg'
      };
    }

    const newUser = {
      email: this.userForm.controls.email.value,
      account: account,
      user_type: this.user.userType
    };

    this.userService.updateUser(this.user.id, newUser).subscribe(
      (res) => {
        console.log(res);
        this.notifications.success('Les Modifications ont été enregistrées avec succès', '', NOTIF_PARAMS);
        this.cookieService.set('user', JSON.stringify(this.user));
      }
    );
  }

  renewPassword(user) {
    this.userService.newPassword(user).subscribe(
      result => this.notifications.success(result.message, '', NOTIF_PARAMS)
    );
  }

}
