import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../model/settings';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../model/user';
import {AccountType} from '../enums/account-type.enum';
import * as _ from 'lodash';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material';
import {AccountComponent} from '../account/account.component';
import {EditUserComponent} from '../edit-user/edit-user.component';

const NOTIF_PARAMS = {
  timeOut: 6000,
  showProgressBar: false,
  pauseOnHover: true,
  clickToClose: true
};

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['../styles/administration.css']
})
export class AdministrationComponent implements OnInit {
  settingsForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  connectedUser: User;

  public settings: Settings;
  public users = [];
  private user: User;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {
    this.connectedUser = this.userService.createUser(this.cookieService.get('user'));
    this.userService.getUserList().subscribe(
      (response) => {
        response.forEach((user) => {
          this.user = new User(user._id, user.email, user.account, user.user_type, user.wish_list);
          this.users.push(this.user);
        });
      }, () => {
        const userType = this.connectedUser.userType === AccountType.COMPANY ? 'candidats' : 'enterprises';
        this.notifications.error('Erreur lors de la récupération des ' + userType, '', NOTIF_PARAMS);
      }
    );

    this.settings = new Settings(0, 0, 0, 0);

    this.settingsForm = this.formBuilder.group({
      duration: [this.settings.time_meeting, [Validators.required, Validators.pattern('^[0-9](.[0-9]+)?')]],
      startTime: [this.settings.start_time, [Validators.required, Validators.pattern('[0-9]+')]],
      endTime: [this.settings.end_time, [Validators.required, Validators.pattern('[0-9]+')]],
      maxRank: [this.settings.max_rank, [Validators.required, Validators.pattern('[0-9]+')]],
    });

    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = new Settings(settings.start_time, settings.end_time, settings.time_meeting, settings.max_rank);
    }, (error) => {

    });


  }

  get settingsF() {
    return this.settingsForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.settingsForm.invalid) {
      this.notifications.error('Formulaire invalide', '', NOTIF_PARAMS);
      return;
    } else {
      this.settingsService.updateSettings(this.settingsForm.controls).subscribe();
      this.notifications.success('Modifications enregistrées avec succès', '', NOTIF_PARAMS);
    }
  }

  editUser(user: User) {

  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      () => {
        _.remove(this.users, (user) => {
          return user.id === id;
        });
        this.notifications.success('Utilisateur supprimé avec succès', '', NOTIF_PARAMS);
      }, () => {
        this.notifications.error('Erreur lors de la suppression de l\'utilisateur', '', NOTIF_PARAMS);
      }
    );
  }

  plannify() {
    this.settingsService.deleteAll().subscribe(res => {
      this.settingsService.plannify().subscribe(
        result => this.notifications.success('Planning généré avec succès', '', NOTIF_PARAMS)
      );
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AccountComponent, {
      panelClass: 'dialog-account'
    });

    document.getElementsByTagName('html')[0].classList.add('overflow-hidden');

    dialogRef.afterClosed().subscribe(result => {
      document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
    });
  }

  openDialogEdit(user: User) {
    const component = this.user.userType.localeCompare(AccountType.APPLICANT) === 0 ? EditUserComponent : EditUserComponent;
    const dialogRef = this.dialog.open(component, {
      panelClass: 'full-width-dialog',
      data: {
        user: user
      }
    });

    document.getElementsByTagName('html')[0].classList.add('overflow-hidden');

    dialogRef.afterClosed().subscribe(result => {
      document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
    });
  }

  search() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('table');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }
}

