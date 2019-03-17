import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../model/settings';

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

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
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

  plannify() {
    return;
  }
}

