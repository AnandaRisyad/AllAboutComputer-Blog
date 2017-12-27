import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Session } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';

import { User } from './UserInterface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  dbUrl:string = "http://localhost:3000/auth";

  LoginForm:FormGroup;
  RegisterForm:FormGroup;
  post:any;
  logEmail:string = '';
  logPassword:string = '';
  _id:string;
  User:any;  

  AuthForm:number;

  constructor( private http : HttpClient, private fb : FormBuilder) {
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
  getUser(){
    this.User = this.http.get<User>(this.dbUrl+'/user');

  }

  ngOnInit() {
  }

  login(post){
    this.logEmail = post.logEmail;
    this.logPassword = post.logPassword;
    const body = {
      logemail : post.logEmail,
      logpassword : post.logPassword
    }
    this.http.post(this.dbUrl, body).subscribe();
    this.logEmail, this.logPassword = '';
    this._id = sessionStorage.getItem("userId");

    this.getUser();
  }

  
  
  changeAuthForm(form){
    this.AuthForm = form;
  }
}
