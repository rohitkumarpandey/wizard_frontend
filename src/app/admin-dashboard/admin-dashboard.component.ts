import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminName : String = 'Rohit Pandey';
  isLogout : Boolean = false;
  userList  = [{username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'},
  {username : 'Rohit', emailid : 'rohit@gmail.com', d : '12 Aug 2020'}]

  constructor(private authService : AuthService, private spinner : NgxSpinnerService, private router : Router) { }

  ngOnInit() {
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
