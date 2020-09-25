import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
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
  profilePicture : String;
  constructor(private service : ProfileService, private fb : FormBuilder, private authService : AuthService, private spinner : NgxSpinnerService,
    private imageCompress : NgxImageCompressService ) { 

   this.emailid = this.authService.getUserEmail();

   this.profileImageForm = this.fb.group({
     image : ['', [Validators.required]]
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
          this.username = res.user.username;
            this.about = res.user.about;
            this.profilePicture = res.user.image;
            this.myPosts = this.myPosts.concat(res.user.posts);
        }
      })
      .then(()=>this.spinner.hide())
  }

  uploadImage(){
   // $('#uploadProfile').click();
   this.imageCompress.uploadFile().then(({image, orientation})=>{
     
     this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.previewUrl = result;
      }
    );
   });
 
  }

  // fileProgress(fileInput : any){
  //   this.fileDate = <File>fileInput.target.files[0];
  //   this.preview();
  // }

  // preview(){
  //   var mimetype = this.fileDate.type;
  //   if(mimetype.match(/image\/*/) == null){
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileDate);
  //   reader.onload = (_event)=>{
  //     this.previewUrl = reader.result;
  //   }
  // }

  uploadProfilePic(){
    this.spinner.show();
    this.profileImageForm.value.image = this.previewUrl; 
   // this.service.temp(this.authService.getUserId(), this.profileImageForm.value);
    this.service.uploadProfile(this.authService.getUserId(), this.profileImageForm.value)
    .then((res)=>{
        if(res.success){
          
          this.getProfile();   
          this.previewUrl = null;
        }
        
    })
    
  }
  deleteProfilePic(){
    this.spinner.show();
    if(this.previewUrl !=null){
      this.previewUrl = null;
      this.spinner.hide();
    }else{
      this.service.deleteProfilePic(this.authService.getUserId())
      .then((res)=>{
        if(res.success){
          this.profilePicture = null;
        }
        this.spinner.hide();
      })
    }
  }

}
