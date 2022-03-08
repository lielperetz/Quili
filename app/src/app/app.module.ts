import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './layout/auth/auth.component';
import { SiteComponent } from './layout/site/site.component';
import { CookieService } from 'ngx-cookie-service';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ContextMenuModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ShowRecipeDetailsComponent } from './show-recipe-details/show-recipe-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { AuthGuard } from './services/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { FooterComponent } from './footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    NavComponent,
    SignUpComponent,
    HomeComponent,
    AuthComponent,
    SiteComponent,
    IngredientsComponent,
    ShowRecipeDetailsComponent,
    DashboardComponent,
    SavedRecipesComponent,
    GraficoBarrasComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ScheduleModule,
    ButtonModule,
    DialogModule,
    DropDownListModule,
    SplitButtonModule,
    SidebarModule,
    ContextMenuModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    SlickCarouselModule,
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
