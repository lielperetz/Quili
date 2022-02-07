import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  public user: string;

  constructor(private cookies: CookieService, public router: Router) { 
    this.user = this.cookies.get('Token');
  }

  ngOnInit(): void {
    feather.replace();
  }

  public logOut(){
    this.cookies.delete('Token');
    this.router.navigate(['/'])
  }
}
