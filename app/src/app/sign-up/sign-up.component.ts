import { Component, OnInit } from '@angular/core';
import { User } from '../classes/uesr';
import { UserService } from '../services/user.service';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../assets/css/pages/page-auth.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User()
  constructor(public UserService: UserService, public router: Router, public titleService: Title) {
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
            iconColor: '#E16F26',
            title: response.Error,
          })
        }
      })
  }
}
