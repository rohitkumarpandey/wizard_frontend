import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  fileUploadProgress = '0%';
  constructor(private http : HttpClient) { }

  getProfile(uid) : Promise<any>{
  
    return this.http.get(environment.userAPIUrl+'/getProfile/'+uid)
    .toPromise()
    .then((res)=>{
      return res;
    })

  }

  uploadProfile(uid, data): Promise<any>{
    
    return this.http.post(environment.userAPIUrl+'/uploadProfilePic/'+uid, data)
    .toPromise()
    .then((res)=>{
      return res;
    })

  }

  temp(uid, data){
     this.http.post(environment.userAPIUrl+'/uploadProfilePic/'+uid, data, 
    {reportProgress : true,
    observe : 'events'})
    .subscribe((events)=>{
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);          
        alert('SUCCESS !!');
      }
    }) 
  }

  deleteProfilePic(uid): Promise<any>{
  
    return this.http.delete(environment.userAPIUrl+'/deleteProfilePic/'+uid)
    .toPromise()
    .then((res)=>{
      return res;
    })

  }
}
