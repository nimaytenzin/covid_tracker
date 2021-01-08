import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
 

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  
  }
  
  yes(){
  
    console.log(this.data)
    alert(this.data.test_result)
    // this.dataService.setTestResult(this.data).subscribe( res=>{
    //   if(res.success === "true"){
    //     this.dialogRef.close();
    //     location.reload()
    //   }
    // }) 
  }

  no() {
    this.dialogRef.close();
  }

}
