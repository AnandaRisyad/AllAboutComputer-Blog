import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './PostsInterface';

import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  posts:Observable<Post>;
  title:string = '';
  
  

  constructor(private http : HttpClient) {

    
  }

  ngOnInit():void {

    
    this.posts = this.http.get<Post>('http://localhost:3000/', {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:3000/'),
    });
  }

}
