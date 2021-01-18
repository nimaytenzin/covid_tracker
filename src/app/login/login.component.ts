import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  submitted = false;
  showLoginForm: boolean;
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reactiveForm();
    this.showLoginForm = false
  }

  get f() { return this.loginForm.controls; }

  reactiveForm() {
    this.loginForm = this.fb.group({
      cid: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.loginForm.controls.cid.setValue(localStorage.getItem('loginId'));
  }

  frontlinerRegister(){
    this.router.navigate(['frontline-registration'])
    
  }

  
  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const loginId = this.loginForm.get('cid').value;
      const password = this.loginForm.get('password').value;
      this.authService.validateLogin(loginId, password).subscribe(response => {
        sessionStorage.setItem('operatorId', response.data.id);
        this.router.navigate(['navigate']);
        this.snackBar.open('Welcome ' + response.data.name, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      },
      error => {
        this.submitted = false;
        this.snackBar.open('Invalid login credentials, please try again', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
        console.log(error);
      });
    }
  }
}
