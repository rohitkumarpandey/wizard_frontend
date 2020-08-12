import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username : String;
  myPosts = [];
  about : String;

  constructor(private service : ProfileService, private authService : AuthService) { 
   this.username = this.authService.getUsername();
   
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
      this.service.getProfile(this.authService.getUserId())
      .then((res)=>{
        if(res.success){
            this.about = res.user.about;
            this.myPosts = this.myPosts.concat(res.user.posts);
        }
      })
  }

}
