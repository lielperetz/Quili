import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  listPro: Array<Product> = new Array<Product>()
  // מערך מקבלי לרשימת מוצרים המייצג האם המוצר ברשימה מופיע קודם שוב
  lp: Array<boolean> = new Array<boolean>()

  Recipes: Array<number> = new Array<number>()

  startDate: Date = new Date(Date.now())
  endDate: Date = new Date(Date.now())

  nxtName: string = ""

  constructor(public schedulesService: SchedulesService, public activatedRoute: ActivatedRoute) { }

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
        for (var i = this.listPro.length - 1; i > 0; i--) {
          if (this.listPro[i].ProductName == this.nxtName)
            this.lp[i] = false
          else
            this.lp[i] = true
          this.nxtName = this.listPro[i].ProductName
        }
      })
  }

  addR(i: number) {
    this.Recipes.push(this.listPro[i].RecipeCode)
  }
  deleteR(i: number) {
    if (this.lp[i])
      this.Recipes = []
  }

}
