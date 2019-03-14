import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdministrationComponent} from './administration/administration.component';
import {StudentInfoComponent} from './student-info/student-info.component';
import {PlanningComponent} from './planning/planning.component';
import {PlanningAdministrationComponent} from './planning-administration/planning-administration.component';
import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'studentInfo/:studentId', component: StudentInfoComponent},
  { path: 'administration', component: AdministrationComponent},
  { path: 'planning', component: PlanningComponent},
  { path: 'planning-administration', component: PlanningAdministrationComponent},
  { path: 'users', component: UserListComponent}
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
