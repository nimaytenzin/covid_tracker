import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuard } from './service/route.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MapComponent } from './map/map.component';
import { RegisterUnitComponent } from './register-unit/register-unit.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { RegisterStatusComponent } from './register-status/register-status.component';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { RecordVerifyComponent } from './record-verify/record-verify.component';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'register', component: RegisterStatusComponent},
  {path: 'navigate', component: RecordVerifyComponent},
  {path: 'verify', component:VerifyComponent},
  {path: 'selectzone', component:SelectZoneComponent},
  {path: 'dashboard/:id', component: DashboardComponent},
  {path: 'building', component: RegisterComponent },
  {path: 'unit', component: RegisterUnitComponent},
  {path: 'map', component: MapComponent },
  {path: 'generateQr', component: GenerateQrComponent},
  {path: 'camera',component: UploadImageComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
