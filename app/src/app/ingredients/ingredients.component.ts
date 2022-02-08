import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays } from '@syncfusion/ej2-angular-schedule';
import { Product } from '../classes/product';
import { RecipesService } from '../services/recipes.service';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  // savedRecipes = []
  schedulesRecipes = []
  viewRecipes = []

  listPro: Array<Product> = new Array<Product>()
  viewData = []

  startDate: Date = new Date(Date.now())
  endDate: Date = new Date(addDays(this.startDate, 7))

  constructor(public schedulesService: SchedulesService, public recipesService: RecipesService, public activatedRoute: ActivatedRoute, public router: Router) { }
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
    //שליפת מוצרים לפי תאריכים
    this.schedulesService.GetProductsByRange(this.startDate, this.endDate).subscribe(
      (data: any) => {
        if (data.Status) this.listPro = data.Data
        this.groupedBy()
      });
    //שליפת מתכונים לפי טווח תאריכים
    // this.recipesService.GetSavedRecipe().subscribe(
    //   (data: any) => {
    //     this.savedRecipes = data.Data
    //   });
    this.schedulesService.GetRecipesByUser(this.startDate, this.endDate).subscribe(
      (data: any) => {
        if (data.Status) this.schedulesRecipes = data.Data
      });
    this.router.navigate(['site/ingredients/' + formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') + '/' + formatDate(this.endDate, 'yyyy-MM-dd', 'en-US')])
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
          img: "https://spoonacular.com/cdn/ingredients_500x500/" + (groupedByProductName[x].map(x => x.ProductImage)),
          amount: (groupedByProductName[x].map(x => x.Amount).reduce(function (a, b) { return a + b; })),
          unit: (groupedByProductName[x].map(x => x.Unit)).reduce(function (a, b) { if (a == b) return b; }),
          recipes: groupedByProductName[x].map(x => this.RecipeIdToRecipeName(x.RecipeCode)),
          showRecipes: false,
          checkbox: false
        })
    })
  }
  RecipeIdToRecipeName(id) {
    console.log(id)
    var res
    this.schedulesRecipes.map(r => {
      if (r.Code == id) { res = r.RecipeTitle }
    })
    return res
  }
  OpenCloseRecipes(e) {
    console.log(e)
    this.viewData.map(x => { if (x.code == e.target.value) x.showRecipes = !x.showRecipes })
  }
  ProductCheckbox(e) {
    this.viewData.map(x => {
      if (x.code == e.target.value) { x.checkbox = !x.checkbox; }
    })
  }
  isE(listRecipes, recipeTitle): boolean {
    listRecipes.map(x => { if (x.RecipeTitle == recipeTitle) return true })
    return false
  }
  vr() {
    this.viewRecipes = []
    this.schedulesRecipes.map(x => {
      if (this.isE(this.viewRecipes, x.RecipeTitle) == false)
        this.viewRecipes.push(
          {
            code: x.RecipeId,
            name: x.RecipeTitle,
            checkbox: false
          })
    })

    // this.listPro.map(x => {
    //   this.viewRecipes.map(y => { if (y.code == x.RecipeCode) { this.listPro } })
    // })
  }
  RecipesCheckbox(e) {
    this.viewRecipes.map(x => {
      if (x.code == e.target.value) {
        x.checkbox = !x.checkbox;
        console.log(x.checkbox)
      }
    })
    for (var i = 0; i < this.listPro.length; i++) {
      this.viewRecipes.map(x => {
        if ((x.code == this.listPro[i].RecipeCode) && (!x.checkbox))
          this.listPro.splice(i, 1)
      })
      this.logPage()
      // for (var j = 0; i < this.viewRecipes.length; j++) {
      //   if((this.listPro[i].RecipeCode==this.viewRecipes[j].code)&&(!this.viewRecipes[j].checkbox)){
      //     this.listPro.splice(i,1)
      //   }
      // }
    }
  }
}
