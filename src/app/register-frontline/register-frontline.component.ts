import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, ElementRef, ViewChild, ɵConsole  } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Md5 } from 'ts-md5';
import { StateService } from "../service/stateService";
import { MatCheckbox } from '@angular/material';

interface Dropdown{
  id: string,
  name: string
}

interface Dzongkhag {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Zone{
  id: String;
  name: String;
  dzo_id: String;
}

// interface Zone {
//   id: string;
//   name: string;
//   map_image: string;
//   dzongkhag_id: number;
//   color_code: string;
//   lat: number;
//   lng: number;
//   created_at: string;
//   updated_date: string;
// }

export class SubjectDetails{
  id:number;
  cid: number;
  name: string;
  age:string;
  sex:string;
  contact:number;
  work_dzongkhag:string;
  work_zone:string;
  work_category:string;
  work_agency: string;
  work_remarks:string;
  

  residence_dzongkhag:string;
  residence_zone:string;
  residence_accomodation:string;
  utid:string;
}



@Component({
  selector: 'app-register-frontline',
  templateUrl: './register-frontline.component.html',
  styleUrls: ['./register-frontline.component.scss']
})


export class RegisterFrontline implements OnInit {
  falseValue = 'No'
  trueValue = 'Yes';
  showDessupFields:boolean; 
  subAgency = "Sub Agency"
  dzongkhags: Dzongkhag[] = [];
  zones: Zone[] = [];
  agencyCategories: Dropdown [] =[]
  agencies:Dropdown[] =[]
  superZones: Zone[] = [];
  registerSubjectForm:FormGroup;
  subjectDetails: SubjectDetails = new SubjectDetails();
  isExistingUser = false;
  subjectId: number;
  agencyCategoryP:any;
  lol: boolean;


  testTypes : Dropdown [] =[
    {id: "1", name:"Yes"},
    {id: "2", name:"No"}
  ]

  genders : Dropdown [] =[
    {id: "1", name:"Male"},
    {id: "2", name:"Female"}
  ]

  constructor(
    private router: Router,
    private dataService: DataService,
    private fb:FormBuilder,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.getDzongkhagList();
    this.reactiveForm()
    this.getAgencyCategories();
    this.registerSubjectForm.controls['testDateControl'].setValue(new Date())
  }
  
 
  reactiveForm(){    
    this.registerSubjectForm = this.fb.group({
      cidControl: [''],
      nameControl:[],
      sexControl:[],
      ageControl:[],
      phoneNumberControl:[],
      workDzongkhagControl:[],
      zoneControl:[],
      agencyCategoryControl:[],
      agencyControl:[],
      agencyRemarkControl:[],
      residenceDzongkhagControl:[], 
      residenceZoneControl:[],
      residenceAccomodationControl:[],
      sampleIdControl:[],
      testDateControl:[],
      testPlaceControl:[]
    });
  }

  getDzongkhagList() {
    this.dataService.getDzongkhags().subscribe(response => {
      this.dzongkhags = response.data;
    });
  }
  getAgencyCategories(){ 
    this.dataService.getAgencyCategories().subscribe(response => {
      this.agencyCategories = response.data
    })
  }
  getAgencies(agencyCategoryId){
    this.dataService.getAgencies(agencyCategoryId).subscribe(response => {
      this.agencies = response.data
    })
  }

