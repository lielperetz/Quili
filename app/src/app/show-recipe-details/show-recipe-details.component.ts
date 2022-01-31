import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-show-recipe-details',
  templateUrl: './show-recipe-details.component.html',
  styleUrls: ['./show-recipe-details.component.css']
})
export class ShowRecipeDetailsComponent implements OnInit {
  showRecipe: Record<string, any>;
  constructor(public recipes: RecipesService, public activeRoute: ActivatedRoute, public location: Location) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(x => {
      if (x["idRecipe"])
        this.recipes.GetRecipeById(x["idRecipe"]).subscribe(
          (response: any) => {
            if (response.Status) {
              this.showRecipe = response.Data as Record<string, any>;
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
}


