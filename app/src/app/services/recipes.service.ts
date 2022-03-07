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
  constructor(private httpClient: HttpClient, private cookies: CookieService) { }
  AddRecipe(rec: Recipe): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', this.cookies.get('Token'))
    return this.httpClient.put<any>(this.url + "AddRecipe", JSON.stringify(rec), { headers: header }).pipe(catchError(this.handleError))
  }
  SearchRecipe(searchWord: string): Observable<any> {
    return this.httpClient.get<any>(this.url + "SearchRecipe/" + searchWord).pipe(catchError(this.handleError));
  }
  GetRecipeById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + "GetRecipeById/" + id).pipe(catchError(this.handleError))
  }
  GetSavedRecipe(): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.cookies.get('Token'))
    return this.httpClient.get<any>(this.url + "GetSavedRecipe", { headers: header }).pipe(catchError(this.handleError))
  }
  GetRecipeByLocalId(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + "GetRecipeByLocalId/" + id).pipe(catchError(this.handleError))
  }
  GetRandom(num: number): Observable<any> {
    return this.httpClient.get<any>(this.url + "GetRandom/" + num).pipe(catchError(this.handleError))
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}


