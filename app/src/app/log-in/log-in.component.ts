import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  
  styleUrls: ['./log-in.component.css' ,'../../assets/css/pages/page-auth.css']
})
export class LogInComponent implements OnInit {

  user:User=new User()

  constructor(public Router:Router, public UserService:UserService) { }

  ngOnInit(): void {
    feather.replace();
  }

  LogIn(){
    this.UserService.LogIn(this.user).subscribe(
      (response:any)=>{
        if(response.Status) alert("wellcome "+response.Data)
        else alert(response.Error)})
  }
}
