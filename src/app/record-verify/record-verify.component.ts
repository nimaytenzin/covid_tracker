import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-verify',
  templateUrl: './record-verify.component.html',
  styleUrls: ['./record-verify.component.scss']
})
export class RecordVerifyComponent implements OnInit {
  userRole : string;

  constructor() { }

  ngOnInit() {
    this.userRole = sessionStorage.getItem('operatorRole')
    console.log(this.userRole)
  }

}
