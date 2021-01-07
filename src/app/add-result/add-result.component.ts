import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {
  pendingSubjects: []
  constructor(
    private dataservice: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataservice.getPendingCertificate().subscribe(res => {
      this.pendingSubjects = res.data
    })
  }

  setResult(id,result){
    let obj = {
      id: id,
      test_result: result
    }
    this.dataservice.setTestResult(obj).subscribe( res=>{
      if(res.success === "true"){
        location.reload();

      }
    })
  }

}
