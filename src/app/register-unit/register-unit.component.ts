import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';


// Multi Unit Interface
interface Occupancy{
  id: string,
  name: string
}

interface FloorLevel{
  id: string,
  name: string
}

interface UnitOwnership{
  id: string,
  name: string
}

interface UnitUse{
  id: string,
  name: string
}


// residential interface
interface Parking{
  id: string,
  name: string
}
interface BusTransport{
  id: string,
  name: string
}

interface TaxiTransport{
  id: string,
  name: string
}

interface OwnLand{
  id: string,
  name: string
}

interface ownHouse{
  id: string,
  name: string
}

interface Religion{
  id: string,
  name: string
}

interface Nationality{
  id: string,
  name: string
}

export class Unit{
  building_id:number;
  unitNumber:string;
  unitName:string;
  occupancyStatus:string;
  floorLevel:string;
  unitOwnership:string;
  rent:string;
  unitUse:string;
  otherUseRemark:string;
  remarks:string;

}
export class Resident{
  unit_id:number;
  building_id:number;
  headHousehold:string;
  contactNumberHead:string;
  bhutaneseNationals:string;
  nonBhutaneseNationals
  nationalityRemarks:string;
  buddhismMale:string;
  buddhismFemale:string;
  hinduismMale:string;
  hinduismFemale:string;
  christianityMale:string;
  christianityFemale:string;
  otherMaleR:string;
  otherFemaleR:string;

  maleBelow6:string;
  femaleBelow6:string;
  male617:string;
  female617:string;
  male1824:string;
  female1824:string;
  male2559:string;
  female2559:string;
  male60:string;
  female60:string;
  armedMale:string;
  armedFemale:string;
  civilMale:string;
  civilFemale:string;
  farmerMale:string;
  farmerFemale:string;
  houseHusband:string;
  houseWife:string;
  jobSeekerMale:string;
  jobSeekerFemale:string;
  monk:string;
  nun:string;
  privateEmployeeMale:string;
  privateEmployeeFemale:string;
  retireeMale:string;
  retireeFemale:string;
  corporateMale:string;
  corporateFemale:string;
  studentMale:string;
  studentFemale:string;
  othersMale:string;
  othersFemale:string;
  familyIncome:string;
  differentlyAbled:string;
  electricCar:string;
  hybridCar:string;
  taxi:string;
  otherVehicle:string;
  resParking:string;
  workPlaceSchool:string;
  busTransport:string;
  ownLand:string;
  ownHouse:string;
  residentRemark:string;
}


@Component({
  selector: 'app-register-unit',
  templateUrl: './register-unit.component.html',
  styleUrls: ['./register-unit.component.scss']
})

export class RegisterUnitComponent implements OnInit {
  multiUnitForm: FormGroup;
  residentForm: FormGroup;
  shopForm: FormGroup;
  showScanner = false;
  buildingId: number;
  qrId: string;
  houseHoldId: number;
  unitUse: string;
  shopUse: string;
  unitId: number;
  multiUnitUseControl: FormGroup;
  unit:Unit;
  resident:Resident;

  latitude: number;
  longitude: number;
  accuracy: number;

