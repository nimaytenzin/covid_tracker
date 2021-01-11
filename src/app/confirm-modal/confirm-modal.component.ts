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
    if('current_rt' in this.data){
      console.log('po9sitive')
      let obj = {
        id: this.data.id,
        result_RTPCR: this.data.current_rt ? "POSITIVE": "NEGATIVE",
        result_AG: this.data.current_ag ? "POSITIVE": "NEGATIVE",
        result_AB: this.data.current_ab ? "POSITIVE": "NEGATIVE",
        status: "ACTIVE"
      }
      // this.dataService.setTestResult(obj).subscribe( res=>{
      //   console.log(res)
      //   if(res.success === "true"){
      //     this.dialogRef.close();
      //     location.reload()
      //   }
      // }) 
      console.log(obj)
    }else{
      console.log('negative')
      console.log(this.data)
      let obj = this.data.map((row)=>{
        let negs = {
          id: row.id,
          result_RTPCR: row.test_RTPCR === "Yes" ? "NEGATIVE": "NA",
          result_AG: row.test_AG === "Yes" ? "NEGATIVE": "NA",
          result_AB: row.test_AB === "Yes" ? "NEGATIVE": "NA",
          status: "ACTIVE"
        }
        return negs
      })
      console.log(obj)

      this.dataService.setTestBulk(obj).subscribe( res=>{
        console.log(res)
        if(res.success === "true"){
          this.dialogRef.close();
          location.reload()
        }
      }) 

    }
  }

  no() {
    this.dialogRef.close();
  }

}
