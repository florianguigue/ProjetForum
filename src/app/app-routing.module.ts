import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StudentInfoComponent} from './student-info/student-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'studentInfo/:studentId', component: StudentInfoComponent},
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
