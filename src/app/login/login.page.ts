import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'ionic';
import { LoginService } from '../login.service';
import { LoginCredential } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    formBuilder: FormBuilder
  ) {
    this.loginFormGroup = formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
   }

  ngOnInit() {
  }

  login(){
    console.log('asfa')

    const loginCredential: LoginCredential = this.loginFormGroup.value;
    this._loginService.login(loginCredential)
      .then((authData)=> {
        this._router.navigate(["/tabs"]);
        console.log("HEHEHEHEHEH"+authData);
        
      })
      .catch((authError)=> {
        console.log("error" + authError);
      });
  }
}
