import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AuthComponent } from './layout/auth/auth.component';
import { SiteComponent } from './layout/site/site.component';
import { LogInComponent } from './log-in/log-in.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { AuthGuard } from './services/auth.guard';
import { ShowRecipeDetailsComponent } from './show-recipe-details/show-recipe-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  { path: '', redirectTo: '/site', pathMatch: 'full' },
  {
    path: "auth", component: AuthComponent, children:
      [{ path: "login", component: LogInComponent },
      { path: "signup", component: SignUpComponent },
      { path: '', component: LogInComponent },
      ]
  },
  {
    path: "site", component: SiteComponent, children:
      [
        { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
        { path: "ingredients/:startDate/:endDate", component: IngredientsComponent, canActivate: [AuthGuard] },
        { path: "ingredients", component: IngredientsComponent, canActivate: [AuthGuard] },
        { path: '', component: DashboardComponent },
        { path: "showDetails/:idRecipe", component: ShowRecipeDetailsComponent, canActivate: [AuthGuard] },
        { path: "savedRecipes", component: SavedRecipesComponent, canActivate: [AuthGuard] }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, NgModule, BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
