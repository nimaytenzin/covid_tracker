import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  showVerifyByCid: boolean;
  verifyForm: FormGroup;
  certificates: any;
  showCertificates:boolean
  data:any;
  subjectName:string
  subjectCID:number
  workAgency:string
  subjectAge:number

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.showVerifyByCid = false;
    this.reactiveForm();
  }

  reactiveForm(){
    this.verifyForm = this.fb.group({
      cidControl:['']
    })
  }

  VerifyByCid(){
    this.showVerifyByCid = true
    
  }

  chechValidity(){
     this.dataService.getSubjects(this.verifyForm.get('cidControl').value)
        .subscribe( res => {
            if(res.success === "true"){
              let id = res.data.id;
              this.subjectName = res.data.name
              this.subjectCID = res.data.cid
              this.workAgency = res.data.work_agency
              this.subjectAge = res.data.age
              this.dataService.getCertificateBySubjectId(id).subscribe( res => {
                this.showCertificates = true;
                this.certificates = res.data
              })
            }
        }
        )
  }

  generateCertificate(){
    this.subjectCID = this.verifyForm.get('cidControl').value;
    this.router.navigate([`/generateCertificate/${this.subjectCID}`])
  }


}
