import { Component, OnInit } from '@angular/core';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../assets/css/pages/page-auth.css']
})
export class SignUpComponent implements OnInit {

  user:User=new User()
  constructor(public UserService:UserService) { }

  ngOnInit(): void {
    feather.replace();
  }

  newUser(){
    this.UserService.Add(this.user).subscribe(
      (response:any)=>{
        if(response.Status) alert("Email "+response.Data+" added successfully")
        else alert(response.Error)})
  }

}
