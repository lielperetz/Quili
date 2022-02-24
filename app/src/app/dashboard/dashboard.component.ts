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
    this.recipesService.GetRandom(10).subscribe(data => {
      if (data.Status) {
        data.Data.recipes.forEach(element => {
          this.randomList.push(element)
        });
      }
    })
    console.log(this.randomList)
  }
  about(): void {
    // document.getElementById("myImg").src = "hackanm.gif";
  }
}
