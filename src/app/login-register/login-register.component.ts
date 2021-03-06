import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginRegisterService } from './login-register.service';
import { AuthService } from '../services/auth.service';
declare var $ : any;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm : FormGroup;
  errorMessage : String = null;
  registrationForm :FormGroup; 
  isLoginForm : Boolean = true;
  serverStatus : String = 'Connecting to server...';
  userType : String = "user";
  constructor(private router : Router, private spinner : NgxSpinnerService, private fb : FormBuilder,
     private service : LoginRegisterService, private authService : AuthService) { 
       this.loginForm = this.fb.group({
         emailid : ['rohit@gmail.com', [Validators.required, Validators.email]],
         password : ['login', [Validators.required]],
         securitypin : ['']
       });

       this.registrationForm = this.fb.group({
         emailid : ['', [Validators.required]],
         password : ['', [Validators.required]],
         username : ['', [Validators.required]],
         about : ['', [Validators.required]]
       });
     }

  ngOnInit() {
    $('.option button').on('click', function(){
      $('.option button').removeClass('activeBtn');
      $('.option button').css({backgroundColor : '#1F2833'});
      $(this).css({backgroundColor : 'lightblue'});
    });

    //connecting to server
    this.service.serverConnection()
    .then((res)=>{
      this.serverStatus = res.message;
    })
  }

  changeUserType(user){
    if(user === "admin"){
      this.userType = user;
    }else{
      this.userType = user;
    }
  }
  

  login(){
  if(this.userType === "user"){
  this.spinner.show();
    this.service.login(this.loginForm.value)
    .then((res)=>{
      if(res.success){      
        this.authService.setUserId(res.userid);
        this.authService.setUsername(res.username);
        this.authService.setToken(res.token);
        this.authService.setUserEmail(this.loginForm.value.emailid);
        this.router.navigateByUrl('home');
      }else{
        this.errorMessage
         = res.errorMessage;
      }
    }).then(()=>{
        this.spinner.hide();
    })
  }else{
    this.router.navigateByUrl('admin-dashboard');
  }
 
    
  }

  register(){
    this.spinner.show();
    this.service.register(this.registrationForm.value)
    .then((res)=>{
      if(res.success){      
        this.authService.setUserId(res.userid);
        this.authService.setUsername(res.username);
        this.authService.setToken(res.token);
        //this.authService.setUserId(res.userid);
        this.router.navigateByUrl('home');
      }else{
        this.errorMessage
         = res.errorMessage;
      }
    }).then(()=>{
        this.spinner.hide();
    })
  }

}
