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

export class Certificate{
  subject_id:number;
  operator_id:number;
  sample_id: string;
  test_RTPCR:string;
  test_AG:string;
  test_AB:string;
  test_date:string;
  place:string;
  status:string;
  utid:string;
}

@Component({
  selector: 'app-register-status',
  templateUrl: './register-status.component.html',
  styleUrls: ['./register-status.component.scss']
})


export class RegisterStatusComponent implements OnInit {
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
  certificate:Certificate = new Certificate();
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
    this.showDessupFields = false
  }
  
  antigenTest(checkbox: MatCheckbox, checked: boolean) {
    checkbox.value = checked ? this.trueValue : this.falseValue;
    this.certificate.test_AG = checkbox.value
  }

  antibodyTest(checkbox: MatCheckbox, checked: boolean) {
    checkbox.value = checked ? this.trueValue : this.falseValue;
    this.certificate.test_AB = checkbox.value
  }
  rtPcrTest(checkbox: MatCheckbox, checked: boolean) {
    checkbox.value = checked ? this.trueValue : this.falseValue;
    this.certificate.test_RTPCR = checkbox.value
  }

 

  reactiveForm(){
    this.certificate.test_RTPCR = "No";
    this.certificate.test_AG = "No";
    this.certificate.test_AB = "No";
    
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
              this.certificate.subject_id = res.data.id;
              this.certificate.operator_id =  Number(sessionStorage.getItem('operatorId'));
              this.certificate.test_date = this.registerSubjectForm.get('testDateControl').value
              this.certificate.place = this.registerSubjectForm.get('testPlaceControl').value
              this.certificate.sample_id = this.registerSubjectForm.get('sampleIdControl').value
              this.certificate.status = "PENDING";

              if(this.certificate.operator_id !== 0){
                this.dataService.registerCertificate(this.certificate).subscribe(
                  res => {
                    if(res.success == "true") this.router.navigate([`/sampleid/${this.certificate.sample_id}`]);
                  }
                )
              }else{
                alert("cannot submit as your credentials are not valid. Please login in again")
              }
          }
        })

      }else{
        this.certificate.subject_id = this.subjectId;
        this.subjectDetails.id = this.subjectId;
        this.certificate.operator_id =  Number(sessionStorage.getItem('operatorId'));
        this.certificate.test_date = this.registerSubjectForm.get('testDateControl').value
        this.certificate.place = this.registerSubjectForm.get('testPlaceControl').value
        this.certificate.sample_id = this.registerSubjectForm.get('sampleIdControl').value
        this.certificate.status = "PENDING"
        
        if(this.certificate.operator_id !== 0){
          this.dataService.registerCertificate(this.certificate).subscribe(
            res => {
              if(res.success == "true") this.router.navigate([`/sampleid/${this.certificate.sample_id}`]);

              this.dataService.updateSubject(this.subjectDetails).subscribe(
                res => console.log(res)
              )
            }
          )
        }else{
          alert("cannot submit as your credentials are not valid. Please login in again")
        }
      }
      
    }
    
  }
 

  changeDiff(e){
    let cid =  this.registerSubjectForm.get('cidControl').value
    if(cid.length > 9){
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
              residenceDzongkhagControl:res.data.residence_dzongkhag,
              residenceZoneControl:res.data.residence_zone,
              residenceAccomodationControl:res.data.residence_accomodation 
              
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
      console.log(res.data.citizendetails.citizendetail[0])

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
