import { Component, OnInit } from '@angular/core';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../assets/css/pages/page-auth.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User()
  constructor(public UserService: UserService, public router: Router, public titleService:Title) { 
    this.titleService.setTitle("Sign Up - Quili");
  }

  ngOnInit(): void {
    feather.replace();
  }

  newUser() {
    this.UserService.Add(this.user).subscribe(
      (response: any) => {
        if (response.Status) {
          this.router.navigate(['/auth/login'])
        }
        else alert(response.Error)
      })
  }
}
