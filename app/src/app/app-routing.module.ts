import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './layout/auth/auth.component';
import { SiteComponent } from './layout/site/site.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path : '' , redirectTo : '/auth' , pathMatch:'full' },    
  {
    path: "auth",  component: AuthComponent, children:
      [{ path: "login", component: LogInComponent },
      { path: "signup", component: SignUpComponent },
      {path : '' , component : LogInComponent },             
    ]
  },
  {
    path: "site", component: SiteComponent, children:
      [
      { path: "home", component: HomeComponent },
      {path : '' , component : HomeComponent }            

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
