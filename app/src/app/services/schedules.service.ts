import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
// const headerDict = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT, DELETE',
//   'Access-Control-Allow-Headers': 'Content-Type, Accept, Pragma, Cache-Control, Authorization',
// }

// const requestOptions = {                                                                                                                                                                                 
//   headers: new HttpHeaders(headerDict), 
// };

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  url: string = "http://localhost:44376/Api/Schedules/"

  constructor(private httpClient: HttpClient, private cookies:CookieService) { }
  GetRecipesByUser(d1: Date, d2: Date): Observable<any> {
    debugger
    return this.httpClient.get<any>(this.url + "GetSchedulesByRange/2021-07-02/2021-07-02", { headers: headers }).pipe(catchError(this.handleError))
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}
