import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminName : String = 'Rohit Pandey';
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

  constructor() { }

  ngOnInit() {
  }

}
