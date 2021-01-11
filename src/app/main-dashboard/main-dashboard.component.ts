import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  operatorId:any;
 
  //numbers
  totalTests:number;
  totalRtpcrTests:number;
  totalAntigenTests:number;
  totalAntibodyTests:number;
  totalMalesTested:number;
  totalFemalesTested:number;
  totalPositives:number;
  totalNegatives:number;

  //table population
  tests:Array<any> =[];
  totalPending: Array<any> = [];
  totalActive: Array<any> =[];
  totalPostiveTable: Array<any> =[];
  //daily line chart
  lineChartLabel: Array<any> =[];
  lineChartdata: Array<any> = [];
  dailyMaleLineChartLabel: Array<any> =[];
  dailyMaleLineChartData:Array<any> =[];
  dailyFemaleLineChartLabel: Array<any> =[];
  dailyFemaleLLineChartData:Array<any> =[];

  gg: Array<any> =[];
  fem:Array <any> =[];

  testAgencyBarData: Array<any> = [];
  testAgencyBarLabel: Array<any> = [];
  testDzongkhagBarLabel: Array<any> = [];
  testDzongkhagBarData: Array<any> = [];
 

  canvas1: any;
  ctx1: any;
  canvas2: any;
  ctx2: any;
  canvas3:any;
  ctx3:any;
  canvas4:any;
  ctx4:any;
  canvas5:any;
  ctx5: any;
 
  constructor(
    private dataService:DataService
  ) { }

  ngOnInit() {
    Chart.defaults.global.legend.display = false;
    Chart.plugins.unregister(ChartDataLabels);
    this.totalAntibodyTests =0;
    this.totalAntigenTests =0;
    this.totalRtpcrTests = 0;
    this.totalMalesTested =0;
    this.totalFemalesTested =0;
    this.totalPositives =0;
    this.totalNegatives =0;

    this.dataService.getCertificates().subscribe(res=>{
      if(res.success === "true"){
        this.tests = res.data
        
        res.data.forEach(element => {
          if(element.Subject.sex === "Male"){
            this.gg.push(element)
          }
          if(element.Subject.sex === "Female"){
            this.fem.push(element)
          }     
        });


        //Male daily
        var maleD = Object.keys(maleD =this.gg.map(function(item) {
          return item.test_date.slice(0,10)
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {testDate: item, value: maleD[item]}
        });
        maleD.forEach(element => {
          this.dailyMaleLineChartLabel.unshift(element.testDate)
          this.dailyMaleLineChartData.unshift(element.value)
        });

      
        //female Daily
        var femaleD = Object.keys(femaleD =this.fem.map(function(item) {
          return item.test_date.slice(0,10)
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {testDate: item, value: femaleD[item]}
        });
        femaleD.forEach(element => {
          this.dailyFemaleLineChartLabel.unshift(element.testDate)
          this.dailyFemaleLLineChartData.unshift(element.value)
        });

        
        // Array mapping for Daily test line chart
        var arr2 = Object.keys(arr2 = res.data.map(function(item) {
          return item.test_date.slice(0,10)
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {testDate: item, value: arr2[item]}
        });
        arr2.forEach(element => {
          this.lineChartLabel.unshift(element.testDate)
          this.lineChartdata.unshift(element.value)
        });
        
        //array mapping for Test by agency
        var arr3 = Object.keys(arr2 = res.data.map(function(item) {
          return item.Subject.work_category;
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {work_category: item, value: arr2[item]}
        });
        arr3.forEach(element => {
          this.testAgencyBarLabel.push(element.work_category)
          this.testAgencyBarData.push(element.value)
        }); 

        //Array mapping for tests by Dzongkhags
        var arr4 = Object.keys(arr2 = res.data.map(function(item) {
          return item.Subject.work_dzongkhag;
        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {work_dzongkhag: item, value: arr2[item]}
        });
        arr4.forEach(element => {
          this.testDzongkhagBarLabel.push(element.work_dzongkhag)
          this.testDzongkhagBarData.push(element.value)
        }); 

                
        this.totalTests = res.data.length;
        this.tests.forEach(item => {
          if(item.test_RTPCR === "Yes"){
            this.totalRtpcrTests +=1;
          }else if(item.test_AG === "Yes"){
            this.totalAntigenTests +=1;
          }else if(item.test_AB === "Yes"){
            this.totalAntibodyTests +=1;
          }
          //
          if(item.Subject.sex === "Male"){
            this.totalMalesTested +=1            
          }else if(item.Subject.sex === "Female"){
            this.totalFemalesTested +=1
          }

          if(item.status === "PENDING"){
            this.totalPending.push(item)
          }else if(item.status === "ACTIVE"){
            this.totalActive.push(item)
          }
        }
        
        )
        this. renderPieChart()
        this.renderBarChartGender()
        this.dailyTestLineChart()
        this.agencyTestBarchart()
        // this.workDzongkhagBarChart()
        // this.testForecastLineChart()
      }
    })
  }

  
  renderPieChart(){
    Chart.defaults.global.legend.display = true;
    this.canvas1 = document.getElementById('myChart');
    this.ctx1 = this.canvas1.getContext('2d');
    let myChart = new Chart(this.ctx1, {
      type: 'pie',
      data: {
          labels: ["RT-PCR", "Antigen", "Antibody"],
          datasets: [{
              label: 'Nos of Tests',
              data: [this.totalRtpcrTests,this.totalAntigenTests,this.totalAntibodyTests],
              backgroundColor: [
                  '#00747D',
                  'pink',
                  '#A1AF9F'
              ],
              borderWidth: 1
          }]
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: 'Test Type Propotion'
      },
        responsive: true,
        display:true
      }
    });
  }

  renderBarChartGender(){
  
    this.canvas2 = document.getElementById('genderBarChart');
    this.ctx2 = this.canvas2.getContext('2d');
    let myChart = new Chart(this.ctx2, {
      type: 'bar',
      data: {
          labels: ["Male", "Female"],
          datasets: [{
              label: 'Nos of Tests',
              data: [this.totalMalesTested,this.totalFemalesTested],
              backgroundColor: [
                  '#FF947F',
                  '#4F74E0'
              ],
              borderWidth: 1
          }]
      },
      options: {
        
        title: {
          display: true,
          fontSize: 20,
          text: 'Tests by Gender'
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
    },
        responsive: true,
        display:true
      }
    });
  }

  dailyTestLineChart(){
    Chart.defaults.global.legend.display = true;
    this.canvas3 = document.getElementById('dailyTestLineChart');
    this.ctx3 = this.canvas3.getContext('2d');
    let myChart = new Chart(this.ctx3, {
      type: 'line',
      usePointStyle:true,
      data: {
        usePointStyle:true,
      labels: this.lineChartLabel,
      
      datasets: [{
            data: this.lineChartdata,
            label: "Total",
            backgroundColor:"transparent",
            borderColor:"#0097B2",
            pointRadius: 5,
            pointHitRadius: 30,
            pointBorderWidth: 2,
      },
      {
              data: this.dailyMaleLineChartData,
              label: "Male",
              backgroundColor:"transparent",
              borderColor:"#FF947F",
              pointRadius: 5,
              pointHitRadius: 30,
              pointBorderWidth: 2,
        },
        {
          data: this.dailyFemaleLLineChartData,
          label: "Female",
          backgroundColor:"transparent",
          borderColor:"#4F74E0",
          pointRadius: 5,
          pointHitRadius: 30,
          pointBorderWidth: 2,
      }    
    ]
      },
      options: {
        title: {
              display: true,
              fontSize: 20,
              text: 'Daily Tests'
          },
        lengend:{
          display: true,
          labels: {
            usePointStyle: true
        }
          
       },
       maintainAspectRatio: false,
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
      responsive: true,
      display:true
      
    })
  }

  agencyTestBarchart(){
    Chart.defaults.global.legend.display = false;
    
    this.canvas4 = document.getElementById('testByAgencyBarChart');
    this.ctx4 = this.canvas4.getContext('2d');
    let myChart = new Chart(this.ctx4,{
      type: 'bar',
      plugins:[ChartDataLabels],

      data: {
          labels: this.testAgencyBarLabel,
          datasets: [{
              label: 'Nos of Tests',
              data: this.testAgencyBarData,
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
          text: 'Tests by Agency'
      },
      maintainAspectRatio: false,
        responsive: true,
        display:true
      },
     
    });
        
  }

  // workDzongkhagBarChart(){
  //   this.canvas5 = document.getElementById('testByDzongkhagBarChart');
  //   this.ctx5 = this.canvas5.getContext('2d');
  //   let myChart = new Chart(this.ctx5,{
  //     type: 'bar',
  //     data: {
  //         labels: this.testDzongkhagBarLabel,
  //         datasets: [{
  //             label: 'Nos of Tests',
  //             data: this.testDzongkhagBarData,
  //             backgroundColor: [
  //                 '#FFC05C',
  //                 '#3F51B5',
  //                 '#b8f4ff',
  //                 '#cc759a',
  //                 '#4faaa1',
  //                 '#edffc9'
  //            ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         fontSize: 20,
  //         text: 'Tests by Dzongkhag/Thromde'
  //     },
  //       responsive: true,
  //       display:true
  //     }
  //   });
  // }



}
