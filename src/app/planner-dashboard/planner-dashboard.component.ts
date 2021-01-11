import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../service/data.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-planner-dashboard',
  templateUrl: './planner-dashboard.component.html',
  styleUrls: ['./planner-dashboard.component.scss']
})
export class PlannerDashboardComponent implements OnInit {
  // canvas1: any;
  // ctx1:any;
  // forecastLineLabel: Array <any> = [];
  // forecastLineData: Array <any> = [];
  // upcomingTests:any;
  // todayDate: any;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {

    // this.upcomingTests = 42;

    // this.todayDate = new Date
   
    // //get todays date in miliseconds
    // //get today + 7 days in miliseconds
    // //

  
    // console.log(`Todays date in mili ${Date.parse(this.todayDate)}`)

    // let nextWeek = Date.parse(this.todayDate) + 604800000
    //  console.log( `${new Date(nextWeek)}`)

    // Chart.plugins.unregister(ChartDataLabels);
    // this.testForecastLineChart()
    // this.dataService.getCertificates().subscribe(res=>{
    //   if(res.success === "true"){
        
    //     let gg = Date.parse(res.data[1].exp_date)
    //     console.log(gg)
    //     //Array mapping for expiry date line charts
    //     var arr2 = Object.keys(arr2 = res.data.map(function(item) {
    //       return item.exp_date.slice(0,10);
    //     }).reduce(function(acc,curr){
    //         acc[curr] = acc[curr] + 1 || 1;
    //         return acc;
    //     }, [])).map(function(item){
    //         return {exp_date: item, value: arr2[item] }
    //     });

    //     arr2.forEach(element => {
    //       this.forecastLineData.unshift(element.value)
    //       this.forecastLineLabel.unshift(element.exp_date)
    //     }); 
  
    //     this.testForecastLineChart()
    //   }
    // })
  }


  // 
  

}
