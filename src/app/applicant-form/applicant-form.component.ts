import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {WishlistComponent} from '../wishlist/wishlist.component';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['../styles/applicant-form.css']
})
export class ApplicantFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

  }

  openDialog() {
    this.matDialog.open(WishlistComponent);
  }

}