  disableForm = false;
  displayForm = true;
  displayCamera = false;
  showOtherType = false;
  displayResidentForm = false;
  displayShopForm = false;

//Multi Units
occupancyStatus: Occupancy[]=[
  {id:'1', name:"Vacant"},
  {id:'2', name:"Occupied"},  
];
floorLevel: FloorLevel[]=[
  {id:'1', name:"Basement 2"},
  {id:'2', name:"Basement 1"},
  {id:'3', name:"Stilts"},
  {id:'4', name:"Ground Floor"},
  {id:'5', name:"First Floor"},
  {id:'6', name:"Second Floor"},
  {id:'7', name:"Third Floor"},
  {id:'8', name:"Fourth Floor"},
  {id:'9', name:"Fifth Floor"},
  {id:'10', name:"Sixth Floor"},
  {id:'11', name:"Attic"},
  {id:'12', name:"Jamthog"},
];
unitOwnership:UnitOwnership[]=[
  {id:'1', name:"Owned"},
  {id:'2', name:"Rented"},  
];
multiUnitUse:UnitUse[]=[
  {id:'1', name:"Agricultural Shed"},
  {id:'2', name:"Animal Shelter"},
  {id:'3', name:"Art Gallery"},
  {id:'4', name:"Auditorium"},
  {id:'5', name:"Bakery"},
  {id:'6', name:"Bank"},
  {id:'7', name:"Bar"},
  {id:'9', name:"Car Showroom"},
  {id:'10', name:"Carwash"},
  {id:'11', name:"Check Post"},
  {id:'12', name:"Chhukhor Mani"},
  {id:'13', name:"Clothing Shop"},
  {id:'14', name:"Cobler"},
  {id:'16', name:"Community Center"},
  {id:'17', name:"Conferenced Hall"},
  {id:'18', name:"Cottage Industry"},
  {id:'19', name:"Dairy Shop"},
  {id:'20', name:"Daycare Center"},
  {id:'21', name:"Drayang"},
  {id:'22', name:"Dry Cleaning/Laundry Room"},
  {id:'23', name:"Electronics/Repair Shop"},
  {id:'24', name:"Fire Station"},
  {id:'25', name:"Furniture Showroom"},
  {id:'26', name:"Game Parlour"},
  {id:'27', name:"Garage"},
  {id:'28', name:"General Shop"},
  {id:'29', name:"Godown/Store"},
  {id:'30', name:"Gold/BlackSmith"},
  {id:'31', name:"Grocery Shop"},
  {id:'32', name:"Gym"},
  {id:'33', name:"Handicraft"},
  {id:'34', name:"Hardware Shop"},
  {id:'35', name:"Hot Stone Bath"},
  {id:'36', name:"Internet Cafe"},
  {id:'37', name:"Library"},
  {id:'38', name:"Market Shed"},
  {id:'39', name:"Meat Shop"},
  {id:'40', name:"Mess"},
  {id:'41', name:"Mill"},
  {id:'42', name:"Museum"},
  {id:'43', name:"Music Studio"},
  {id:'44', name:"Night Club"},
  {id:'45', name:"Office"},
  {id:'46', name:"Pan Shop"},
  {id:'47', name:"Parking"},
  {id:'48', name:"Petrol Pump"},
  {id:'49', name:"Pharmacy"},
  {id:'50', name:"Photo Studio"},
  {id:'51', name:"Police Station"},
  {id:'52', name:"Public Toilet"},
  {id:'53', name:"Religious"},
  {id:'54', name:"Religious Item Shop"},
  {id:'56', name:"Residential"},
  {id:'57', name:"Resort/Hotel"},
  {id:'58', name:"Restaurant"},
  {id:'60', name:"Salon/Barber Shop"},
  {id:'61', name:"Sawmill"},
  {id:'62', name:"Scrap Yard"},
  {id:'63', name:"Show Room"},
  {id:'64', name:"Snooker Room"},
  {id:'65', name:"Spa and Sauna"},
  {id:'66', name:"Sports Shop"},
  {id:'67', name:"Sportsplex"},
  {id:'68', name:"Stationary Shop"},
  {id:'69', name:"Store"},
  {id:'70', name:"Swimming Pool"},
  {id:'71', name:"Tailor Shop"},
  {id:'72', name:"Toilet"},
  {id:'73', name:"Vegetable Shop"},
  {id:'74', name:"Workshop"},
  {id:'75', name:"WineShop"},
  {id:'76', name:"Others"},
];

//reidential
resParking:Parking[]=[
  {id:'1', name:"Designated"},
  {id:'2', name:"Un-designated"},
  {id:'3', name:"Private"},
]

busTransport:BusTransport[]=[
  {id:'1', name:"Yes"},
  {id:'2', name:"No"},
];

householdIncome:BusTransport[]=[
  {id:'1', name:"Below 10,000"},
  {id:'2', name:"10,000 - 20,000"},
  {id:'2', name:"20,000 - 30,000"},
  {id:'2', name:"30,000 - 40,000"},
  {id:'2', name:"40,000 - 50,000"},
  {id:'2', name:"Above 50,000"},

]

ownLand:OwnLand[]=[
  {id:'1', name:"Yes"},
  {id:'2', name:"No"},
];

ownHouse:ownHouse[]=[
  {id:'1', name:"Yes"},
  {id:'2', name:"No"},
];

religion:Religion[] =[
  {id:'1', name:"Buddhism"},
  {id:'2', name:"Hinduism"},
  {id:'3', name:"Christianity"},
  {id:'5', name:"Other"},
];

nationality:Nationality[] =[
  {id:'1', name:"Bhutanese"},
  {id:'2', name:"Non-Bhutanese"},
];
//

shopsIdentifier = ["5","19,31,49,39,73,75"];

constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  public dialog: MatDialog,
  private dataService: DataService,
  private router: Router,
  private snackBar: MatSnackBar
) {
  this.unit = new Unit();
}

ngOnInit() {
  this.buildingId = Number(sessionStorage.getItem('buildingId'));
  this.reactiveForms();
}

