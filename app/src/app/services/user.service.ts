import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../classes/uesr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string="http://localhost:44376/Api/Clients/"
  // http://localhost:44376/Api/Clients/AddClient

  constructor(public httpClient:HttpClient) { }

  Add(user:User):Observable<any>{
    return this.httpClient.put<any>(this.url+"AddClient",user).pipe(catchError(this.handleError))
  }
  LogIn(user:User):Observable<any>{
    return this.httpClient.post<any>(this.url+"Login",user).pipe(catchError(this.handleError))
  }

  handleError(errorResponse: HttpErrorResponse){
    console.log(errorResponse);
    return throwError(errorResponse);
  }
}
