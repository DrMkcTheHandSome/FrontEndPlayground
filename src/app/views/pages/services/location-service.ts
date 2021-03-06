import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class LocationService{
    private locationUrl = 'assets/api/';

    constructor(private http: HttpClient) { }

    fetchLocationTableData(): Observable<any> {
        return this.http.get<any>(this.locationUrl + 'locationTableColumn.json')
        .pipe(catchError(this.handleError));
     }

    fetchLocationMockData(): Observable<any> {
        return this.http.get<any>(this.locationUrl + 'locationMockData.json').pipe(catchError(this.handleError));
      }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
      }
  }