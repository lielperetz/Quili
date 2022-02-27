import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  randomList = []
  constructor(public recipesService: RecipesService) { }

  ngOnInit(): void {
    this.randomList = []
    this.recipesService.GetRandom(9).subscribe(data => {
      if (data.Status) {
        data.Data.recipes.forEach(element => {
          this.randomList.push("https://spoonacular.com/recipeImages/"+element.id+"-636x393.jpg")
        });
      }
      else
        console.log(data.Error)
    })
    console.log(this.randomList)
  }
}
