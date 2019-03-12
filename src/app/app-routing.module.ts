import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdministrationComponent} from './administration/administration.component';
import {StudentInfoComponent} from './student-info/student-info.component';
import {PlanningComponent} from './planning/planning.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'studentInfo/:studentId', component: StudentInfoComponent},
  { path: 'administration', component: AdministrationComponent},
  { path: 'planning', component: PlanningComponent}
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
