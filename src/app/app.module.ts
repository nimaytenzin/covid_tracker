import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatGridListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MapComponent } from './map/map.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RegisterUnitComponent } from './register-unit/register-unit.component';
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { RegisterStatusComponent } from './register-status/register-status.component';
import { FrontlineDashComponent } from './frontline-dash/frontline-dash.component';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { RecordVerifyComponent } from './record-verify/record-verify.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    SelectZoneComponent,
    DashboardComponent,
    ChangePasswordComponent,
    MapComponent,
    ConfirmDialogComponent,
    RegisterUnitComponent,
    CameraComponent,
    UploadImageComponent,
    RegisterStatusComponent,
    FrontlineDashComponent,
    GenerateQrComponent,
    RecordVerifyComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatRippleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatListModule,
    MatCheckboxModule,
    WebcamModule,
    NgxQRCodeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ ConfirmDialogComponent]
})
export class AppModule { }
