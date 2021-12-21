import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"Nav",component:NavComponent,children:
    [{path:"LogIn",component:LogInComponent},
     {path:"SignUp",component:SignUpComponent},
     {path:"Home",component:HomeComponent}]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
