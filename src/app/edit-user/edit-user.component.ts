import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['../styles/edit-account.css']
})
export class EditUserComponent implements OnInit {

  public userForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {

  }
}
