import { Component, OnInit } from '@angular/core';
import { SavedRecipesService } from '../services/saved-recipes.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent implements OnInit {
listSave: any;
  constructor(
    public savedRecipes: SavedRecipesService
  ) { }

  ngOnInit(): void {
    this.savedRecipes.GetSavedRecipes().subscribe(
      (response: any) => {
        if (response.Status) {
          this.listSave = response.Data;
        }
        else
          alert(response.Error);
      })
  }
}
