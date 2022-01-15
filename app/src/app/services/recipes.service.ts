import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Recipe } from '../classes/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  isEdit: boolean = false
  url: string = "http://localhost:44376/Api/Recipes/"
  constructor(private httpClient: HttpClient, private cookies:CookieService) { }

  AddRecipe(rec: Recipe): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.cookies.get('Token'))
    return this.httpClient.put<any>(this.url + "AddRecipe", JSON.stringify(rec), {headers: header}).pipe(catchError(this.handleError))
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}


