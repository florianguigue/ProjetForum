import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StudentInfoComponent} from './student-info/student-info.component';
import {SharedService} from './services/shared.service';
import {UserService} from './services/user.service';
import {AdministrationComponent} from './administration/administration.component';
import {NavigationComponent} from './navigation/navigation.component';
import {PlanningComponent} from './planning/planning.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PlanningAdministrationComponent} from './planning-administration/planning-administration.component';
import {UserListComponent} from './user-list/user-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {MatDialogModule} from '@angular/material';
import {SettingsService} from './services/settings.service';
import {ApplicantFormComponent} from './applicant-form/applicant-form.component';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AccountComponent} from './account/account.component';
import {FileUploadModule} from 'ng2-file-upload';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentInfoComponent,
    AdministrationComponent,
    NavigationComponent,
    PlanningComponent,
    WishlistComponent,
    PlanningAdministrationComponent,
    UserListComponent,
    ApplicantFormComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
    DragDropModule,
    FileUploadModule,
    HttpClientModule

  ],
  providers: [SharedService, UserService, SettingsService, CookieService, AuthService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [
    StudentInfoComponent,
    WishlistComponent,
    AccountComponent
  ]
})
export class AppModule {
}
