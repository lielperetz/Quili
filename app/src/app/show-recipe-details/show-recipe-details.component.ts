import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-show-recipe-details',
  templateUrl: './show-recipe-details.component.html',
  styleUrls: ['./show-recipe-details.component.css']
})
export class ShowRecipeDetailsComponent implements OnInit {
  showRecipe: Record<string, any>;
  cardRecipe: string = "";
  constructor(public httpclient: HttpClient, public recipes: RecipesService, public activeRoute: ActivatedRoute, public location: Location) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(x => {
      if (x["idRecipe"])
        this.recipes.GetRecipeById(x["idRecipe"]).subscribe(
          (response: any) => {
            if (response.Status) {
              this.showRecipe = response.Data as Record<string, any>;
              this.getRecipeCard("https://api.spoonacular.com/recipes/" + this.showRecipe?.id + "/card?apiKey=52b9142911034ec3b82f8d31cb7410ca").subscribe(
                (res: any) => {
                  if (res.status)
                    this.cardRecipe = res.url;
                  else
                    console.log(res.message)
                })
              console.log(this.showRecipe)
            }
            else
              alert(response.Error);
          })
    })
  }

  goBack() {
    this.location.back();
  }

  getRecipeCard(url: string): Observable<object> {
    return this.httpclient.get<object>(url);
  }
}


