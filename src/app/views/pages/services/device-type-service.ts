import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, combineLatest,forkJoin } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';
import { DeviceType,DeviceTypeArrayData, DeviceTypeMockDataAndTableData } from '../../interface/interface';
@Injectable({
    providedIn: 'root'
  })

  export class DeviceTypeService{
    private deviceTypeUrl = 'assets/api/';

    constructor(private http: HttpClient) { }

    fetchDeviceTypeTableData(): Observable<any> {
        return this.http.get<any>(this.deviceTypeUrl + 'deviceTypeTableColumn.json')
        .pipe(catchError(this.handleError));
     }

    fetchDeviceTypeMockData(): Observable<any> {
        return this.http.get<any>(this.deviceTypeUrl + 'deviceTypeMockData.json').pipe(catchError(this.handleError));
      }
      fetchDeviceTypeErrorHandlerExample(): Observable<any> {
        return this.http.get<any>(this.deviceTypeUrl + 'deviceTypeMock.json').pipe(catchError(this.handleError));
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

      /* RXJS Practice */
      deviceTypeMockData$ = this.http.get<DeviceType>(this.deviceTypeUrl + 'deviceTypeMockData.json').pipe(
        tap(data => console.log('DeviceTypeMockData', JSON.stringify(data))),
        catchError(this.handleError)
      );

      deviceTypeTableData$ = this.http.get<any>(this.deviceTypeUrl + 'deviceTypeTableColumn.json').pipe(
        tap(data => console.log('DeviceTypeTableData', JSON.stringify(data))),
        catchError(this.handleError)
      );

      deviceTypePracticeMockData$ = this.http.get<DeviceType>(this.deviceTypeUrl + 'deviceTypeMockData.json').pipe(
        map(devicetypes => 
          devicetypes.data.map(devicetype => ({
          ...devicetype,
          isdeleted: false
        }) as DeviceTypeArrayData)
        ),
         shareReplay(1),
        tap(data => console.log('DeviceTypeUsingMap', JSON.stringify(data))),
        catchError(this.handleError)
      );

      deviceTypeMockDataAndTableDataUsingCombineLatest$ = combineLatest([this.deviceTypeMockData$,  this.deviceTypeTableData$ ]).pipe(
        map(([deviceTypeMockData,deviceTypeTableData])  => ({
          mockData: deviceTypeMockData,
          tableData: deviceTypeTableData
        }) as DeviceTypeMockDataAndTableData),
        tap(data => console.log('deviceTypeMockDataAndTableDataUsingCombineLatest', JSON.stringify(data))),
        catchError(this.handleError)
      )

      // Combine Latest Example From Pluralsight
      /*
      productsWithCategory$ = combineLatest([
        this.products$,
        this.productCategoryService.productCategories$
      ]).pipe(
        map(([products, categories]) =>
          products.map(product => ({
            ...product,
            price: product.price * 1.5,
            category: categories.find(c => product.categoryId === c.id).name,
            searchKey: [product.productName]
          }) as Product)
        )
      );
      */
     deviceTypeMockDataAndTableDataUsingForkJoin$ = forkJoin([this.deviceTypeMockData$,  this.deviceTypeTableData$ , this.deviceTypeMockDataAndTableDataUsingCombineLatest$]).pipe(
      tap(data => console.log('deviceTypeMockDataAndTableDataUsingForkJoin', JSON.stringify(data))),
      catchError(this.handleError)
    )

    // Working Using Filter AND Behavior Subject
      // Use can use here SUBJECT  
    deviceTypeMockDataBehaviorSubject(devicetypeArrayData: Observable<any>, deviceTypeSelectedAction: any){
     return combineLatest([
        devicetypeArrayData,
        deviceTypeSelectedAction
        ]).pipe(
          map(([deviceTypes, deviceTypeString]) =>
          // You can use here startswith and any other operator
          deviceTypes.filter(x => x.name === deviceTypeString)
          ),
          tap(data => console.log('deviceTypeMockDataBehaviorSubject', JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

 

  }