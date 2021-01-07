import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  qr_hash: string;

  constructor(
    private dialogRef: MatDialogRef<ScannerComponent>
  ) { 
    // dialogRef.disableClose = true;
    // dialogRef.backdropClick().subscribe(()=>{
    //   dialogRef.disableClose = true;
    // })
  }

  ngOnInit() {
  }

  onCodeResult(resultString: string) {
    this.dialogRef.close(resultString);
    navigator.vibrate(200);
  }

}
