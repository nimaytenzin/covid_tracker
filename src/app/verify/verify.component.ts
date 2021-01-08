import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScannerComponent } from '../scanner/scanner.component';
import { MatDialog } from '@angular/material';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
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
    private fb:FormBuilder,
    private router: Router,
    private dialog: MatDialog,
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
     this.dataService.getSubjects(this.verifyForm.get('cidControl').value).subscribe( res => {
        if(res.success === "true"){

          console.log(res.data)
          let id = res.data.id;
          this.subjectName = res.data.name
          this.subjectCID = res.data.cid
          this.workAgency = res.data.Agency.name
          this.subjectAge = res.data.age
          this.dataService.getCertificateBySubjectId(id).subscribe( res => {
            this.showCertificates = true;
            this.certificates = res.data
          })
        }
     }
     )
  }
  
  triggerCamera() {
    const dialogRef = this.dialog.open(ScannerComponent, {
      width: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.getSubjectByUtid(result).subscribe(res=>{
        this.router.navigate([`/generateCertificate/${res.data.cid}`])
      })
    });
  }

  generateCertificate(){
    this.subjectCID = this.verifyForm.get('cidControl').value;
    this.router.navigate([`/generateCertificate/${this.subjectCID}`])
  }

}
