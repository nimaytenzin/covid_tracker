import { Component, OnInit } from '@angular/core';
import { ExportService } from '../export.service';
import { DataService } from '../service/data.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatTableDataSource } from '@angular/material';
import { type } from 'os';

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

  dropdownList = [];
  selectedItems = [];
  displayedColumns: string[] = 
      ['slNo', 
      'operator_id',
      'sample_id', 
      'Subject.name',
       'Subject.cid', 
      'Subject.contact',
      'test_RTPCR',
      'test_AG',
      'test_AB',
      'test_date',
      "test_place"
      ];

  operatorId:number;
  tests= [];
  selectedOperators =[7,8];
  dataSource :any;
  dropdownSettings:IDropdownSettings;
  
  constructor(
    private dataService: DataService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    
    this.operatorId = 2
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
  onSelectAll(items: any) {
    console.log(items);
  }
  

  getSummary(){ 
        
    let data= [];

    for(let i in this.selectedItems){
      this.dataService.getCertificateByOperatorId(this.selectedItems[i].id).subscribe(res => {
        for(let index in res.data){
          data.push(res.data[index])
        }
        this.dataSource = new MatTableDataSource(data)

     })

     
   }

  
  //   
  }

  

}
