import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  operatorId:any;
  displayTotalTestTable:boolean = false;
  dispalyPendingTable:boolean = false;
  displayPositiveTable:boolean = false
  displayDueTable:boolean = false;
  displayExpiredTable:boolean = false;
  displayCharts:boolean = true;
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
  lineChartLabel: Array<any> =[];
  lineChartdata: Array<any> = [];
  testAgencyBarData: Array<any> = [];
  testAgencyBarLabel: Array<any> = [];
  testDzongkhagBarLabel: Array<any> = [];
  testDzongkhagBarData: Array<any> = [];
  forecastLineLabel: Array <any> = [];
  forecastLineData: Array <any> = [];
  upcomingTests = 34;

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
  canvas6:any;
  ctx6:any;



  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    let r =  Date.parse("2021-01-09T18:04:59.000Z")
    
    let s = Date.parse('2021-01-09T14:04:37.000Z')
    let f = Date.parse("2021-01-07T18:00:00.000Z")
    console.log(r < s)
    console.log(f < r)

    console.log(r)
    console.log(typeof(Date.now()))
    this.totalAntibodyTests =0;
    this.totalAntigenTests =0;
    this.totalRtpcrTests = 0;
    this.totalMalesTested =0;
    this.totalFemalesTested =0;
    this.totalPositives =0;
    this.totalNegatives =0;

    this.operatorId = sessionStorage.getItem('operatorId')
  
    this.dataService.getCertificates().subscribe(res=>{
      if(res.success === "true"){
        this.tests = res.data
        let date = new Date(res.data.test_date)
        console.log(date.toUTCString())
        // Array mapping for Daily test line chart
        var arr2 = Object.keys(arr2 = res.data.map(function(item) {
          return item.test_date.slice(0,10);
          

        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {testDate: item, value: arr2[item]}
        });

        arr2.forEach(element => {
          this.lineChartLabel.push(element.testDate)
          this.lineChartdata.push(element.value)
        });

        console.log('line')
        console.log(this.lineChartLabel)
        console.log(this.lineChartdata)

      
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

        //Array mapping for expiry date line charts
        var arr5 = Object.keys(arr2 = res.data.map(function(item) {
          return item.exp_date;

        }).reduce(function(acc,curr){
            acc[curr] = acc[curr] + 1 || 1;
            return acc;
        }, [])).map(function(item){
            return {exp_date: item, value: arr2[item]}
        });

        arr5.forEach(element => {
          this.forecastLineData.push(element.value)
          this.forecastLineLabel.push(element.exp_date)
        }); 

       

         

        this.totalTests = res.data.length;
        this.tests.forEach(item => {
      
          if(item.test_type === "RT/PCR Test"){
            this.totalRtpcrTests +=1;
          }else if(item.test_type === "Antigen Test"){
            this.totalAntigenTests +=1;
          }else if(item.test_type === "Antibody Test"){
            this.totalAntibodyTests +=1;
          }
          if(item.Subject.sex === "Male"){
            this.totalMalesTested +=1
          }else if(item.Subject.sex === "Female"){
            this.totalFemalesTested +=1
          }

          if(item.test_result === "POSITIVE"){
            this.totalPositives += 1
            this.totalPostiveTable.push(item)
          }else if(item.test_result === "NEGATIVE"){
            this.totalNegatives += 1
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
        this.workDzongkhagBarChart()
        this.testForecastLineChart()
      }
    })
  }

  renderPieChart(){
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
                  '#DBF9D8',
                  '#A1AF9F'
              ],
              borderWidth: 1
          }]
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: 'Test Propotion by Test Type'
      },
        responsive: true,
        display:true
      }
    });
  }

  renderBarChartGender(){
    Chart.defaults.global.legend.display = false;
    this.canvas2 = document.getElementById('genderBarChart');
    this.ctx2 = this.canvas2.getContext('2d');
    let myChart = new Chart(this.ctx2, {
      type: 'bar',
      data: {
          labels: ["Male", "Female"],
          datasets: [{
              label: 'Nos of Tests',
              data: [this.totalRtpcrTests,this.totalAntigenTests,this.totalAntibodyTests],
              backgroundColor: [
                  '#FFC05C',
                  '#3F51B5'
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
        responsive: true,
        display:true
      }
    });
  }

  dailyTestLineChart(){
    Chart.defaults.global.legend.display = false;
    this.canvas3 = document.getElementById('dailyTestLineChart');
    this.ctx3 = this.canvas3.getContext('2d');
    let myChart = new Chart(this.ctx3, {
      type: 'line',
      data: {
      labels: this.lineChartLabel,
      datasets: [{
            data: this.lineChartdata,
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
              text: 'Daily Tests'
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
        title: {
          display: true,
          fontSize: 20,
          text: 'Tests by Agency'
      },
        responsive: true,
        display:true
      }
    });
        
  }

  workDzongkhagBarChart(){
    this.canvas5 = document.getElementById('testByDzongkhagBarChart');
    this.ctx5 = this.canvas5.getContext('2d');
    let myChart = new Chart(this.ctx5,{
      type: 'bar',
      data: {
          labels: this.testDzongkhagBarLabel,
          datasets: [{
              label: 'Nos of Tests',
              data: this.testDzongkhagBarData,
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
        title: {
          display: true,
          fontSize: 20,
          text: 'Tests by Dzongkhag/Thromde'
      },
        responsive: true,
        display:true
      }
    });
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
      responsive: true,
      display:true
      
    })

  }



  showTestTable(){
   

  }

  showOverDueTable(){
  
  }

  showCharts(){
 
  }


}
