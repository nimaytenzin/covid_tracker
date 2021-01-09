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
  

  canvas1: any;
  ctx1: any;
  canvas2: any;
  ctx2: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.totalAntibodyTests =0;
    this.totalAntigenTests =0;
    this.totalRtpcrTests = 0;
    this.totalMalesTested =0;
    this.totalFemalesTested =0;
    this.totalPositives =0;
    this.totalNegatives =0;
    
    //render charts
    // this.renderBarCharts()

    this.operatorId = sessionStorage.getItem('operatorId')
  
    this.dataService.getCertificates().subscribe(res=>{

      if(res.success === "true"){
        this.tests = res.data
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
            console.log(this.totalPending)
          }else if(item.status === "ACTIVE"){
            this.totalActive.push(item)
          }

          let today = Date.now()
          console.log(item.test_date === today)
        }
        
        )
       
      }
    })
  }

  // renderBarCharts(){
  //   this.canvas1 = new Chart(document.getElementById("bar-chart"))
  //   this.ctx1 = this.canvas1.getContext('2d')

  //   var myChart = new Chart(this.ctx1,{

  //     type: 'bar',
  //     data: {
  //       labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  //       datasets: [
  //         {
  //           label: "Population (millions)",
  //           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //           data: [2478,5267,734,784,433]
  //         }
  //       ]
  //     },
  //     options: {
  //       legend: { display: false },
  //       title: {
  //         display: true,
  //         text: 'Predicted world population (millions) in 2050'
  //       }
  //     }
  // } )
    
  // }

  // renderChart(){

  //   this.canvas1 = document.getElementById('myChart');
  //   this.ctx1 = this.canvas1.getContext('2d');
  //   var dates =[];
  //   var cases =[];

  //   fetch("https://raw.githubusercontent.com/nimaytenzin/cdrs/main/dailyCovidCase")
  //       .then(res => res.json())
  //       .then(data => {
  //         for(let i =0; i<data.length; i++){
  //           dates.push(data[i].date)
  //           cases.push(data[i].cases)
  //         }
  //         const myChart = new Chart(this.ctx1, {
  //           type: 'line',
  //           data: {
  //           labels: dates,
  //           datasets: [{
  //                 data: cases,
  //                 backgroundColor:"transparent",
  //                 borderColor:"rgb(63,81,181)",
  //                 pointRadius: 5,
  //                 pointHoverRadius: 10,
  //                 pointHitRadius: 30,
  //                 pointBorderWidth: 2,
  //           }]
  //           },
        
  //           options: {
  //             title: {
  //                   display: true,
  //                   text: 'Daily Covid Cases'
  //               },
  //             lengend:{
  //               display: false
  //            },
  //            scales: {
  //             xAxes: [{
  //                 gridLines: {
  //                     display:false
  //                 }
  //             }],
  //             yAxes: [{
  //                 gridLines: {
  //                     display:false
  //                 }   
  //             }]
  //         }
  //           }
        
  //           });  
          
  //       })
    
  // }

  // casesByDzongkhag(){
  //   this.canvas2 = document.getElementById('casesByDzongkhag');
  //   this.ctx2 = this.canvas2.getContext('2d');
  
  //   fetch("https://raw.githubusercontent.com/nimaytenzin/cdrs/main/dzongkhagCase") 
  //       .then(res => res.json())
  //       .then(data => {
  //         var dataLabels = [];
  //         var dataData= [];
  //         var backColor =[];
  //         for(let i = 0; i< data.length; i ++){
  //           dataData.push(data[i].cases)
  //           dataLabels.push(data[i].dzongkhag)
  //           backColor.push(data[i].background)

  //         }
        
  //         var myChart = new Chart(this.ctx2, {
  //           type: 'bar',
  //           data: {
  //             labels: dataLabels,
  //             datasets: [{
  //               label: 'cases',
  //               data: dataData,
  //               backgroundColor: backColor,
  //               borderWidth: 1
  //             }]
  //           },
  //           options: {
  //             responsive: true,

  //             onAnimationComplete: function () {
  //                 this.ctx2.font = this.scale.font;
  //                 this.ctx2.fillStyle = this.scale.textColor
  //                 this.ctx2.textAlign = "center";
  //                 this.ctx2.textBaseline = "bottom";

  //                 this.datasets.forEach(function (data) {
  //                     this.data.points.forEach(function (points) {
  //                       this.ctx2.fillText(points.value, points.x, points.y - 10);
  //                     });
  //                 })
  //             },
  //             title: {
  //               display: true,
  //               text: 'Cases By Dzongkhag'
  //           },
  //             lengend:{
  //               display: false
  //           },
  //           scales: {
  //             xAxes: [{
  //                 gridLines: {
  //                     display:false
  //                 }
  //             }],
  //             yAxes: [{
  //                 gridLines: {
  //                     display:false
  //                 }   
  //             }]
  //     }
  //           }
  //         });
  //       })
          
              
        
  // }

}
