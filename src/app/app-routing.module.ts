import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { RouteGuard } from './service/route.guard';
import { RegisterStatusComponent } from './register-status/register-status.component';
import { RecordVerifyComponent } from './record-verify/record-verify.component';
import { VerifyComponent } from './verify/verify.component';
import { AddResultComponent } from './add-result/add-result.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { SampleIdComponent } from './sample-id/sample-id.component';
import { AdminComponent } from './admin/admin.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FrontlineDashComponent } from './frontline-dash/frontline-dash.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';
import { PlannerDashboardComponent } from './planner-dashboard/planner-dashboard.component';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import { DesuungComponent } from './desuung/desuung.component';
import { RegisterFrontline } from "./register-frontline/register-frontline.component";
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'register', component: RegisterStatusComponent},
  {path: 'navigate', component: RecordVerifyComponent},
  {path:'thank-you', component:ThankyouComponent},
  {path: 'frontline-registration', component:RegisterFrontline},
  {path: 'admin', component:AdminComponent,
    children: [
    { path: 'dashboard', component: MainDashboardComponent },
    {path:'frontliner-dash', component:FrontlineDashComponent},
    {path:'test-dash', component:TestDashboardComponent},
    {path:'team-summary', component:TeamSummaryComponent},
    {path:'desuung', component:DesuungComponent}
  ],},
  {path: 'verify', component:VerifyComponent},
  {path: 'add-result', component: AddResultComponent},
  {path: 'generateCertificate/:cid', component:GenerateCertificateComponent},
  {path: 'selectzone', component:SelectZoneComponent},
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
