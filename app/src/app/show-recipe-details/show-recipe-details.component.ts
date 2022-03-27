import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RecipesService } from '../services/recipes.service';
import { SavedRecipesService } from '../services/saved-recipes.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-show-recipe-details',
  templateUrl: './show-recipe-details.component.html',
  styleUrls: ['./show-recipe-details.component.css']
})
export class ShowRecipeDetailsComponent implements OnInit {
  showRecipe: any;
  addedToSavedList: boolean;
  idr: string;
  equipment = [];
  constructor(
    public httpclient: HttpClient,
    public recipes: RecipesService,
    public activeRoute: ActivatedRoute,
    public location: Location,
    public savedRecipes: SavedRecipesService,
    public titleService: Title,
    public siteService: SiteService) {
    siteService.setFullWidth()
    this.siteService.setCurrentPage("recipe")
  }

  ngOnInit(): void {
    this.showRecipe = null;
    this.activeRoute.params.subscribe(x => {
      if (x["idRecipe"]) {
        this.idr = x["idRecipe"];
        this.savedRecipes.IsSaved(x["idRecipe"]).subscribe(
          (res: any) => {
            if (res.Status)
              this.addedToSavedList = res.Data;
            else
              alert(res.Error)
          }
        )
        this.recipes.GetRecipeById(x["idRecipe"]).subscribe(
          (response: any) => {
            if (response.Status) {
              this.showRecipe = response.Data;
              this.titleService.setTitle(this.showRecipe.title + " - Quili");
              this.setE();
            }
            else
              alert(response.Error);
          })
      }
    });
  }

  handleAdd() {
    this.savedRecipes.AddToSavedRecipes(this.showRecipe).subscribe(
      (res: any) => {
        if (res.Status) {
          this.addedToSavedList = true;
          this.savedRecipes.numSaved++;
          this.savedRecipes.savedRecipes.push(res.Data);
          Swal.fire({
            title: 'Success!',
            text: this.showRecipe.title + " was successfully added.",
            icon: 'success',
            iconColor: '#E16F26',
            timer: 3000,
            showConfirmButton: false
          })
        }
        else
          alert(res.Error)
      })
  }

  handleRemove() {
    Swal.fire({
      title: 'Are you sure you want to remove this recipe?',
      icon: 'warning',
      iconColor: '#E16F26',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#E16F26',
      cancelButtonText: 'Cancal'
    }).then((result) => {
      if (result.value) {
        this.savedRecipes.RemoveSavedRecipe(this.showRecipe.id).subscribe(
          (res: any) => {
            if (res.Status) {
              this.addedToSavedList = false;
              Swal.fire({
                title: 'Deleted!',
                text: this.showRecipe.title + ' was successfully deleted.',
                icon: 'success',
                iconColor: '#E16F26',
                timer: 3000,
                showConfirmButton: false
              })
              this.savedRecipes.savedRecipes.splice(this.savedRecipes.savedRecipes.findIndex(x => x.Id === this.showRecipe.id), 1)
              this.savedRecipes.numSaved--;
            }
            else
              console.log(res.Error);
          })
      }
    })
  }

  setE() {
    this.equipment = [];
    this.showRecipe?.analyzedInstructions[0].steps.forEach(element => {
      if ((element.equipment as Array<any>).length > 0)
        element.equipment?.forEach(item => {
          if (this.equipment.filter(x => x.id == item.id)[0] == null)
            this.equipment?.push(item);
        })
    });
  }

  print() {
    window.print();
  }
}