  getZones(dzoId){
    this.dataService.getZones(dzoId).subscribe(response => {
      this.zones = response.data
    })
  }
  getZoneList(dzongkhagId) {
    this.dataService.getZones(dzongkhagId).subscribe(response => {
      this.superZones = response.data;
    });
  }
  dessung(item){
    if(item ===1 ){
      this.subAgency = "SuperZones"
    }else{
      this.subAgency = "Sub Agency"
    }
  }

 
  submit(){

    if(this.registerSubjectForm.valid ){
      this.subjectDetails.cid = this.registerSubjectForm.get('cidControl').value
      this.subjectDetails.name = this.registerSubjectForm.get('nameControl').value
      this.subjectDetails.sex = this.registerSubjectForm.get('sexControl').value
      this.subjectDetails.age = this.registerSubjectForm.get('ageControl').value
      this.subjectDetails.contact = this.registerSubjectForm.get('phoneNumberControl').value
      this.subjectDetails.work_dzongkhag = this.registerSubjectForm.get('workDzongkhagControl').value
      this.subjectDetails.work_zone = this.registerSubjectForm.get('zoneControl').value
      this.subjectDetails.work_category = this.registerSubjectForm.get('agencyCategoryControl').value
      this.subjectDetails.work_agency = this.registerSubjectForm.get('agencyControl').value
      this.subjectDetails.work_remarks = this.registerSubjectForm.get('agencyRemarkControl').value
      this.subjectDetails.residence_dzongkhag = this.registerSubjectForm.get('residenceDzongkhagControl').value
      this.subjectDetails.residence_zone = this.registerSubjectForm.get('residenceZoneControl').value
      this.subjectDetails.residence_accomodation = this.registerSubjectForm.get('residenceAccomodationControl').value
      this.subjectDetails.utid = Md5.hashStr(`${this.subjectDetails.cid} + ${this.subjectDetails.name}`).toString();
   
      if(this.isExistingUser === false){
        this.dataService.registerSubject(this.subjectDetails).subscribe( res =>{
          if(res.success === "true"){
              this.router.navigate(['navigate'])      
          } 
        })
      }else{
        this.subjectDetails.id = this.subjectId
        this.dataService.updateSubject(this.subjectDetails).subscribe(res => {
        if(res.success === "true"){
          this.router.navigate(['navigate'])
        }
        })
        
      }
  
  
    }
  }
 
 
  changeDiff(e){
    let cid =  this.registerSubjectForm.get('cidControl').value
    if(cid.length > 3){
      this.dataService.getSubjects(cid).subscribe( res => {
        if(res.success === "true"){
            this.isExistingUser = true;
            this.subjectId = res.data.id;         
            this.registerSubjectForm.patchValue({
              nameControl: res.data.name,
              sexControl: res.data.sex,
              ageControl: res.data.age,
              phoneNumberControl:res.data.contact,
              workDzongkhagControl:res.data.work_dzongkhag,
              agencyCategoryControl:res.data.work_category,
              testControl : res.data.work_agency,
              agencyRemarkControl:res.data.work_remarks,              
            })
            this.registerSubjectForm.controls['workDzongkhagControl'].setValue(Number(res.data.work_dzongkhag))
            this.getZones(Number(res.data.work_dzongkhag))
            this.registerSubjectForm.controls['zoneControl'].setValue(Number(res.data.work_zone))
            this.registerSubjectForm.controls['agencyCategoryControl'].setValue(Number(res.data.work_category))
            this.getAgencies(Number(res.data.work_category))
            this.registerSubjectForm.controls['agencyControl'].setValue(Number(res.data.work_agency))

        }else{
          this.isExistingUser = false
          this.registerSubjectForm.reset({
            cidControl:cid
        });
        }

      })
      this.dataService.getCidDetails(cid).subscribe(res => {
      
      function get(age2){
        var from = age2.split("/");
        var birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
        var cur = new Date().getTime();
        var diff = cur - birthdateTimeStamp.getTime();
        var currentAge = Math.floor(diff/31557600000);
        return currentAge
      }
      let name = (res.data.citizendetails.citizendetail[0].firstName + ' '+ res.data.citizendetails.citizendetail[0].middleName+ ' '+ res.data.citizendetails.citizendetail[0].lastName).split("null").join('')
      let age = get(res.data.citizendetails.citizendetail[0].dob)
  
      let gender;
      if(res.data.citizendetails.citizendetail[0].gender === "M"){
        gender = "Male"
      }else{
        gender = "Female"
      }
  
      this.registerSubjectForm.patchValue({
        nameControl: name,
        sexControl: gender,
        ageControl: age
       })
      })
    }
    
    
  }
}
