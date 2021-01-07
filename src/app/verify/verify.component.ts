import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs/operators';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  showVerifyByCid: boolean;
  verifyForm: FormGroup;
 

  constructor(
    private fb:FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
 
    this.showVerifyByCid = false;
    this.reactiveForm();

  }

  reactiveForm(){
    this.verifyForm = this.fb.group({
      cidControl:['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  VerifyByCid(){
    this.showVerifyByCid = true
  }

  chechValidity(){
    if (this.verifyForm.valid) {
        const cid = this.verifyForm.get('cid').value;
        alert(cid)
      }
 
  }
  

}
