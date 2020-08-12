import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http : HttpClient) { }


  login(data) : Promise<any>{
  return this.http.post(environment.userAPIUrl +'/login', data)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  register(data) : Promise<any>{
    return this.http.post(environment.userAPIUrl+'/register', data)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }
}
