import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { User } from './UserInterface';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  
  dbUrl:string = "http://localhost:3000/";

  LoginForm:FormGroup;
  RegisterForm:FormGroup;
  post:any;
  logEmail:string = '';
  logPassword:string = '';
  _id:string;
  User:any;  
  UserId:any = localStorage.getItem("echo_user_id");
  AuthForm:number = 0;


  

  constructor( private http : HttpClient, private fb : FormBuilder, private auth : AuthService) {
    this.LoginForm = fb.group({
      'logEmail': [null, Validators.required],
      'logPassword': [null, Validators.required]
    });

    this.RegisterForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'realname': [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'dob' : [null]
    });


  }

  
  ngOnInit() {
    
  }

  login(post){
    this.logEmail = post.logEmail;
    this.logPassword = post.logPassword;
    const body = {
      logemail : post.logEmail,
      logpassword : post.logPassword
    };
    this.http.post(this.dbUrl + "auth", {
      logemail : post.logEmail,
      logpassword : post.logPassword
    }).subscribe(data => {
      this.UserId = data;
      localStorage.setItem("echo_user_id", data.toString());
    });
    this.logEmail, this.logPassword = '';


    
  }

  


  valueScan(input){
    if (input == null){
      return "null";
    }
    else {
      return input;
    }

  }
}
