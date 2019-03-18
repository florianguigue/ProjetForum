import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {WishlistComponent} from '../wishlist/wishlist.component';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['../styles/applicant-form.css']
})
export class ApplicantFormComponent implements OnInit {

  userForm: FormBuilder;

  constructor(
    private matDialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    return;
  }

  openWishlist() {
    this.matDialog.open(WishlistComponent);
  }

}
