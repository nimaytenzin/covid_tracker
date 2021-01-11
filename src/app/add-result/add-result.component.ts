import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface CertificateObj{
  exp_date: string;
  id: number;
  operator_id: number;
  place: string;
  status: string;
  subject_id : number;
  test_date : string;
  test_result : string;
  test_type : string;
  utid : string;
}
interface Certificate{
  sample_id: string;
  name: string;
  cid: string;
  result_RTPCR: string;
  result_AG: string;
  result_AB: string;
  test_date: string;
}

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AddResultComponent implements OnInit {

  pendingSubjects: []
  pendingCertificates:Certificate[] = []
  selection = new SelectionModel<Certificate>(true, []);

  pendingTests = null;
  displayedColumns: string[] = ['select', 'sample_id', 'name', 'cid', 'rt','ag','ab','test_date'];
  disableButton = true;
  expandedElement: Certificate;

  currentCheckbox = {
    id: null,
    current_rt : false,
    current_ag : false,
    current_ab : false
  }

  constructor(
    private dataservice: DataService,
    private router: Router,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataservice.getPendingCertificate().subscribe(res => {
      // this.pendingSubjects = res.data
      this.pendingCertificates = res.data
      this.pendingTests = new MatTableDataSource<Certificate>(this.pendingCertificates)
    })
  }
  resetCheckbox(){
    this.currentCheckbox.current_rt = false
    this.currentCheckbox.current_ag = false
    this.currentCheckbox.current_ab = false
    this.currentCheckbox.id = null
  }

  setRtPositive(id,checked){
      this.currentCheckbox.id = id 
      this.currentCheckbox.current_rt = checked 
      console.log(this.currentCheckbox)
  }
  setAgPositive(id,checked){
      this.currentCheckbox.id = id 
      this.currentCheckbox.current_ag= checked 
      console.log(this.currentCheckbox)
  }
  setAbPositive(id,checked){
      this.currentCheckbox.id = id 
      this.currentCheckbox.current_ab= checked 
      console.log(this.currentCheckbox)
  }

  // setCurrentPositive(){
  //   console.log(this.currentCheckbox)
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.pendingTests.data.length;
    return numSelected === numRows;
  }

  onSelectChange(){
    if(this.selection.selected.length == 0){
      this.disableButton = true 
    }else{
      this.disableButton = false 
    }
    console.log(this.selection.selected)
  }
  

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.pendingTests.data.forEach(row => this.selection.select(row));
  }

  setNegative(){
    this.resetCheckbox()
    this.openModal()
  }

  openModal() {
    if(this.currentCheckbox.current_ab || this.currentCheckbox.current_ag || this.currentCheckbox.current_rt){
      console.log("positive submission")
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "confirm-modal";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";

      dialogConfig.data = this.currentCheckbox;
      const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    }else{
      if(this.selection.selected.length > 0){
        console.log("negative submission")
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = "confirm-modal";
        dialogConfig.height = "350px";
        dialogConfig.width = "600px";

        dialogConfig.data = this.selection.selected;
        const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
      }
    }
  }
}
