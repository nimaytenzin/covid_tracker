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
  totalFrontliners:any;
  frontlinerMale:any;
  frontlinerFemale:any;
  testsTodayFemale:number;
  testsTodayMale:number


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
  testsToday:number;

  gg: Array<any> =[];
  fem:Array <any> =[];

  testAgencyBarData: Array<any> = [];
  testAgencyBarLabel: Array<any> = [];
  testDzongkhagBarLabel: Array<any> = [];
  testDzongkhagBarData: Array<any> = [];
  //frontliners by Agency
  frontlinerAgencyData: Array<any> =[];
  frontlinerAgencyLabel:Array<any> =[];
  agencyCategories:Array <any> = [];

  canvas1: any;
  ctx1: any;
  canvas2: any;
  ctx2: any;
  canvas3:any;
  ctx3:any;
  canvas4:any;
  ctx4:any;
 
  canvas9:any;
  ctx9:any;

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
    this.frontlinerMale =0;
    this.frontlinerFemale =0;
   
   let categoryHash = new Map<string, string>()

    this.dataService.getAgencyCategories().subscribe(res =>{ 
      this.agencyCategories = res.data
      for(var i in res.data){
        categoryHash.set(res.data[i].id,res.data[i].name)
      }
    })
  
    this.dataService.getAllSubjects().subscribe(res => {
         this.totalFrontliners = res.data.length;
          var categoryCount = new Map<string,number>()       
          for(var i in res.data){ 
            if(res.data[i].sex === "Male"){
              this.frontlinerMale += 1
            } else if(res.data[i].sex === "Female"){
              this.frontlinerFemale +=1
            }
            var c = categoryCount.get(categoryHash.get(res.data[i].work_category)) 
            // var d = dzongkhagCount.get(res.data[i].work_dzongkhag)

            // if(d){
            //   dzongkhagCount.set(res.data[i].work_dzongkhag, d+1)
            // }else{
            //   dzongkhagCount.set(res.data[i].work_dzongkhag, 1)
            // }
            /**
             * // get -> get the value of the key passed in the get argument
             * // set -> set a key value pair,,specify key and value..
             * this is checking if the work category of the i th index object is present in the category Hash
             * categoryCount.get('somestring') check is somestring exists in the category count and returns its key value pair..else returns undefined
             * so the next if loop checks that..if it is undefined..it will set that work category as key and then the value as 1
             * if it exists or is set in previous loops..the work category is set and then the value is incremented. 
             */

            if(c){
              categoryCount.set(categoryHash.get(res.data[i].work_category),c + 1)
            }else{
              categoryCount.set(categoryHash.get(res.data[i].work_category),1)
            }
          }   
          categoryCount.forEach((value, key)=>{
            this.frontlinerAgencyLabel.push(key)
            this.frontlinerAgencyData.push(value)
          })
          this.frontlinersByAgencyChart()         
      })

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

        var maleDailyCount = new Map<string,number>();

        for( i in this.gg){
          let string1 = new Date(Date.parse(this.gg[i].test_date)).toString().slice(0,15)
          let z = maleDailyCount.get(string1)
          if(z){
            maleDailyCount.set(string1, z+1)
          }else{
            maleDailyCount.set(string1, 1)
          }
        }

        maleDailyCount.forEach( (value,key) =>{
          let string = new Date(key).toString()
          this.dailyMaleLineChartLabel.unshift(string)
          this.dailyMaleLineChartData.unshift(value)
        })
        
        console.log("Male", this.dailyMaleLineChartLabel)
        console.log(this.dailyMaleLineChartData)
        
        this.testsTodayMale = this.dailyMaleLineChartData[this.dailyMaleLineChartData.length -1]

        var femaleDCount = new Map<string,number>();
        for( i in this.fem){
          let string2 = new Date(Date.parse(this.fem[i].test_date)).toString().slice(0,15)
          let z = femaleDCount.get(string2)
          if(z){
            femaleDCount.set(string2, z+1)
          }else{
            femaleDCount.set(string2, 1)
          }
        }
   
        femaleDCount.forEach( (value,key) =>{
          let string = new Date(key).toString().slice(0,15)
          this.dailyFemaleLineChartLabel.unshift(string)
          this.dailyFemaleLLineChartData.unshift(value)
        })
        this.testsTodayFemale = this.dailyFemaleLLineChartData[this.dailyFemaleLLineChartData.length -1]

        console.log("Female", this.dailyFemaleLineChartLabel)
        console.log(this.dailyFemaleLLineChartData)
      
        var totalDaily = new Map<string,number>();

        for( i in res.data){
          let string = new Date(Date.parse(res.data[i].test_date)).toString().slice(0,15)
          let z = totalDaily.get(string)
          
          if(z){
            totalDaily.set(string, z+1)
          }else{
            totalDaily.set(string, 1)
          }
        }
       totalDaily.forEach( (value,key) =>{
          let string = new Date(key).toString().slice(0,15)
          this.lineChartLabel.unshift(string)
          this.lineChartdata.unshift(value)
        })

        this.testsToday = this.lineChartdata[this.lineChartdata.length - 1]

        var testByAgency = new Map<string,number>()
          for(var i in res.data){
            
            var c = testByAgency.get(categoryHash.get(res.data[i].Subject.work_category))
            if(c){
              testByAgency.set(categoryHash.get(res.data[i].Subject.work_category),c + 1)
            }else{
              testByAgency.set(categoryHash.get(res.data[i].Subject.work_category),1)
            }
          }
          testByAgency.forEach((value, key)=>{
            this.testAgencyBarLabel.push(key)
            this.testAgencyBarData.push(value)
          })
        
           
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
        }
        
        )
        this. renderPieChart()
        this.dailyTestLineChart()
        this.agencyTestBarchart()    
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
      
      datasets: [
        {
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
          data: [3,14,12,27,26,1,0,0,1,0,11,61],
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
              text: 'Total Daily Tests'
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
              backgroundColor:[
                '#cc759a',
                'rgb(255,99,14)',
                '#b8f4ff',
                '#FFC05C',
                '#4faaa1',
                '#edffc9',
                "#E3E8CD",
                "#BCD8BF",
                "#D3B9A3",
                "#D3B9A3",
                "#EE9C92",
                "#FE857E",
                "#A69E80",
                "#E0BA9B",
                "#E7A97E",
                "#D28574",
                "#3B1922",
                "#D3D5B0",
                "#B5CEA4",
                "#9DC19D",
                "#8C7C62",
                "#71443F"
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

  frontlinersByAgencyChart(){
    Chart.defaults.global.legend.display = false;
  
    this.canvas9 = document.getElementById('frontLinersByAgency');
    this.ctx9 = this.canvas9.getContext('2d');
    let myChart = new Chart(this.ctx9,{
      type: 'bar',
      data: {
          labels: this.frontlinerAgencyLabel,
          datasets: [{
              barPercentage: 0.999,
              categoryPercentage:0.8,
              label: 'frontliners',
              data: this.frontlinerAgencyData,
              backgroundColor: [
                '#cc759a',
                'rgb(255,99,14)',
                '#b8f4ff',
                '#FFC05C',
                '#4faaa1',
                '#edffc9',
                "#E3E8CD",
                "#BCD8BF",
                "#D3B9A3",
                "#EE9C92",
                "#FE857E",
                "#A69E80",
                "#E0BA9B",
                "#E7A97E",
                "#D28574",
                "#3B1922",
                "#D3D5B0",
                "#B5CEA4",
                "#9DC19D",
                "#8C7C62",
                "#71443F"
            ],
              borderWidth: 1
          }]
      },
      options: {
        

        scales: {
          xAxes: [{
            ticks: {
              // autoSkip: false,
              // maxRotation: 90,
              // minRotation: 90
          }
         }],
          yAxes: [{
            display: false  
          }]
      },
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
