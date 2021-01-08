import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { RouteGuard } from './service/route.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { RegisterStatusComponent } from './register-status/register-status.component';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { RecordVerifyComponent } from './record-verify/record-verify.component';
import { VerifyComponent } from './verify/verify.component';
import { AddResultComponent } from './add-result/add-result.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { SampleIdComponent } from './sample-id/sample-id.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'register', component: RegisterStatusComponent},
  {path: 'navigate', component: RecordVerifyComponent},
  {path: 'verify', component:VerifyComponent},
  {path: 'add-result', component: AddResultComponent},
  {path: 'generateCertificate/:cid', component:GenerateCertificateComponent},
  {path: 'selectzone', component:SelectZoneComponent},
  {path: 'generateQr/:hash/:id', component: GenerateQrComponent},
  {path: 'camera',component: UploadImageComponent},
  {path: 'public-dash', component:PublicDashboardComponent},

  {path: 'summary', component:SummaryComponent},
  
  {path: 'sampleid/:sampleid', component:SampleIdComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
