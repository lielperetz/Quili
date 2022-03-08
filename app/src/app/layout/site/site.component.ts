import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';
import { CookieService } from 'ngx-cookie-service';
import { SavedRecipesService } from 'src/app/services/saved-recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  public user: string;

  constructor(
    private cookies: CookieService,
    public router: Router,
    public saved: SavedRecipesService) {
    this.user = this.cookies.get('Token');
    saved.GetSavedRecipes().subscribe(
      (res: any) => {
        if (res.Status)
          saved.savedRecipes = res.Data;
          this.saved.numSaved = (res.Data as []).length;
          console.log(saved.savedRecipes)
      })
  }

  ngOnInit(): void {
    feather.replace();
  }

  public logOut() {
    this.cookies.delete('Token');
    this.router.navigate(['/'])
  }

  scrollTop() {
    window.scrollTo(0, 0);
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
        this.saved.RemoveSavedRecipe(id).subscribe(
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
              this.saved.numSaved--;
              window.location.reload();
            }
            else
              console.log(res.Error);
          })
      }
    })
  }
}
