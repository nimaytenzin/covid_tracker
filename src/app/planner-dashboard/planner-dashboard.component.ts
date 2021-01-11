import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-planner-dashboard',
  templateUrl: './planner-dashboard.component.html',
  styleUrls: ['./planner-dashboard.component.scss']
})
export class PlannerDashboardComponent implements OnInit {
  canvas1: any;
  ctx1:any;
  forecastLineLabel: Array <any> = [];
  forecastLineData: Array <any> = [];
  
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.testForecastLineChart()
    this.dataService.getCertificates().subscribe(res=>{
      if(res.success === "true"){
     
        //Array mapping for expiry date line charts
        var arr2 = Object.keys(arr2 = res.data.map(function(item) {
          return item.exp_date.slice(0,10);
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {exp_date: item, value: arr2[item] }
        });

        arr2.forEach(element => {
          this.forecastLineData.unshift(element.value)
          this.forecastLineLabel.unshift(element.exp_date)
        }); 
  
        this.testForecastLineChart()
      }
    })
  }


  testForecastLineChart(){
    Chart.defaults.global.legend.display = false;
    console.log('it runs')
    this.canvas1 = document.getElementById('testForecastLineChart');
    this.ctx1 = this.canvas1.getContext('2d');
    let myChart = new Chart(this.ctx1, {
      type: 'line',
      data: {
      labels: this.forecastLineLabel,
      datasets: [{
            data: this.forecastLineData,
            backgroundColor:"transparent",
            borderColor:"rgb(63,81,181)",
            pointRadius: 5,
            pointHoverRadius: 20,
            pointHitRadius: 30,
            pointBorderWidth: 2,
      }]
      },
      options: {
        title: {
              display: true,
              fontSize: 20,
              text: 'Test Forecast '
          },
        lengend:{
          display: false
       },
       scales: {
        xAxes: [{
            gridLines: {
                display:false
            }
        }],
        yAxes: [{
            gridLines: {
                display:false
            }   
        }]
    }
      },
      maintainAspectRatio: true,
      responsive: true,
      display:true
      
    })

  }

}
