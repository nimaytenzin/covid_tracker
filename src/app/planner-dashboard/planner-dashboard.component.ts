import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-planner-dashboard',
  templateUrl: './planner-dashboard.component.html',
  styleUrls: ['./planner-dashboard.component.scss']
})
export class PlannerDashboardComponent implements OnInit {
  canvas6: any;
  ctx6:any;
  forecastLineLabel: Array <any> = [];
  forecastLineData: Array <any> = [];
  
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
     
    this.dataService.getCertificates().subscribe(res=>{
      if(res.success === "true"){
       
        //Array mapping for expiry date line charts
        var arr2 = Object.keys(arr2 = res.data.map(function(item) {
          return item.exp_date;
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {exp_date: item, value: arr2[item] }
        });

        arr2.forEach(element => {
          this.forecastLineData.push(element.value)
          this.forecastLineLabel.push(element.exp_date)
        }); 
        console.log(this.forecastLineData)
        console.log(this.forecastLineLabel)

        this.testForecastLineChart()
      }
    })
  }


  testForecastLineChart(){
    Chart.defaults.global.legend.display = false;
    this.canvas6 = document.getElementById('testForecastLineChart');
    this.ctx6 = this.canvas6.getContext('2d');
    let myChart = new Chart(this.ctx6, {
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
      maintainAspectRatio: false,

      responsive: true,
      display:true
      
    })

  }

}
