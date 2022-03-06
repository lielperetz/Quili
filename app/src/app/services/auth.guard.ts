import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        public cookies: CookieService,
        public user: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);


    }
    checkLogin(url: string): boolean {
        if (this.cookies.get('Token'))
            return true;
        // Store the attempted URL for redirecting
        this.user.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['auth/login']);
        return false;
    }
}