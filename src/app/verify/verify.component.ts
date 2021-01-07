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
      cidControl:['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  VerifyByCid(){
    this.showVerifyByCid = true
  }

  chechValidity(){
    if (this.verifyForm.valid) {
        const cid = this.verifyForm.get('cid').value;
        alert(cid)
      }
 
  }
  
  triggerCamera() {
    const dialogRef = this.dialog.open(ScannerComponent, {
      width: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.getCertificateByUtid(result).subscribe(resp=>{
        this.certificates = resp.data
      })
    });
  }

}
