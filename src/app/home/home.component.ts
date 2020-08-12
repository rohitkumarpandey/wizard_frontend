import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
declare var $ : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogout : Boolean = false;
  constructor(private spinner : NgxSpinnerService, private authService : AuthService, private router : Router) { }

  ngOnInit() {

    $('#myNavbar ul li').on('click', function(){
      $('#myNavbar').collapse('hide');
    })
  }

  logout(event){
    this.isLogout = true;
    event.preventDefault();
    this.spinner.show();
    //this.authService.logout();
    this.authService.logout();
    setTimeout(()=>{
      this.router.navigateByUrl('');
      this.spinner.hide();
    this.isLogout = false;}, 2000);
    
  }

}
