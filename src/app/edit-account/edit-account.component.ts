import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {User} from '../model/user';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {FileUploader} from 'ng2-file-upload';

import {AccountType} from '../enums/account-type.enum';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './edit-account.component.html',
  styleUrls: ['../styles/applicant-form.css']
})
export class EditAccountComponent implements OnInit {

  userForm: FormGroup;

  public uploader: FileUploader = new FileUploader({url: URL});

  public user: User;
  public isCompany: boolean;

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public cookieService: CookieService,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {
    this.user = this.userService.createUser(this.cookieService.get('user'));
    this.isCompany = AccountType.COMPANY.localeCompare(this.user.userType) === 0;
    this.userForm = this.formBuilder.group({
      email: [this.user.getEmail, Validators.required],
      name: [this.user.getAccount.name, Validators.required],
      prenom: [this.user.getAccount.prenom, Validators.required],
      description: [this.user.getAccount.description]
    });
  }

  upload() {
    this.uploader.queue.forEach(
      (file) => {
        file.upload();
      }
    );
  }

  get userF() {
    return this.userForm.controls;
  }

  onSubmit() {
    let account;
    if (!this.isCompany) {
      account = {
        prenom: this.userForm.controls.prenom.value,
        name: this.userForm.controls.name.value,
        description: this.userForm.controls.description.value,
        picture: '../../assets/images/pexel.jpg'
      };
    } else {
      account = {
        name: this.userForm.controls.name.value,
        description: this.userForm.controls.description.value,
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

  openDialog() {
    this.matDialog.open(WishlistComponent);
  }

}
