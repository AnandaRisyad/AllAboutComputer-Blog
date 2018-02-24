import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

import { User } from './auth/UserInterface';

@Injectable()
export class AuthService {

  constructor(private http:HttpClient) { }

 
  saveToken(token){
    localStorage.setItem("echo-token",token);
  }
  getToken(){
    return localStorage.getItem("echo-token");
  }
  checkToken(){
    if (localStorage.getItem('echo-token')!== null) {return true} else {return false}
  }
  logout(){
    localStorage.removeItem('echo-token');
  }

  isLoggedIn(){
    var token = this.getToken();
    var payload;
  
    if(token){
      payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
  
      return payload.exp > Date.now() / 1000;
    } else if (undefined){
      return false;
    } else {
      return false;
    }
  }

  currentUser() {
    if (this.isLoggedIn()){
      var token = this.getToken();
      var splittedToken  = token.split('.')[1];
      var decoded = atob(splittedToken);
      var payload : User = JSON.parse(decoded);
      return {
        username : payload.username,
        realname : payload.realname,
        email : payload.email
        
      }
    }else{
      return Error("Cannot get current User, user not authenticated");
    }  
  }

  getProfile(){
    if (this.isLoggedIn()){
      let token = this.getToken();
      let split = token.split('.')[1];
      let decoded = atob(split);
      let payload : User = JSON.parse(decoded);
      return {
        username : payload.username,
        realname : payload.realname,
        email : payload.email,
        phone : payload.phone,
        dob : payload.dob,
          joined : payload.joined,
          about : {
            address : payload.about.address,
            image : payload.about.image,
            age:    payload.about.age,
            likes:  payload.about.likes,
            followers:  payload.about.followers,
            follows:    payload.about.follows,
            posts:      payload.about.posts,
            bio:    payload.about.bio,
            website:    payload.about.website,
            device : {
                pc:     payload.about.device.pc,
                phones: payload.about.device.phones
            },
            
            hobby:  payload.about.hobby,
            programmer:     payload.about.programmer,
            job:    payload.about.job
        }
      } 
    }
  }

  register = function(user) {
    return this.http.post('http://localhost:3000/auth', user).subscribe(data => {
      this.saveToken(data.token);
    });
  };
  
  login = function(user) {
    return this.http.post('http://localhost:3000/auth', user).subscribe(data => {
      this.saveToken(data.token);
      console.log(data.token);
    });
  };
}
