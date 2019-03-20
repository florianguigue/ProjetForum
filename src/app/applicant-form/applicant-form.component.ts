import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {User} from '../model/user';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {FileUploader} from 'ng2-file-upload';


const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

const URL = 'http://localhost:3000/';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['../styles/applicant-form.css']
})
export class ApplicantFormComponent implements OnInit {

  userForm: FormGroup;

  public uploader: FileUploader = new FileUploader({url: URL});

  public user: User;

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
    console.log(this.user);
    this.userForm = this.formBuilder.group({
      name: [this.user.getAccount.name, Validators.required],
      prenom: [this.user.getAccount.prenom, Validators.required],
      description: [this.user.getAccount.description]
    });
  }

  get userF() {
    return this.userForm.controls;
  }

  onSubmit() {
    const body = {
      account: {
        prenom: this.userForm.controls.prenom.value,
        name: this.userForm.controls.name.value,
        description: this.userForm.controls.description.value
        // @TODO add other fields
      },
      wish_list: this.user.wishlist
    };
    this.userService.updateUser(this.user.id, body).subscribe(
      (res) => {
        console.log(res);
        this.notifications.success('Les Modifications ont été enregistrées avec succès', '', NOTIF_PARAMS);
        this.cookieService.set('user',JSON.stringify(this.user));
      }
    );
  }

  openDialog() {
    this.matDialog.open(WishlistComponent);
  }

}
