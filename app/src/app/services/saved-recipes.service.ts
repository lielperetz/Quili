import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedRecipesService {
  url: string = "http://localhost:44376/Api/SavedRecipes/";
  numSaved: number = 0;
  constructor(private httpClient: HttpClient, private cookies: CookieService) { }
  AddToSavedRecipes(rec: any): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', this.cookies.get('Token'))
    return this.httpClient.put<any>(this.url + "AddToSavedRecipes", JSON.stringify(rec), { headers: header }).pipe(catchError(this.handleError))
  }
  GetSavedRecipes(): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.cookies.get('Token'))
    return this.httpClient.get<any>(this.url + "GetSavedRecipes", { headers: header }).pipe(catchError(this.handleError))
  }
  RemoveSavedRecipe(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "RemoveSavedRecipe/" + id).pipe(catchError(this.handleError))
  }
  IsSaved(idR: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.cookies.get('Token'))
    return this.httpClient.put<any>(this.url + "IsSaved", '', { headers: header, params: new HttpParams().append('id', idR) }).pipe(catchError(this.handleError))
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}
