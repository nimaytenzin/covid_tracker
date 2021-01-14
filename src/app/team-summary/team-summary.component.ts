import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '../export.service';
import { DataService } from '../service/data.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatTableDataSource } from '@angular/material';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
// interface Test {
//   operator_id: number,
//   sample_id:number,
//   Subject.name:string,


//   '', 
//   'Subject.name',
//    'Subject.cid', 
//   'Subject.contact',
//   'test_RTPCR',
//   'test_AG',
//   'test_AB',
//   'test_date', 
//   ];
// }

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.scss']
})
export class TeamSummaryComponent implements OnInit {
  @ViewChild('testTable', {static: false}) testTable: ElementRef;

  message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  

  dropdownList = [];
  selectedItems = [];
  // displayedColumns: string[] = 
  //     ['slNo', 
  //     'operator_id',
  //     'sample_id', 
  //     'Subject.name',
  //      'Subject.cid', 
  //     'Subject.contact',
  //     'test_RTPCR',
  //     'test_AG',
  //     'test_AB',
  //     'test_date',
  //     "test_place"
  //     ];

  // operatorId:number;
  tests= [];
  selectedOperators =[7,8];
  dropdownSettings:IDropdownSettings;
  
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    

    this.dataService.getAllOperators().subscribe(res => {
      this.dropdownList = res.data
    })
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }

  onItemSelect(item: any) {

    if(this.selectedItems.indexOf(item) !== -1) {
      this.selectedItems.concat(item);
    }
    
  }

  openSnackBar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this._snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }

  exportToExcel(): void {

    var d = new Date(Date.now())
    var s = d.toDateString()
    s.replace(/\s+/g,'_').toLowerCase();
          
    let oId = sessionStorage.getItem('operatorId')
    this.exportService.exportTableElmToExcel(this.testTable, `${s}`);
  }
  

  getSummary(){       
    let data= [];
    if(this.selectedItems.length === 0){
      this.message = "Select Operators"
      this.openSnackBar()
    }else{
      for(let i in this.selectedItems){
        this.dataService.getCertificateByOperatorId(this.selectedItems[i].id).subscribe(res => {
          for(let index in res.data){
            data.push(res.data[index])
          }
          if(data.length === 0){
            this.message = "No Data for selected Operators"
            this.openSnackBar()
          }else{
            this.tests = data
          }
       })
    }

     
   }

  
  //   
  }

  

}
