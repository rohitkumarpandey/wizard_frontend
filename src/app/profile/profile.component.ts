import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $ : any;

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
  profileImageForm : FormGroup;
  fileDate : File = null;
  previewUrl : any = null;
  constructor(private service : ProfileService, private fb : FormBuilder, private authService : AuthService, private spinner : NgxSpinnerService) { 
   this.username = this.authService.getUsername();
   this.emailid = this.authService.getUserEmail();

   this.profileImageForm = this.fb.group({
     profilePic : ['', [Validators.required]]
   });
   
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

  uploadImage(){
    $('#uploadProfile').click();
  }

  fileProgress(fileInput : any){
    this.fileDate = <File>fileInput.target.files[0];
    this.preview();
  }

  preview(){
    var mimetype = this.fileDate.type;
    if(mimetype.match(/image\/*/) == null){
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileDate);
    reader.onload = (_event)=>{
      this.previewUrl = reader.result;
      console.log(this.previewUrl);
    }
  }

}
