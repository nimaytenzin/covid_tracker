import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

export interface CertificateObj{
  createdAt: string;
  exp_date: string;
  id: number;
  operator_id: number;
  place: string;
  status: string;
  subject_id : number;
  test_date : string;
  test_result : string;
  test_type : string;
  tester_id : number;
  updatedAt : string;
  utid : string;
  
}

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  pendingSubjects: []
  constructor(
    private dataservice: DataService,
    private router: Router,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataservice.getPendingCertificate().subscribe(res => {
      this.pendingSubjects = res.data
  
    })
  }

  setResult(id,result){
    let obj = {
      id: id,
      test_result: result
    }
    this.dataservice.setTestResult(obj).subscribe( res=>{
      if(res.success === "true"){
        location.reload();

      }
    })
  }

  openModal(id,result,subject_id) {
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
      dialogConfig.id = "confirm-modal";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      
      dialogConfig.data = {
      id: id,
      test_result: result,
      subject_id: subject_id
    }
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }
}
