import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //get user id
  getUserId(){
    return localStorage.getItem('userid');``
  }

  //set user id
  setUserId(uid){
    localStorage.setItem('userid', uid);
  }

  // //get password
  // getPassword(){
  //   return localStorage.getItem('password');
  // }

  // //set password
  // setPassword(password){
  //   localStorage.setItem('password', password);
  // }

  //get username
  getUsername(){
    return localStorage.getItem('username');
  }

  //set username
  setUsername(username){
    localStorage.setItem('username', username);
  }
  //get Token
  getToken(){
    return localStorage.getItem('token');
  }

  //set Token
  setToken(token){
    localStorage.setItem('token', token);
  }
  //set user about
  setUserAbout(about){
    localStorage.setItem('userAbout', about);
  }
  //get user about
  getUserAbout(){
    return localStorage.getItem('userAbout');
  }
  getUserEmail(){
    return localStorage.getItem('email');
  }
  
  setUserEmail(email){
    localStorage.setItem('email', email);
  }
  //isLoggedIn
  isLoggedIn(){
    return this.getUserId() && this.getToken();
  }

  //logout
  logout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.clear();
    return true;
  }



}
