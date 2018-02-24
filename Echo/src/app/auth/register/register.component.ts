import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  RegisterForm:FormGroup;

  data:any

  constructor(private fb : FormBuilder, auth : AuthService) {
    this.RegisterForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'realname': [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'dob' : [null]
    });

    this.data.credentials = {
      username : "",
      email : "",
      phone : 0,
      password : ""
    }
    this.data.onSubmit = function() {
      auth.register(this.data.credentials).error(function(err){alert(err);})
      .then(function(){
        location.assign("profile");
      });
    }

  }

  ngOnInit() {
  }

  
  

}
