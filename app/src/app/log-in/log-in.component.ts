import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',

  styleUrls: ['./log-in.component.css', '../../assets/css/pages/page-auth.css']
})
export class LogInComponent implements OnInit {
  user: User = new User()

  constructor(
    public cookies: CookieService,
    public router: Router,
    public userService: UserService,
    public titleService: Title) {
    this.titleService.setTitle("Log In - Quili");
  }

  ngOnInit(): void {
    feather.replace();
  }

  LogIn() {
    this.userService.LogIn(this.user).subscribe(
      (response: any) => {
        if (response.Status) {
          this.cookies.set('Token', response.Data)
          if (this.userService.redirectUrl) {
            this.router.navigate([this.userService.redirectUrl]);
            this.userService.redirectUrl = null;
          }
          else
            this.router.navigate(['/'])
        }
        else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            iconColor: 'orange',
            title: 'Oops...Something went wrong!',
          })
        }
      })
  }
}
