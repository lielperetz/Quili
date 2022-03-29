import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  url: string = environment.baseUrl + 'Schedules/';

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }
  GetRecipesByUser(d1: Date, d2: Date): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.cookies.get('Token'))
    return this.httpClient.get<any>(this.url + "GetSchedulesByRange/" + formatDate(d1, 'yyyy-MM-dd', 'en-US') + "/" + formatDate(d2, 'yyyy-MM-dd', 'en-US'), { headers: header }).pipe(catchError(this.handleError))
  }
  GetProductsByRange(d1: Date, d2: Date): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.cookies.get('Token'))
    return this.httpClient.get<any>(this.url + "GetProductsByRange/" + formatDate(d1, 'yyyy-MM-dd', 'en-US') + "/" + formatDate(d2, 'yyyy-MM-dd', 'en-US'), { headers: header }).pipe(catchError(this.handleError))
  }
  RemoveSchedules(id: number, rec: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "RemoveSchedules/" + id + "/" + rec).pipe(catchError(this.handleError))
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    return throwError(() => new Error('test'));
  }
}
