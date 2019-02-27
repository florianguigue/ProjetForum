import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentInfoComponent } from './student-info/student-info.component';
import {SharedService} from './services/shared.service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {SimplePdfViewerModule} from 'simple-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentInfoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SimplePdfViewerModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
