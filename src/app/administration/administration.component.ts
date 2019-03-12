import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['../styles/administration.css']
})
export class AdministrationComponent implements OnInit {
  settingsForm: FormGroup;
  searchForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

}
