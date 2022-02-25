import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        public cookies: CookieService
    ) { }

    canActivate() {
        if (this.cookies.get('Token')) {
            return true;
        }
        this.router.navigate(['auth/login']);
        return false;
    }
}