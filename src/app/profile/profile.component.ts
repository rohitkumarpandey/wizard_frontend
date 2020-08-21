import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username : String;
  myPosts = [];
  about : String;
  emailid : String = null;

  constructor(private service : ProfileService, private authService : AuthService, private spinner : NgxSpinnerService) { 
   this.username = this.authService.getUsername();
   this.emailid = this.authService.getUserEmail();
   
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.spinner.show();
      this.service.getProfile(this.authService.getUserId())
      .then((res)=>{
        if(res.success){
            this.about = res.user.about;
            this.myPosts = this.myPosts.concat(res.user.posts);
        }
      })
      .then(()=>this.spinner.hide())
  }

}
