import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  testRes :string

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.testRes = this.data.test_result
  }
  
  yes(){
    let obj = {
      id: this.data.id,
      result_RTPCR: this.data.current_rt ? "POSITIVE": "NEGATIVE",
      result_AG: this.data.current_ag ? "POSITIVE": "NEGATIVE",
      result_AB: this.data.current_ab ? "POSITIVE": "NEGATIVE",
      status: "ACTIVE"
    }
    this.dataService.setTestResult(obj).subscribe( res=>{
      console.log(res)
      if(res.success === "true"){
        this.dialogRef.close();
        location.reload()
      }
    }) 
    console.log(obj)
  }

  no() {
    this.dialogRef.close();
  }

}
