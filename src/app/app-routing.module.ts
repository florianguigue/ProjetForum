import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdministrationComponent} from './administration/administration.component';
import {PlanningComponent} from './planning/planning.component';
import {PlanningAdministrationComponent} from './planning-administration/planning-administration.component';
import {UserListComponent} from './user-list/user-list.component';
import {ApplicantFormComponent} from './applicant-form/applicant-form.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuardService]},
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuardService]},
  { path: 'planning-administration', component: PlanningAdministrationComponent, canActivate: [AuthGuardService]},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService]},
  { path: 'account', component: ApplicantFormComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
