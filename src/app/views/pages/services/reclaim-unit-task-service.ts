import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class ReclaimUnitTaskService {
    private reclaimUnitTaskUrl = 'assets/api/';

    constructor(private http: HttpClient) { }

    fetchReclaimUnitTaskTableData(): Observable<any> {
        return this.http.get<any>(this.reclaimUnitTaskUrl + 'reclaim-unit-list-task-table.json')
        .pipe(catchError(this.handleError));
     }

    fetchReclaimUnitTaskMockData(): Observable<any> {
        return this.http.get<any>(this.reclaimUnitTaskUrl + 'reclaim-unit-list-task.json').pipe(catchError(this.handleError));
      }

      fetchReclaimUnitTaskNoMockData(): Observable<any> {
        return this.http.get<any>(this.reclaimUnitTaskUrl + 'reclaim-unit-list-task-no-data.json').pipe(catchError(this.handleError));
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