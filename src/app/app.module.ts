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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
import {WebcamModule} from 'ngx-webcam';
import { RegisterStatusComponent } from './register-status/register-status.component';
import { FrontlineDashComponent } from './frontline-dash/frontline-dash.component';
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
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';
import { PlannerDashboardComponent } from './planner-dashboard/planner-dashboard.component';
import { MatSortModule } from "@angular/material";
import {MatTabsModule} from '@angular/material/tabs';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import { DesuungComponent } from './desuung/desuung.component';
import { RegisterFrontline } from "./register-frontline/register-frontline.component";
import { ThankyouComponent } from './thankyou/thankyou.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    SelectZoneComponent,
    RegisterStatusComponent,
    FrontlineDashComponent,
    RecordVerifyComponent,
    VerifyComponent,
    AddResultComponent,
    ScannerComponent,
    GenerateCertificateComponent,
    PublicDashboardComponent,
    SummaryComponent,
    SampleIdComponent,
    ConfirmModalComponent,
    AdminComponent,
    MainDashboardComponent,
    TestDashboardComponent,
    PlannerDashboardComponent,
    TeamSummaryComponent,
    DesuungComponent,
    RegisterFrontline,
    ThankyouComponent

  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    MatSortModule,
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
    MatTableModule,
     NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ ScannerComponent,ConfirmModalComponent]
})
export class AppModule { }
