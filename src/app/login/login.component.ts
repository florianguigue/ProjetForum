import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {AccountType} from '../enums/account-type.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


/**
 * Module de gestion de l'authentification pour les étudiants, les entreprises et les administrateurs.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/login.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.login();
    }
  }

  login() {
    switch (this.sharedService.connectedUser.userType) {
      case AccountType.ADMIN:
        this.router.navigate(['/planningGlb']);
        break;
      case AccountType.COMPANY:
        this.router.navigate(['/companyInfo']);
        break;
      case AccountType.APPLICANT:
        this.router.navigate(['/studentInfo']);
    }
  }
}
