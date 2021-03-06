import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { elementAt } from 'rxjs/operators';
import { ExportService } from '../export.service';
import { DataService } from '../service/data.service';

interface Dropdown{
  id: string,
  name: string
}


@Component({
  selector: 'app-frontline-dash',
  templateUrl: './frontline-dash.component.html',
  styleUrls: ['./frontline-dash.component.scss']
})



export class FrontlineDashComponent implements OnInit {
  totalFrontliners:any;
  frontlinerMale:any;
  frontlinerFemale:any;
  filterDataForm: FormGroup;

  @ViewChild('testTable', {static: false}) testTable: ElementRef;

  // dzongkhags: Dropdown[] = [];
  // zones: Dropdown[] = [];
  agencyCategories: Dropdown [] =[]
  agencies:Dropdown[] =[]
  superZones: Dropdown[] = [];
  showTable:boolean;
  totalCount:number;
  totalMale:number;
  totalFemale:number;
  agencyName:string;
  dzongkhagName:string;
 

  dataSource:any;
  Subjects:Array<any> =[];

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    // this.getDzongkhagList();
    this.reactiveForm();
    this.getAgencyCategories();
    this.showTable = false
  }

  reactiveForm(){
    this.filterDataForm = this.fb.group({
      workDzongkhagControl:[],
      zoneControl:[],
      agencyCategoryControl:[],
      agencyControl:[]
    })
  }

  
  // getDzongkhagList() {
  //   this.dataService.getDzongkhags().subscribe(response => {
  //     this.dzongkhags = response.data;
  //   });
  // }
  getAgencyCategories(){ 
    this.dataService.getAgencyCategories().subscribe(response => {
      this.agencyCategories = response.data
    })
  }
  getAgencies(agencyCategoryId){
    this.dataService.getAgencies(agencyCategoryId).subscribe(response => {
      this.agencies = response.data
      console.log(response.data)
    })
  }

  // getZones(dzoId){
  //   this.dataService.getZones(dzoId).subscribe(response => {
  //     this.zones = response.data
  //   })
  // }
  // getZoneList(dzongkhagId) {
  //   this.dataService.getZones(dzongkhagId).subscribe(response => {
  //     this.superZones = response.data;
  //   });
  // }

  // sortByDzongkhag(){
  //   this.showTable = true
  //   let dzongkhag = this.filterDataForm.get('workDzongkhagControl').value
  //   let subZone = this.filterDataForm.get('zoneControl').value
  //   function getKeyByValue(object, value) {
  //     return Object.keys(object).find(key => object[key] === value);
  //   }
      
  //   let array= [];
  //   if(subZone === null){
   
  //     this.dataService.getAllSubjects().subscribe(res => {
  //       res.data.forEach(item => {
  //         if(item.work_dzongkhag === dzongkhag){
  //           array.push(item)
  //         }         
  //       }); 
  //       this.dataSource = array;        
  //       array.forEach(item => {
  //         if(item.sex === "Male"){
  //           this.totalMale += 1
  //         }else if (item.sex === "Female"){
  //           this.totalFemale +=1
  //         }
  //       })
  //       this.totalCount = array.length        
  //     })
  //   }else{
  //     this.dataService.getAllSubjects().subscribe(res => {
  //       res.data.forEach(item => {
  //         if(item.work_zone === subZone){
  //           array.push(item)
  //         }         
  //       }); 
  //       this.dataSource = array;
  //       array.forEach(item => {
  //         if(item.sex === "Male"){
  //           this.totalMale += 1
  //         }else if (item.sex === "Female"){
  //           this.totalFemale +=1
  //         }
  //       })
  //       this.totalCount = array.length        
  //     })
  //   }

    

  // }
  clear(){
    this.filterDataForm.reset()
  }

  sortByAgency(){
    this.totalCount =0;
    this.totalFemale =0;
    this.totalMale =0;
    this.showTable = true
    let agencyCategory = this.filterDataForm.get('agencyCategoryControl').value
    let agency = this.filterDataForm.get('agencyControl').value
    let array2=[]

    if(agency === null){
        this.dataService.getAllSubjects().subscribe(res =>{
        res.data.forEach(item => {
          if(item.work_category === agencyCategory){
            array2.push(item)
          }
          this.dataSource = array2;
          this.totalCount = array2.length
          this.totalFemale=0
          this.totalMale =0
          array2.forEach(item => {
            if(item.sex === "Male"){
              this.totalMale += 1
            }else if (item.sex === "Female"){
              this.totalFemale +=1
            }
          })
        });
      })
    }else{
      this.dataService.getAllSubjects().subscribe(res =>{
        res.data.forEach(item => {
          if(item.work_agency === agency){
            array2.push(item)
          }
          this.dataSource = array2;
          this.totalCount = array2.length
          this.totalFemale=0
          this.totalMale =0
          array2.forEach(item => {
            if(item.sex === "Male"){
              this.totalMale += 1
            }else if (item.sex === "Female"){
              this.totalFemale +=1
            }
          })
        });
      })
    }
    
  }

  
  exportToExcelAgency(): void { 
    let name;
    let name2;
    console.log(this.agencyCategories)
    this.agencyCategories.forEach(element => {
      if(element.id === this.filterDataForm.get('agencyCategoryControl').value){
          name = element.name
      }
    })

    this.agencies.forEach(element => {
     if(element.id === this.filterDataForm.get('agencyControl').value){
        name2 = element.name
     }
    })

    this.exportService.exportTableElmToExcel(this.testTable, `${name2 || name}`)
  }

  // exportToExcelDzongkhag(): void {
  //   console.log(this.filterDataForm.get('agencyControl').value)
  //   let s = this.filterDataForm.get('agencyControl').value
  //   this.exportService.exportTableElmToExcel(this.testTable, `${s}`);
  // }


}
