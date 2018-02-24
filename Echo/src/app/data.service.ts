import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable()
export class DataService {

  constructor(private http : HttpClient, auth : AuthService ) { }
  

  getProfile = function () {
    this.http.get('http://localhost:3000/user', {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem("echo-token")
      }
    }).subscribe(data => {

      return data;

    })
  };


}
