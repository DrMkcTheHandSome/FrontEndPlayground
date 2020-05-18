import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatInput, MatCheckbox, MatDialog, Sort, PageEvent, MatTabChangeEvent} from '@angular/material';
import {UnitDeploymentInquiryMockData,  UnitDeploymentInquiryTableData, DeviceTypeTableColumn, DeviceTypeMockData,
   LocationTableColumn, LocationMockData, IndustryTableColumn, IndustryMockData,
   ClientTypeTableColumn,ClientTypeMockData,UserTypeTableColumn,UserTypeMockData } from './mock-data';
import {DynamicColumn, UnitDeploymentInquiry, DeviceTypeMockDataAndTableData} from '../../interface/interface';
import {PageTitle} from '../shared/enums/page-title';
import { UnitInquiryService } from '../services/unit-inquiry-service'
import { DeviceTypeService } from '../services/device-type-service';
import { IndustryService } from '../services/industry-service';
import { UserTypeService } from '../services/user-type-service';
import { LocationService } from '../services/location-service';
import { ClientTypeService } from '../services/client-type-service';
import { ProgressService } from '../services/progress-service';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import { Mode } from '../shared/enums/mode';
import { DeviceType, DeviceTypeArrayData } from '../../interface/interface';
import { Observable, EMPTY,timer, combineLatest, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { fromMatPaginator, paginateRows,fromMatSort, sortRows  } from './datasource-utils';
import { exampleShips } from './constant/constants'
import {ShipData} from '../../interface/interface';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-reclaim-unit-inquiry',
  templateUrl: './reclaim-unit-inquiry.component.html',
  styleUrls: ['./reclaim-unit-inquiry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReclaimUnitInquiryComponent implements OnInit {

  // For Mat-Table Accordion
  @ViewChild(MatSort, {static: true}) matAccordionSort: MatSort;
  @ViewChild(MatPaginator, {static: true}) matAccordionPaginator: MatPaginator;

  displayedRows$: Observable<ShipData[]>;
  totalRows$: Observable<number>;
  // End For Mat-Table Accordion
tabIndex: number = 0;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  totalData:number = 0;
  increment: number = 1;
  displayedColumns = [];
  columns: DynamicColumn[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  tableColumn: any;
  tableData = [];
  searchData: any = "";
  currentData: any;
  currentIndex: number = 0;
  /* RXJS practice */
  devicetype$: Observable<DeviceType>
  devicetypetabledata$: Observable<any>;
  devicetypeErrorHandler$: Observable<DeviceType> 
  devicetypeMockDataAndTableData$: Observable<DeviceTypeMockDataAndTableData> 
  devicetypeMockDataAndTableDataForkJoin$: Observable<any> 
  devicetypeArrayData$: Observable<DeviceTypeArrayData[]> = this.deviceTypeService.deviceTypePracticeMockData$;
  devicetypeArrayDataSubscribe: any;
  private deviceTypeSelected = new BehaviorSubject<string>("");
  deviceTypeSelectedAction$ = this.deviceTypeSelected.asObservable();
  
  deviceTypeMockDataBehaviorSubject$ = this.deviceTypeService.deviceTypeMockDataBehaviorSubject(this.devicetypeArrayData$, this.deviceTypeSelectedAction$);

  pageTitle: string = "";
  constructor(private unitInquiryService: UnitInquiryService,private deviceTypeService: DeviceTypeService,
     private industryService: IndustryService, private locationService:  LocationService
     , private userTypeService:  UserTypeService, private clientTypeService:  ClientTypeService, private progressService: ProgressService, private dialog:MatDialog) 
     {


      }

  ngOnInit() {
     this.loadUnitDeploymentInquiryData();
     this.initMatTableAccordion();
  }
 
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.searchData = filterValue;
  }
 
  loadData(data:any){
    this.tableData = [];
    this.increment = 1;
    if(this.currentIndex == 0){
        data.forEach(x => {
          if(this.increment <= 5){
            this.tableData.push(x);
            this.increment++;
          }
        });
    }
    if(this.currentIndex == 1){
        data.forEach(x => {
          if(this.increment >= 6 && this.increment <= 10){
            this.tableData.push(x);
          }
          this.increment++;
      });
    }
    this.totalData = data.length;
    this.progressService.unblockUi(); 
  }

  log(val) { console.log(val); }

  setPagination(event:any){
    this.tableData = [];
    this.increment = 1;
    if(event.pageIndex == 0){
     this.currentIndex = event.pageIndex;
      this.currentData.forEach(x => {
        if(this.increment <= 5){
          this.tableData.push(x);
          this.increment++;
        }
     });
    }
    if(event.pageIndex == 1){
      this.currentIndex = event.pageIndex;
        this.currentData.forEach(x => {
          if(this.increment >= 6 && this.increment <= 10){
            this.tableData.push(x);
          }
          this.increment++;
      });
    }
  }

  fetchUnitInquiryData(){
    this.progressService.blockUi();
    this.unitInquiryService.fetchUnitInquiryTableData().subscribe(unitDeploymentInquiryTableData => {
      this.tableColumn = unitDeploymentInquiryTableData;
     },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
    this.unitInquiryService.fetchUnitInquiryMockData().subscribe(unitDeploymentMockData => {
      this.pageTitle = PageTitle.UnitInquiry;
      this.currentData = unitDeploymentMockData.data;
      this.loadData(this.currentData);
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
  }

  fetchDeviceTypeData(){
    this.progressService.blockUi();
    this.deviceTypeService.fetchDeviceTypeTableData().subscribe(deviceTypeTableColumn => {
      this.tableColumn = deviceTypeTableColumn;
     },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    }); 
    this.deviceTypeService.fetchDeviceTypeMockData().subscribe(deviceTypeMockData => {
      this.currentData = deviceTypeMockData.data;
      this.pageTitle = PageTitle.DeviceType;
      this.loadData(this.currentData);   
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
    
    /* RXJS Practice */
   // this.devicetype$ =  this.deviceTypeService.deviceTypeMockData$;

//    this.devicetypetabledata$ =  this.deviceTypeService.deviceTypeTableData$

    //this.devicetypeArrayData$ =  this.deviceTypeService.deviceTypePracticeMockData$; // using MAP

      // To show the catch error, HTML or other files must use devicetypeErrorHandler$
    // this.devicetypeErrorHandler$ =  this.deviceTypeService.fetchDeviceTypeErrorHandlerExample().pipe(
    //  catchError(error => {
    //    this.log(error);
    //   return EMPTY;
    //  })  
    // );
   
    // this.devicetypeMockDataAndTableData$ = this.deviceTypeService.deviceTypeMockDataAndTableDataUsingCombineLatest$;
    // this.devicetypeMockDataAndTableDataForkJoin$ = this.deviceTypeService.deviceTypeMockDataAndTableDataUsingForkJoin$;
      
//  this.deviceTypeService.deviceTypeMockDataAndTableDataUsingCombineLatest$.subscribe(mockData => {
//       this.devicetypeArrayDataSubscribe = mockData
//     });

    // this.deviceTypeService.deviceTypePracticeMockData$.subscribe(
    //  mockData => {this.devicetypeArrayDataSubscribe = mockData},
    //  error =>   this.log(error),
    //  () => console.log("1 Complete: Next , Error , Complete")
    // );
      //  this.rxjsPractice();
    /* Using RXJS ShareReplay */
    // this.deviceTypeService.deviceTypePracticeMockData$.subscribe(
    //   mockData => {this.devicetypeArrayDataSubscribe = mockData},
    //   error =>   this.log(error),
    //   () => console.log("2 Complete: Next , Error , Complete")
    //  );
    //  this.deviceTypeService.deviceTypePracticeMockData$.subscribe(
    //   mockData => {this.devicetypeArrayDataSubscribe = mockData},
    //   error =>   this.log(error),
    //   () => console.log("3 Complete: Next , Error , Complete")
    //  );
  }

  showDeviceTypeErrorHandler(){
    this.progressService.blockUi();
    this.deviceTypeService.fetchDeviceTypeErrorHandlerExample().subscribe(deviceTypeTableColumn => {
     },
    err =>
     {
      this.progressService.unblockUi();
      this.progressService.error(err);
    }); 
  }

  fetchLocationData(){
    this.progressService.blockUi();
    this.locationService.fetchLocationTableData().subscribe(locationTableColumn => {
      this.tableColumn = locationTableColumn;
     },
    err =>
     {
      this.alertMessage(err);
    }); 
    this.locationService.fetchLocationMockData().subscribe(locationMockData => {
      this.currentData = locationMockData.data;
      this.pageTitle = PageTitle.Location;
      this.loadData(this.currentData);  
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
  }
  fetchIndustryData(){
    this.progressService.blockUi();
    this.industryService.fetchIndustryTableData().subscribe(industryTableColumn => {
      this.tableColumn = industryTableColumn;
     },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });  
    this.industryService.fetchIndustryMockData().subscribe(industryMockData => {
      this.currentData = industryMockData.data;
      this.pageTitle = PageTitle.Industry;
      this.loadData(this.currentData);  
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
  }
  fetchClientTypeData(){
    this.progressService.blockUi();
    this.clientTypeService.fetchClientTypeTableData().subscribe(clientTypeTableColumn => {
      this.tableColumn = clientTypeTableColumn;
     },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });   
    this.clientTypeService.fetchClientTypeMockData().subscribe(clientTypeMockData => {
      this.currentData = clientTypeMockData.data;
      this.pageTitle = PageTitle.ClientType;
      this.loadData(this.currentData); 
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
  }
  fetchUserTypeData(){
    this.progressService.blockUi();
    this.userTypeService.fetchUserTypeTableData().subscribe(userTypeTableColumn => {
      this.tableColumn = userTypeTableColumn;
     },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
    this.userTypeService.fetchUserTypeMockData().subscribe(userTypeMockData => {
      this.currentData = userTypeMockData.data;
      this.pageTitle = PageTitle.UserType;
      this.loadData(this.currentData);  
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
  }
  onRatingClicked(value: string): void {
    this.alertMessage(value);
  }
  loadUnitDeploymentInquiryData(){
    this.progressService.blockUi();
    this.unitInquiryService.fetchUnitInquiryTableData().subscribe(unitDeploymentInquiryTableData => {
      this.tableColumn = unitDeploymentInquiryTableData;
     },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
    this.unitInquiryService.fetchUnitInquiryMockData().subscribe(unitDeploymentMockData => {
      this.pageTitle = PageTitle.UnitInquiry;
      this.currentData = unitDeploymentMockData.data;
      this.loadData(this.currentData); 
    },
    err =>
     {
      this.progressService.unblockUi();
      this.alertMessage(err);
    });
  }
  openCreateDialog() {
    let dialogRef = this.dialog.open(DynamicModalComponent, {
      height: '450px',
      width: '800px',
      data: {"pageTitle":  this.pageTitle, "columnData":  this.tableColumn, "mode": Mode.Create }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.pageTitle == undefined)
        this.saveData(result);

    });
  }
  alertMessage(value: any){
   alert(value);
  }

  saveData(formValues: any){
      this.currentData.push(formValues)
      this.progressService.onSuccessCUD(this.pageTitle,Mode.Create)
      this.loadData(this.currentData)
  }
  onDeleteClicked(event: any){
    let cloneCurrentData = this.deepClone(this.currentData);
    this.currentData = [];
    for(let tableValue of cloneCurrentData){
      let tableValueConvertToJSON = JSON.stringify(tableValue);
      let data = JSON.stringify(event);
      if(tableValueConvertToJSON != data){
        this.currentData.push(tableValue)
       } 
    }
    this.loadData(this.currentData);
  }
  deepClone(src) {
    return JSON.parse(JSON.stringify(src));
  }
  rxjsPractice(){
    // Use this for filter purposes
    this.deviceTypeSelected.next("Printer");
  }
  initMatTableAccordion(){
    const sortEvents$: Observable<Sort> = fromMatSort(this.matAccordionSort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.matAccordionPaginator);

    const rows$ = of(exampleShips);

    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
  }


  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabIndex = tabChangeEvent.index;
  }
}

