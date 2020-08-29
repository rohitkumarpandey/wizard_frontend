import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'ToDo';
  header;

  constructor(private http : HttpClient){
    // this.header = new HttpHeaders()
    // .set('Content-Type', 'application/json');
    // this.http.get(environment.baseUrl+'/pingserver', {
    //   headers : this.header
    // })
    // .toPromise()
    // .then((res)=>{
    //   console.log(res);
    // })
    // .catch()

  }

  ngOnInit(){
    
  }
 
  

 
}
