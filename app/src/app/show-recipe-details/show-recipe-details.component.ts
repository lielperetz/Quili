import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { SavedRecipesService } from '../services/saved-recipes.service';

@Component({
  selector: 'app-show-recipe-details',
  templateUrl: './show-recipe-details.component.html',
  styleUrls: ['./show-recipe-details.component.css']
})
export class ShowRecipeDetailsComponent implements OnInit {
  showRecipe: any;
  addedToSavedList: boolean;
  idr: string;
  constructor(
    public httpclient: HttpClient,
    public recipes: RecipesService,
    public activeRoute: ActivatedRoute,
    public location: Location,
    public savedRecipes: SavedRecipesService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(x => {
      if (x["idRecipe"]) {
        this.idr = x["idRecipe"];
        this.savedRecipes.IsSaved(x["idRecipe"]).subscribe(
          (res: any) => {
            if (res.Status)
              this.addedToSavedList = res.Data;
          }
        )
        this.recipes.GetRecipeById(x["idRecipe"]).subscribe(
          (response: any) => {
            if (response.Status) {
              this.showRecipe = response.Data;
            }
            else
              alert(response.Error);
          })
      }
    })
  }

  goBack() {
    this.location.back();
  }

  handleAdd() {
    this.savedRecipes.AddToSavedRecipes(this.showRecipe).subscribe(
      (res: any) => {
        if (res.Status) {
          this.addedToSavedList = true;
          console.log(res.Data)
        }
        else
          alert(res.Error)
      })
  }

  handleRemove() {
    this.savedRecipes.RemoveSavedRecipe(this.showRecipe.id).subscribe(() => {
      this.addedToSavedList = false;
    })
  }
}


