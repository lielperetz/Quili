import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',

  styleUrls: ['./log-in.component.css', '../../assets/css/pages/page-auth.css']
})
export class LogInComponent implements OnInit {

  user: User = new User()

  constructor(public cookies: CookieService, public router: Router, public UserService: UserService) { }

  ngOnInit(): void {
    feather.replace();
  }

  LogIn() {
    this.UserService.LogIn(this.user).subscribe(
      (response: any) => {
        if (response.Status) {
          this.cookies.set('Token', response.Data)
          alert("wellcome " + this.cookies.get('Token'))
          this.router.navigate(['site/home'])
        }
        else alert(response.Error)
      })
  }
}
