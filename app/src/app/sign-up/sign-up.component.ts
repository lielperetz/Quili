import { Component, OnInit } from '@angular/core';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../assets/css/pages/page-auth.css']
})
export class SignUpComponent implements OnInit {

  user:User=new User()
  constructor(public UserService:UserService, public router:Router) { }

  ngOnInit(): void {
    feather.replace();
  }

  newUser(){
    this.UserService.Add(this.user).subscribe(
      (response:any)=>{
        if(response.Status) {
          this.router.navigate(['/'])
        }
        else alert(response.Error)})
  }

}
