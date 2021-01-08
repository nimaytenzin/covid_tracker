import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, ElementRef, ViewChild, ɵConsole  } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Md5 } from 'ts-md5';
import { StateService } from "../service/stateService";

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

interface Zone {
  id: string;
  name: string;
  map_image: string;
  dzongkhag_id: number;
  color_code: string;
  lat: number;
  lng: number;
  created_at: string;
  updated_date: string;
}

export class SubjectDetails{
  cid: number;
  name: string;
  age:string;
  sex:string;
  contact:number;
  work_dzongkhag:string;
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
  test_type:string;
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

  

  dzongkhags: Dzongkhag[] = [];
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
    {id: "1", name:"RT/PCR"},
    {id: "2", name:"Antigen Test"},
    {id: "3", name:"Antibody Test"}
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
    
    console.log(sessionStorage)
    this.getDzongkhagList();
    this.reactiveForm()
    this.getAgencyCategories();
    this.registerSubjectForm.controls.testControl.setValue("selected")
  }

  reactiveForm(){
    this.registerSubjectForm = this.fb.group({
      cidControl: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
      nameControl:[],
      sexControl:[],
      ageControl:[],
      phoneNumberControl:[],
      workDzongkhagControl:[],
      agencyCategoryControl:[],
      agencyControl:[],
      agencyRemarkControl:[],
      residenceDzongkhagControl:[], 
      residenceZoneControl:[],
      residenceAccomodationControl:[],
      sampleIdControl:[],
      testTypeControl:[],
      testDateControl: new Date(),
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
  getZoneList(dzongkhagId) {
    this.dataService.getZones(dzongkhagId).subscribe(response => {
      this.superZones = response.data;
    });
  }

  submit(){
    if(this.registerSubjectForm.valid ){
      this.subjectDetails.cid = this.registerSubjectForm.get('cidControl').value
      this.subjectDetails.name = this.registerSubjectForm.get('nameControl').value
      this.subjectDetails.sex = this.registerSubjectForm.get('sexControl').value
      this.subjectDetails.age = this.registerSubjectForm.get('ageControl').value
      this.subjectDetails.contact = this.registerSubjectForm.get('phoneNumberControl').value
      this.subjectDetails.work_dzongkhag = this.registerSubjectForm.get('workDzongkhagControl').value
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
             console.log(res.data)
              this.certificate.subject_id = res.data.id;
              this.certificate.operator_id =  Number(sessionStorage.getItem('operatorId'));
              this.certificate.test_type = this.registerSubjectForm.get('testTypeControl').value
              this.certificate.test_date = this.registerSubjectForm.get('testDateControl').value
              this.certificate.place = this.registerSubjectForm.get('testPlaceControl').value
              this.certificate.status = "PENDING";
            
              this.dataService.registerCertificate(this.certificate).subscribe(
                res => {
                  console.log(res)
                  let sampleId = res.data.id
                  this.router.navigate([`/sampleid/${sampleId}`]);
                }
              )
          }
        })

      }else{
        this.certificate.subject_id = this.subjectId;
        this.certificate.operator_id =  Number(sessionStorage.getItem('operatorId'));
              this.certificate.test_type = this.registerSubjectForm.get('testTypeControl').value
              this.certificate.test_date = this.registerSubjectForm.get('testDateControl').value
              this.certificate.place = this.registerSubjectForm.get('testPlaceControl').value
              this.certificate.status = "PENDING"
  
              this.dataService.registerCertificate(this.certificate).subscribe(
                res => {
                  console.log(res)
                  let sampleId = res.data.id
                  this.router.navigate([`/sampleid/${sampleId}`]);
                }
              )
      }
      
    }
    
  }
 

  changeDiff(e){
    let cid =  this.registerSubjectForm.get('cidControl').value
    if(cid.length === 11){
      this.dataService.getSubjects(cid).subscribe( res => {
        if(res.success === "true"){
            this.isExistingUser = true;
            this.subjectId = res.data.id;
            console.log(res.data)
            
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
            console.log(res.data.work_dzongkhag)
            this.registerSubjectForm.controls['workDzongkhagControl'].setValue(Number(res.data.work_dzongkhag))
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
    }
    
    
  }




}
