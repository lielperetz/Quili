import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Recipe } from '../classes/Recipe';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//   withCredentials: true,
//   observe: 'response' as 'response'
// };
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  isEdit: boolean = false
  url: string = "http://localhost:44376/Api/Recipes/"
  constructor(private httpClient: HttpClient) { }

  // GetRecipesByUser(): Observable<any> {
  //   return this.httpClient.get<any>(this.url + "GetRecipesByUser", { headers: headers, withCredentials: true }).pipe(catchError(this.handleError))
  // }
  // GetRecipes(): Observable<any> {
  //   return this.httpClient.get<any>(this.url + "GetRecipes", { headers: headers, withCredentials: true }).pipe(catchError(this.handleError))
  // }
  AddRecipe(rec: Recipe): Observable<any> {
    return this.httpClient.put<any>(this.url + "AddRecipe", JSON.stringify(rec), { headers: headers }).pipe(catchError(this.handleError))
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}


