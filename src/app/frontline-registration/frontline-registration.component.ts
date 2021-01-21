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
    
  }



}
