import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Imports Services
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  authState:any;
  isLoggedIn:boolean;
  currentUser:any = {};
  constructor( private http : HttpClient, auth : AuthService){
    this.isLoggedIn = auth.isLoggedIn()
    this.currentUser = auth.currentUser();
  }
  


  ngOnInit() {
  }

}
