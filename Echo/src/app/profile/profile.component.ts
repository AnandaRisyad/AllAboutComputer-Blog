import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './UserInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Import Services
import { DataService } from './../data.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Variables
  dbUrl:string = "http://localhost:3000/";
  
  tabNumber:number = 0;
  ProfileForm:FormGroup;

  User:any = {};

  constructor( private http:HttpClient, private fb:FormBuilder, private auth : DataService) {
    this.ProfileForm = fb.group({
      
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'realname': [null, Validators.required],
      'dob' : [null],
      //<><><><><><><><><><><><>\\
      'address' : [],
      'image' : [],
      'age' : [null, Validators.minLength(12)],
      'bio' : [null, Validators.minLength(30)],
      'pc' : [],
      'phone':[],
      'website':[],
      'hobby':[],
      'job':[]
    });


    this.User = auth.getProfile()

}


  ngOnInit() {}

  updateProfile(form){
    const body = {
      
      username : form.username,
      realname : form.realname,
      dob : form.dob,
      about : {
        address : form.address,
        image : form.image,
        age : form.age,
        bio : form.bio,
        website : form.website,
        device : {
          pc : form.pc,
          phones : form.phone
        },
        hobby : form.hobby,
        programmer: form.programmer,
        job : form.job

      }
    }
    this.http.post(this.dbUrl+"profile", {
      _id : localStorage.getItem("echo_user_id"),
      username : form.username,
      realname : form.realname,
      dob : form.dob,
      about : {
        address : form.address,
        image : form.image,
        age : form.age,
        bio : form.bio,
        website : form.website,
        device : {
          pc : form.pc,
          phones : form.phone
        },
        hobby : form.hobby,
        programmer: form.programmer,
        job : form.job
      }
    }).subscribe(data => {
      alert(data);
      
    });
    this.ngOnInit();
    this.changeTab(0);
  }


  //-------------------------------- Utility ------------------------ \\

  // To scan an data value. example, check a value on a database
  valueScan(input){
    if (input == null){
      return "null";
    }
    else {
      return input;
    }

  }

  changeTab(number){
    this.tabNumber=number;
  }

}
