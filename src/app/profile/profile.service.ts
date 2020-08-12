import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getProfile(uid) : Promise<any>{
  
    return this.http.get(environment.userAPIUrl+'/getProfile/'+uid)
    .toPromise()
    .then((res)=>{
      return res;
    })

  }
}