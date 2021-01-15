import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '../export.service';
import { DataService } from '../service/data.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

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
  agencyCategoryArray =[];

  dropdownList = [];
  selectedItems = [];

  tests= [];
  selectedOperators =[7,8];
  dropdownSettings:IDropdownSettings;
  
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    
    this.getAgencyName(2)

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
            this.tests = data 
       })
      }    
   }

  }

  getAgencyName(id){
    this.dataService.getAgencyCategories().subscribe((res) => {
      this.agencyCategoryArray = res.data
      console.log(this.agencyCategoryArray)
      console.log(this.agencyCategoryArray.find(obj => obj.id === id).name)  
    })
    
  }
 

}
