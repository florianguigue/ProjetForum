import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../model/settings';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../model/user';
import {AccountType} from '../enums/account-type.enum';
import * as _ from 'lodash';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['../styles/administration.css']
})
export class AdministrationComponent implements OnInit {
  settingsForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;

  public settings: Settings;
  public users = [];
  private user: User;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {

    this.userService.getUserList().subscribe(
      (response) => {
        response.forEach((user) => {
          this.user = new User(user._id, user.email, user.account, user.user_type, user.wish_list);
          this.users.push(this.user);
        });
      }, () => {
        const userType = this.sharedService.connectedUser.userType === AccountType.COMPANY ? 'candidats' : 'enterprises';
        this.notifications.error('Erreur lors de la récupération des ' + userType, '');
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
      return;
    } else {
      this.settingsService.updateSettings(this.settingsForm.controls);
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
        this.notifications.success('Utilisateur supprimé avec succès', '');
      }, () => {
        this.notifications.error('Erreur lors de la suppression de l\'utilisateur', '');
      }
    );
  }

  plannify() {
    return;
  }
}

