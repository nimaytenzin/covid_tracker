import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '../export.service';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  operatorId;
  tests;

  @ViewChild('testTable', {static: false}) testTable: ElementRef;

  constructor(
    private dataService: DataService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    this.operatorId = sessionStorage.getItem('operatorId')
    
    this.dataService.getCertificateByOperatorId(this.operatorId).subscribe(res=>{
      if(res.success === "true"){
        this.tests = res.data

      }
    })
  }

  exportToExcel(): void {
    this.exportService.exportTableElmToExcel(this.testTable, 'sample_table');
  }
}