changeDiff($event){
  this.displayResidentForm = false;
  this.displayShopForm = false;
  if($event.value === "56"){
    this.displayResidentForm=true;
    this.unitUse=="Residential";
  // } else if($event.value === "19" || $event.value === "31" || $event.value === "49" || $event.value === "39" || $event.value === "73" || $event.value === "75"){
  //   this.displayShopForm =true;
  // }
  }else if (this.shopsIdentifier.includes($event.value)){
    this.displayShopForm = true;
  }
};

 // control
reactiveForms() {
  this.multiUnitForm = this.fb.group({
    multiUnitIdControl:[],
    unitNameControl:[],
    occupancyStatusControl:[],
    floorLevelControl:[],
    unitOwnershipControl:[],
    rentControl:[],
    unitUseControl:[],
    multiUnitUseControl:[],
    otherUseRemarkControl:[],
    multiUnitRemarksControl:[]
  });
  this.residentForm = this.fb.group({
    headHouseholdControl:[],
    contactNumberHeadControl:[],
    bhutaneseNationalsControl:[],
    nonBhutaneseNationalsControl:[],
    nationalityRemarksControl:[],
    buddhismMaleControl:[],
    buddhismFemaleControl:[],
    hinduismMaleControl:[],
    hinduismFemaleControl:[],
    christianityMaleControl:[],
    christianityFemaleControl:[],
    otherMaleRControl:[],
    otherFemaleRControl:[],
    maleBelow6Control:[],
    femaleBelow6Control:[],
    male617Control:[],
    female617Control:[],
    male1824Control:[],
    female1824Control:[],
    male2559Control:[],
    female2559Control:[],
    male60Control:[],
    female60Control:[],
    armedMaleControl:[],
    armedFemaleControl:[],
    civilMaleControl:[],
    civilFemaleControl:[],
    farmerMaleControl:[],
    farmerFemaleControl:[],
    houseHusbandControl:[],
    houseWifeControl:[],
    jobSeekerMaleControl:[],
    jobSeekerFemaleControl:[],
    monkControl:[],
    nunControl:[],
    privateEmployeeMaleControl:[],
    privateEmployeeFemaleControl:[],
    retireeMaleControl:[],
    retireeFemaleControl:[],
    corporateMaleControl:[],
    corporateFemaleControl:[],
    studentMaleControl:[],
    studentFemaleControl:[],
    othersMaleControl:[],
    othersFemaleControl:[],
    familyIncomeControl:[],
    differentlyAbledControl:[],
    electricCarControl:[],
    hybridCarControl:[],
    taxiControl:[],
    resParkingControl:[],
    otherVehicleControl:[],
    workPlaceSchoolControl:[],
    busTransportControl:[],
    taxiTransportControl:[],
    ownLandControl:[],
    ownHouseControl:[],
    residentRemarksControl:[],
    });
  this.shopForm = this.fb.group({
      shopContactControl:[],
      shopNameControl:[]
  });
    
  }


  submit(){
    // this.router.navigate(['dashboard']);
    // this.registerUnit();
    this.snackBar.open('Unit Registration Complete', '', {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['dashboard',this.buildingId]);
  }
  registerResident(unitid){
    this.resident.unit_id = unitid;
    this.resident.building_id = Number(sessionStorage.getItem('buildingId'));
    this.resident.headHousehold = this.residentForm.get('headHouseholdControl').value;
    this.dataService.postResident(this.resident).subscribe(response=>{
      if(response.success === "true"){
        this.snackBar.open('Registration complete', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['dashboard',this.buildingId])
      }else if (response.success === "false"){
        this.snackBar.open('Cannot register unit', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else if(response.success === "error"){
        this.snackBar.open('Error Registering unit', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    })
  }
  registerUnit(){
    this.unit.building_id=Number(sessionStorage.getItem('buildingId'));
    this.unit.unitNumber = this.multiUnitForm.get('multiUnitIdControl').value;
    this.dataService.postUnit(this.unit).subscribe(response=>{
      if(response.success === "true"){
        this.unitId = response.data.id
        if(this.unitUse === "Residential"){
          this.registerResident(this.unitId)
        }else{
          this.snackBar.open('Registration complete', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['dashboard',this.buildingId])
        }
      }else if (response.success === "false"){
        this.snackBar.open('Cannot register unit', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else if(response.success === "error"){
        this.snackBar.open('Error Registering unit', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

getLocation(): void {
  if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.accuracy = position.coords.accuracy;
      }, error => {
        console.error('No support for geolocation');
      }, options);
  } else {
     console.error('No support for geolocation');
  }
}
}
