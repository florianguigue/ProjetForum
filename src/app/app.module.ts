import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentInfoComponent } from './student-info/student-info.component';
import {SharedService} from './services/shared.service';
import {SimplePdfViewerModule} from 'simple-pdf-viewer';
import {UserService} from './services/user.service';
import {AdministrationComponent} from './administration/administration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlanningComponent } from './planning/planning.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentInfoComponent,
    AdministrationComponent,
    NavigationComponent,
    PlanningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SimplePdfViewerModule
  ],
  providers: [SharedService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
