import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,Form, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { DataService } from '../service/data.service';

interface Dropdown{
  id: string,
  name: string
}
interface Test{
  slN: number,
  sample_Id: string,
  name:string,
  cid:string,
  work_Agency:string,
  test_RTPCR:string,
  test_AG:string,
  test_AB:string,
  test_date:string,
  exp_date:string,
}


@Component({
  selector: 'app-desuung',
  templateUrl: './desuung.component.html',
  styleUrls: ['./desuung.component.scss']
})

export class DesuungComponent implements OnInit,AfterViewInit  {
  
  displayedColumns: string[] = ['slNo', 'sample_id', 'Subject.name', 'Subject.cid', 'testType','testResult','place','test_date', 'exp_date'];
  dataSource: any;
  tests:Array<any> =[];
  searchForm:FormGroup;

  dates:Array <any> =[];
 
  agencyCategories: Dropdown [] =[]
  agencies:Dropdown[] =[]


  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.reactiveForms();

    this.getAgencyCategories();
    // this.dataService.getCertificates().subscribe(res=>{
    //   if(res.success === "true"){

    //     this.tests = res.data
    //     this.dataSource = new MatTableDataSource<Test>(this.tests);
    //     // this.dataSource.sort = this.sort;
    //     var maleD = Object.keys(maleD = res.data.map(function(item) {
    //       return item.test_date.slice(0,10)
    //     }).reduce(function(acc,curr){
    //         acc[curr] = acc[curr] + 1 || 1;
    //         return acc;
    //     }, [])).map(function(item){
    //         return {testDate: item, value: maleD[item]}
    //     });
    //     maleD.forEach(element => {
    //       this.dates.push(element.testDate)

    //     });
    //   }
    // })
  }
  ngAfterViewInit(): void {
    this.dataService.getCertificates().subscribe(res=>{
      if(res.success === "true"){

        this.tests = res.data.filter(x=>{
          return x.Subject.work_category == 3
        })
        console.log("filder there")
        console.log(this.tests)
        this.dataSource = new MatTableDataSource(this.tests);

        this.dataSource.sortingDataAccessor = (item,property) => {
          switch(property) {
            case 'Subject.name' :return item.Subject.name;
            break;
            case 'Subject.work_agency' :return item.Subject.work_agency;
            
            default: return item[property]
                      
          }
        }

        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sort = this.sort;
        var maleD = Object.keys(maleD = res.data.map(function(item) {
          return item.test_date.slice(0,10)
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {testDate: item, value: maleD[item]}
        });
        maleD.forEach(element => {
          this.dates.push(element.testDate)
        });
      }
    })
  }

  getAgencyCategories(){
    this.dataService.getAgencyCategories().subscribe(res => {
      this.agencyCategories = res.data
    })
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
  getAgencies(agencyCategoryId){
    this.dataService.getAgencies(agencyCategoryId).subscribe(response => {
      this.agencies = response.data
    })
  }
  reactiveForms(){
    this.searchForm = this.fb.group({
      agencyControl: [],
      dateControl:[]

    });
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

