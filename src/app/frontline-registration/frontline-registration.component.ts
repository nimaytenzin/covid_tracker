import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../service/data.service';

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


export class frontlinerDetials{
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
  utid:string;
  verified:string;
}


@Component({
  selector: 'app-frontline-registration',
  templateUrl: './frontline-registration.component.html',
  styleUrls: ['./frontline-registration.component.scss']
})
export class FrontlineRegistrationComponent implements OnInit {
  subAgency = "Sub Agency";   
  frontlinerRegistrationForm : FormGroup
  dzongkhags: Dzongkhag[] = [];
  zones: Zone[] = [];
  agencyCategories: Dropdown [] =[]
  agencies:Dropdown[] =[]
  superZones: Zone[] = [];
  isExistingUser = false;
  subjectId: number;
  agencyCategoryP:any;
 
  genders : Dropdown [] =[
    {id: "1", name:"Male"},
    {id: "2", name:"Female"}
  ]

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getDzongkhagList();
    this.getAgencyCategories();
    this.reactiveForm()
  }

  reactiveForm(){
  
    
    this.frontlinerRegistrationForm = this.fb.group({
      cidControl: [],
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
      residenceAccomodationControl:[]
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
    console.log(item)
    if(item ===1 ){
      this.subAgency = "SuperZones"
    }else{
      this.subAgency = "Sub Agency"
    }
  }

  changeDiff(e){
    let cid =  this.frontlinerRegistrationForm.get('cidControl').value
    if(cid.length === 11){
      this.dataService.getSubjects(cid).subscribe( res => {
        if(res.success === "true"){
            this.isExistingUser = true;
            this.subjectId = res.data.id;            
            this.frontlinerRegistrationForm.patchValue({
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
            this.frontlinerRegistrationForm.controls['workDzongkhagControl'].setValue(Number(res.data.work_dzongkhag))
            this.getZones(Number(res.data.work_dzongkhag))
            this.frontlinerRegistrationForm.controls['zoneControl'].setValue(Number(res.data.work_zone))
            this.frontlinerRegistrationForm.controls['agencyCategoryControl'].setValue(Number(res.data.work_category))
            this.getAgencies(Number(res.data.work_category))
            this.frontlinerRegistrationForm.controls['agencyControl'].setValue(Number(res.data.work_agency))

        }else{
          this.isExistingUser = false
          this.frontlinerRegistrationForm.reset({
            cidControl:cid
        });
        }

      })
      // this.dataService.getCidDetais(cid).subscribe(res => {
      //   console.log(res.data.citizendetails.citizendetail[0])
      //   console.log(res.data.citizendetails.citizendetail[0].firstNamebh)
      // })
    }
    
    
  }


}
