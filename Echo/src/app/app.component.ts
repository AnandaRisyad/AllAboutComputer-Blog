import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth/UserInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  User:any;

  constructor( private http : HttpClient ){
  }
  

  ngOnInit(){
    if(localStorage.getItem("echo_user_id") != null){
      this.http.get<User>("http://localhost:3000/" + "user?id=" + localStorage.getItem("echo_user_id")).subscribe(data => {
        this.User = data;
      });
    }
  }

  
}
