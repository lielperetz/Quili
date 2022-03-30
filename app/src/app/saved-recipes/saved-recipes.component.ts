import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { SavedRecipesService } from '../services/saved-recipes.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent implements OnInit {
  listSave: any;

  constructor(public savedRecipes: SavedRecipesService, public titleService: Title, private siteService: SiteService) {
    this.titleService.setTitle(" Saved Recipes - Quili");
    this.siteService.setCurrentPage("SavedRecipes")
    siteService.setFullWidth()
    this.savedRecipes.GetSavedRecipes().subscribe(
      (response: any) => {
        if (response.Status) {
          this.listSave = response.Data;
        }
        else
          this.siteService.errorAlert("Oops something went wrong")
      })
  }

  ngOnInit(): void {
  }

  handleRemove(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this recipe from your Favorites?',
      icon: 'warning',
      iconColor: '#E16F26',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#E16F26',
      cancelButtonText: 'Cancal'
    }).then((result) => {
      if (result.value) {
        this.savedRecipes.RemoveSavedRecipe(id).subscribe(
          (res: any) => {
            if (res.Status) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Delete successfully.',
                icon: 'success',
                iconColor: '#E16F26',
                timer: 3000,
                showConfirmButton: false
              })
              this.savedRecipes.numSaved--;
              window.location.reload();
            }
            else
              console.log(res.Error);
          })
      }
    })
  }
}