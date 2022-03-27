import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays } from '@syncfusion/ej2-angular-schedule';
import { Product } from '../classes/product';
import { RecipesService } from '../services/recipes.service';
import { SchedulesService } from '../services/schedules.service';
import { SiteService } from '../services/site.service';

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
  gridMode = true;

  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(addDays(this.startDate, 7));
  minDate: Date = new Date(Date.now());

  constructor(public schedulesService: SchedulesService, public recipesService: RecipesService, public activatedRoute: ActivatedRoute, public router: Router, public titleService: Title, private siteService: SiteService) {
    this.titleService.setTitle("Shopping List - Quili");
    siteService.setNormal();
    this.siteService.setCurrentPage("ShoppingList");
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      if (x["startDate"] && x["endDate"]) {
        if (x["startDate"])
          this.startDate = x["startDate"]
        if (x["endDate"])
          this.endDate = x["endDate"]
        this.logPage()
      } else {
        this.router.navigate(['site/ingredients/' + formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') + '/' + formatDate(this.endDate, 'yyyy-MM-dd', 'en-US')])
      }
    })
  }

  async logPage(): Promise<void> {
    this.viewRecipes = [];
    //קבלת המתכונים לפי התאריכים
    this.schedulesService.GetRecipesByUser(this.startDate, this.endDate).subscribe(
      (recipeItem: any) => {
        if (recipeItem.Status) {
          this.schedulesRecipes = recipeItem.Data;
          this.schedulesRecipes.forEach(si => {
            let dup = Object.assign({}, si);
            dup.isChecked = true;
            this.viewRecipes.push(dup);
          })
        }
        //שליפת מוצרים לפי תאריכים
        this.schedulesService.GetProductsByRange(this.startDate, this.endDate).subscribe(
          (productItem: any) => {
            if (productItem.Status) this.listPro = productItem.Data
            this.createList()
          });
      });
    // הכנסת נתונים לרשימת מוצרים ואיחוד מוצרים זהים
    // var groupedByProductName = this.listPro.reduce(function (rv, x) {
    //   (rv[x['ProductName']] = rv[x['ProductName']] || []).push(x);
    //   return rv;
    // }, {});
    // (Object.keys(groupedByProductName)).forEach(x => {
    //   this.viewData.push(
    //     {
    //       name: x,
    //       code: (groupedByProductName[x].map(x => x.Code)),
    //       img: "https://spoonacular.com/cdn/ingredients_500x500/" + (groupedByProductName[x].map(x => x.ProductImage)),
    //       amount: (groupedByProductName[x].map(x => x.Amount).reduce(function (a, b) { return a + b; })),
    //       unit: (groupedByProductName[x].map(x => x.Unit)).reduce(function (a, b) { if (a == b) return b; }),
    //       recipes: groupedByProductName[x].map(x => this.RecipeIdToRecipeName(x.RecipeCode)),
    //       showRecipes: false,
    //       checkbox: false
    //     })
    // })
    //שליפת מתכונים לפי טווח תאריכים
    // this.recipesService.GetSavedRecipe().subscribe(
    //   (data: any) => {
    //     this.savedRecipes = data.Data
    //   });
  }

  // RecipeIdToRecipeName(id) {
  //   console.log(id)
  //   var res
  //   this.schedulesRecipes.map(r => {
  //     if (r.Code == id) { res = r.RecipeTitle }
  //   })
  //   return res
  // }
  // OpenCloseRecipes(e) {
  //   console.log(e)
  //   this.viewData.map(x => { if (x.code == e.target.value) x.showRecipes = !x.showRecipes })
  // }

  ProductCheckbox(e) {
    this.viewData.map(x => {
      if (x.Code == e.target.value) { x.checkbox = !x.checkbox; }
    })
  }

  // isE(listRecipes, recipeTitle): boolean {
  //   listRecipes.map(x => { if (x.RecipeTitle == recipeTitle) return true })
  //   return false
  // }
  // vr() {
  //   this.viewRecipes = []
  //   this.schedulesRecipes.map(x => {
  //     if (this.isE(this.viewRecipes, x.RecipeTitle) == false)
  //       this.viewRecipes.push(
  //         {
  //           code: x.RecipeId,
  //           name: x.RecipeTitle,
  //           checkbox: false
  //         })
  //   })

  // this.listPro.map(x => {
  //   this.viewRecipes.map(y => { if (y.code == x.RecipeCode) { this.listPro } })
  // })
  //}

  changeDate() {
    this.navigateToDates();
  }

  parseDate(dateString: string): Date {
    if (dateString)
      return new Date(new Date(dateString).setHours(0));
    return null;
  }

  navigateToDates() {
    this.router.navigate(['site/ingredients/' + formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') + '/' + formatDate(this.endDate, 'yyyy-MM-dd', 'en-US')])
  }

  // RecipesCheckbox(e) {
  //   this.viewRecipes.map(x => {
  //     if (x.code == e.target.value) {
  //       x.checkbox = !x.checkbox;
  //       console.log(x.checkbox)
  //     }
  //   })
  //   for (var i = 0; i < this.listPro.length; i++) {
  //     this.viewRecipes.map(x => {
  //       if ((x.code == this.listPro[i].RecipeCode) && (!x.checkbox))
  //         this.listPro.splice(i, 1)
  //     })
  //     //this.logPage()
  //     // for (var j = 0; i < this.viewRecipes.length; j++) {
  //     //   if((this.listPro[i].RecipeCode==this.viewRecipes[j].code)&&(!this.viewRecipes[j].checkbox)){
  //     //     this.listPro.splice(i,1)
  //     //   }
  //     // }
  //   }
  // }

  createList() {
    let groupedByProductName: Product[] = [];
    this.listPro.forEach(item => {
      var productItem = Object.assign({}, item)
      const recipe = this.viewRecipes.find(x => x.isChecked && x.Code == productItem.RecipeUniqeCode);
      if (recipe) {
        const existProduct = groupedByProductName.find(x => x.ProductName == productItem.ProductName);
        const unitText = (productItem.Unit ? productItem.Unit : "");
        // const unitText = (productItem.Unit ? productItem.Unit : "--");

        if (!existProduct) {
          productItem.Recipes = Array(recipe);
          productItem.Units = Array({ Amount: productItem.Amount, Unit: unitText });
          groupedByProductName.push(productItem);
        } else {
          //check for recipe
          const currExistsRecipe = existProduct.Recipes.find(x => x["Code"] == productItem.RecipeUniqeCode);
          if (!currExistsRecipe) existProduct.Recipes.push(recipe);
          //check for unit
          const currSameUnit = existProduct.Units.find(x => x.Unit == unitText);
          if (currSameUnit) {
            currSameUnit.Amount = currSameUnit.Amount + item.Amount;
          } else {
            existProduct.Units.push({ Amount: item.Amount, Unit: unitText });
          }
        }
      }
    })
    this.viewData = groupedByProductName;
    this.viewData.map(x => {
       x.checkbox = false; 
    })
    // var groupedByProductName = this.listPro.reduce(function (rv, x) {
    //   (rv[x['ProductName']] = rv[x['ProductName']] || []).push(x);
    //   return rv;
    // }, {});
    // console.log("groupedByProductName", groupedByProductName);
    // (Object.keys(groupedByProductName)).forEach(x => {
    //   this.viewData.push(
    //     {
    //       name: x,
    //       code: (groupedByProductName[x].map(x => x.Code)),
    //       img: "https://spoonacular.com/cdn/ingredients_500x500/" + (groupedByProductName[x].map(x => x.ProductImage)),
    //       amount: (groupedByProductName[x].map(x => x.Amount).reduce(function (a, b) { return a + b; })),
    //       unit: (groupedByProductName[x].map(x => x.Unit)).reduce(function (a, b) { if (a == b) return b; }),
    //       recipes: groupedByProductName[x].map(x => this.RecipeIdToRecipeName(x.RecipeCode)),
    //       showRecipes: false,
    //       checkbox: false
    //     })
    // })
  }

  print() {
    window.print()
  }
}