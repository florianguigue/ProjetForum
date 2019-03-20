import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StudentInfoComponent} from './student-info/student-info.component';
import {SharedService} from './services/shared.service';
import {SimplePdfViewerModule} from 'simple-pdf-viewer';
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
import {EditAccountComponent} from './edit-account/edit-account.component';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AccountComponent} from './account/account.component';
import {EditUserComponent} from './edit-user/edit-user.component';

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
    EditAccountComponent,
    AccountComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SimplePdfViewerModule,
    DragDropModule
  ],
  providers: [SharedService, UserService, SettingsService, CookieService, AuthService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [
    StudentInfoComponent,
    WishlistComponent,
    AccountComponent,
    EditUserComponent
  ]
})
export class AppModule {
}
