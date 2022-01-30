import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { RecipesService } from '../services/recipes.service';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  savedRecipes = []
  schedulesRecipes = []

  listPro: Array<Product> = new Array<Product>()
  viewData = []

  startDate: Date = new Date(Date.now())
  endDate: Date = new Date(Date.now())

  constructor(public schedulesService: SchedulesService, public recipesService: RecipesService, public activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      if (x["startDate"])
        this.startDate = x["startDate"]
      if (x["endDate"])
        this.endDate = x["endDate"]
    })
    this.logPage()
  }
  logPage() {
    this.schedulesService.GetProductsByRange(this.startDate, this.endDate).subscribe(
      (data: any) => {
        if (data.Status) this.listPro = data.Data
        this.groupedBy()
      })
    this.recipesService.GetSavedRecipe().subscribe(
      (data: any) => {
        this.savedRecipes = data.Data
      })
    this.schedulesService.GetRecipesByUser(this.startDate, this.endDate).subscribe(
      (data: any) => {
        if (data.Status) this.schedulesRecipes = data.Data
      }
    )
  }
  groupedBy() {
    var groupedByProductName = this.listPro.reduce(function (rv, x) {
      (rv[x['ProductName']] = rv[x['ProductName']] || []).push(x);
      return rv;
    }, {});
    (Object.keys(groupedByProductName)).forEach(x => {
      this.viewData.push(
        {
          name: x,
          code: (groupedByProductName[x].map(x => x.Code)),
          amount: (groupedByProductName[x].map(x => x.Amount).reduce(function (a, b) { return a + b; })),
          unit: (groupedByProductName[x].map(x => x.Unit)).reduce(function (a, b) { if (a == b) return b; }),
          recipes: groupedByProductName[x].map(x => this.RecipeIdToRecipeName(x.RecipeCode)),
          show: false
        })
    })
  }
  RecipeIdToRecipeName(id) {
    console.log(id)
    var res
    this.savedRecipes.map(r => {
      if (r.Code == id) { res = r.RecipeTitle }
    })
    return res
  }
  OpenClose(i) {
    this.viewData.map(x => { if (x.code == i) x.show = !x.show })
  }
}
