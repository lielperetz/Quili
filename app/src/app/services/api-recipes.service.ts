import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRecipesService {

  public url: string = "http://localhost:44376/Api/Recipes/";

  constructor(private httpClient: HttpClient, private cookies:CookieService) { }

  SearchRecipe(searchWord: string): Observable<any> {
    return this.httpClient.get<any>(this.url + "SearchRecipe/"+ searchWord).pipe(catchError(this.handleError));
  }
  GetRecipeInfo(id: string):Observable<any>{
    return this.httpClient.get<any>(this.url + "GetRecipeById/"+ id).pipe(catchError(this.handleError));
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}
