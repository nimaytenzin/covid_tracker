import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import * as Chart from 'chart.js';
import { DataService } from '../service/data.service';


// interface Fronliners{
//   slN: number,
//   name: string,
//   sex:string,
//   age:string,
//   contact:string,
//   work_Agency:string,
//   work_zone:string
// }

@Component({
  selector: 'app-frontline-dash',
  templateUrl: './frontline-dash.component.html',
  styleUrls: ['./frontline-dash.component.scss']
})



export class FrontlineDashComponent implements OnInit {
  totalFrontliners:any;
  frontlinerMale:any;
  frontlinerFemale:any;
  // dataSource:any;

  // displayedColumns: string[] = ['slNo', 'name', 'sex', 'age', 'contact', 'work_agency', 'work_zone'];

  canvas1: any;
  ctx1: any;
  canvas2:any;
  ctx2:any;

  frontlinerAgencyData: Array<any> =[];
  frontlinerAgencyLabel:Array<any> =[];
  frontlinerDzongkhagData: Array<any> =[];
  frontlinerDzongkhagLabel:Array<any> =[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.totalFrontliners = 0;
    this.frontlinerMale = 0;
    this.frontlinerFemale =0;

    this.dataService.getAllSubjects().subscribe(res => {


    // this.dataSource = new MatTableDataSource<Fronliners>(res.data);
    //card value Definition
       this.totalFrontliners = res.data.length;

        res.data.forEach(item => {
          if(item.sex === "Male"){
            this.frontlinerMale +=1;
          }else if(item.sex === "Female"){
            this.frontlinerFemale +=1;
          }
        })

        var arr2 = Object.keys(arr2 = res.data.map(function(item) {
          return item.work_category
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {testDate: item, value: arr2[item]}
        });
        arr2.forEach(element => {
          this.frontlinerAgencyLabel.unshift(element.testDate)
          this.frontlinerAgencyData.unshift(element.value)
        });
        this.frontlinersByAgencyChart()
    })

    
    
  }

  frontlinersByAgencyChart(){
    Chart.defaults.global.legend.display = false;
    
    this.canvas1 = document.getElementById('testByAgencyBarChart');
    this.ctx1 = this.canvas1.getContext('2d');
    let myChart = new Chart(this.ctx1,{
      type: 'bar',
      data: {
          labels: this.frontlinerAgencyLabel,
          datasets: [{
              label: 'Nos of Tests',
              data: this.frontlinerAgencyData,
              backgroundColor: [
                  '#FFC05C',
                  '#3F51B5',
                  '#b8f4ff',
                  '#cc759a',
                  '#4faaa1',
                  '#edffc9'
             ],
              borderWidth: 1
          }]
      },
      options: {
        datalabels:{
          color: 'red'
        },
        title: {
          display: true,
          fontSize: 20,
          text: 'Frontliners by Agency'
      },
      maintainAspectRatio: false,
        responsive: true,
        display:true
      },
     
    });
  }
}
