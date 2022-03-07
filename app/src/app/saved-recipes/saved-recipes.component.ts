import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  ) {
    this.savedRecipes.GetSavedRecipes().subscribe(
      (response: any) => {
        if (response.Status) {
          this.listSave = response.Data;
        }
        else
          alert(response.Error);
      })
  }

  ngOnInit(): void {
  }

  handleRemove(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this recipe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
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
                iconColor: 'orange',
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