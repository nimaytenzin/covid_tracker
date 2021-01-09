import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
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
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { RegisterStatusComponent } from './register-status/register-status.component';
import { FrontlineDashComponent } from './frontline-dash/frontline-dash.component';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RecordVerifyComponent } from './record-verify/record-verify.component';
import { VerifyComponent } from './verify/verify.component';
import { AddResultComponent } from './add-result/add-result.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';
import { SummaryComponent } from './summary/summary.component';


import { SampleIdComponent } from './sample-id/sample-id.component';
import { MatTableModule } from '@angular/material';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    SelectZoneComponent,
    ChangePasswordComponent,
    CameraComponent,
    UploadImageComponent,
    RegisterStatusComponent,
    FrontlineDashComponent,
    GenerateQrComponent,
    RecordVerifyComponent,
    VerifyComponent,
    AddResultComponent,
    ScannerComponent,
    GenerateCertificateComponent,
    PublicDashboardComponent,

    SummaryComponent,

    SampleIdComponent,
    ConfirmModalComponent,
    AdminComponent

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
    QRCodeModule,
    ZXingScannerModule,
    MatTableModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ ScannerComponent,ConfirmModalComponent]
})
export class AppModule { }
