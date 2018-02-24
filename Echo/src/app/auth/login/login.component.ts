import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm:FormGroup;
  data:any;
  onSubmit:any;
  constructor( private fb : FormBuilder, auth : AuthService) {
    this.LoginForm = fb.group({
      'logEmail': [null, Validators.required],
      'logPassword': [null, Validators.required]
    });

    this.data = {
      logemail : "",
      logpassword : ""
    }
    this.onSubmit = function(){
      auth.login(this.data)
      location.replace('profile')
      
    }



  }

  ngOnInit() {
  }

}
