import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatInput, MatCheckbox, MatDialog, Sort, PageEvent} from '@angular/material';
import {UnitDeploymentInquiryMockData, UnitDeploymentInquiryTableData} from '../reclaim-unit-inquiry/mock-data';
import {DynamicColumn, UnitDeploymentInquiry} from '../../interface/interface';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import {CustomDatePipe} from '../shared/custom-pipes/date-custom-pipes';
import { Mode } from '../shared/enums/mode';
import swal, { SweetAlertResult } from 'sweetalert2'
import { ProgressService } from '../services/progress-service';
import { fromMatPaginator, paginateRows,fromMatSort, sortRows  } from '../reclaim-unit-inquiry/datasource-utils';
import { Observable, of } from 'rxjs';
import { defaultValues  } from '../shared/enums/default';

@Component({
  selector: 'kt-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit {
  /* Tempest Taks */
  isTempestTask:any;
  mockDataObject:any;
  getTableDataObject:any;
  @Input("tableDataObject") set tableDataObject(val: any){
    if(val != undefined){
      this.getTableDataObject = val;
      this.setupTempestTaskDynamicTable(val);
    }
  };
  @Input("tempestTask") set tempestTask(val: any){
    if(val != undefined){
      this.isTempestTask = val;
    }
  };
  @Input("mockData") set mockData(val: any){
    if(val != undefined){
      this.mockDataObject = val;
    }
  };

  // Tempest Taks End
  displayedColumnsForAccordion = ["Serial Number", "Asset Tag"];
  dataSourceForAccordion = new MatTableDataSource();
  defaultImage: string = defaultValues.DefaultImage;
  displayedColumns = [];
  columns: DynamicColumn[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnTypes: any;
  tableValues: any;
  deepCloneTableValues: any;
  sortedData: any;
  tableType: string = "";
  pageTitle: string;
  @Output() deleteClicked: EventEmitter<string> =
  new EventEmitter<string>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input("tableColumn") set tableColumn(val: any){
    if(val != undefined){
      this.setupDynamicTable(val);
      this.columnTypes = val;
      this.tableType = this.columnTypes.tableType 
    }
  };


  @Input("pageName") set pageName(val: any){
    if(val != undefined){
      this.pageTitle = val;
    }
  };

  @Input("tableData") set tableData(val: any){
    if(val.length != 0){
        this.tableValues = val;
        this.loadData(val);
    }
  };

  @Input("searchData") set searchData(val: any) {
    if(val != undefined){
      this.searchTableData(val);
    }
  };
  
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private dialog:MatDialog,private progressService: ProgressService) { }

  ngOnInit() {
  }

  setupTempestTaskDynamicTable(result) {
    this.displayedColumns = [];
    this.columns = [];
    result.types.forEach(w => {
      var dynamicColumn = {} as DynamicColumn;
      dynamicColumn.name = w.name;
      dynamicColumn.columnHeaderName = w.label;
      dynamicColumn.type = w.type;
     dynamicColumn.cell = (element: any) => `${element[w.name]}`;
      this.columns.push(dynamicColumn);
      this.displayedColumns.push(w.label);  
    });
  } 
  setupDynamicTable(result) {
    this.displayedColumns = [];
    this.columns = [];
    result.types.forEach(w => {
      var dynamicColumn = {} as DynamicColumn;
      dynamicColumn.name = w.name;
      dynamicColumn.columnHeaderName = w.label;
      dynamicColumn.type = w.type;
     dynamicColumn.cell = (element: any) => `${element[w.name]}`;
      this.columns.push(dynamicColumn);
      this.displayedColumns.push(w.label);  
    });
    this.displayedColumns.push('actions');
  } 
  loadData(tableValues:any){
    this.dataSource = new MatTableDataSource(tableValues);
  }
  searchTableData(filterValue: string){
    this.dataSource.filter = filterValue;
  }
  openUpdateDialog(row: any) {
    let dialogRef = this.dialog.open(DynamicModalComponent, {
      height: '450px',
      width: '800px',
      data: {"rowData": row, "columnData":  this.columnTypes, "mode": Mode.Update,"pageTitle": this.pageTitle}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.mode == undefined)
         this.updateData(result)
    });
  }
  openDeleteDialog(row:any){
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel it'
    }).then((result) => {
      if (result.value) {
       this.progressService.blockUi();
       this.deleteClicked.emit(row);
        swal.fire(
          'Deleted!',
          'the data has been deleted.',
          'success'
        )
      // https://sweetalert2.github.io/#handling-dismissals
      }
    })
  }
  rowValues(value: any){
    if(value != "undefined"){
      return value;
    }else{
      return "";
    }
  }
  onRatingClicked(value: string): void {
    this.ratingClicked.emit(value);
  }
  updateData(data: any){
    let previousValue = JSON.stringify(data["previousValues"]);
    let newValue =  data["newValues"];
    for(let tableValue of this.tableValues){
      let tableValueConvertToJSON = JSON.stringify(tableValue);
      if(tableValueConvertToJSON === previousValue){
      let keyNewValueArray = Object.keys(newValue)
      keyNewValueArray.forEach(item => {
       tableValue[item] = newValue[item]
      })
        break;
       } 
    }
    swal.fire({
      title: '',
      text: `${this.pageTitle} has been ${Mode.Update}d`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        this.progressService.blockUi();
        this.loadData(this.tableValues);
        this.progressService.unblockUi(9000);
      // https://sweetalert2.github.io/#handling-dismissals
      } 
    })
  }

  deepClone(src) {
    return JSON.parse(JSON.stringify(src));
  }
 
  sortData(sort: Sort, tableValue: any) {
    this.sortedData = tableValue.slice();
    const data = tableValue.slice();
    if (!sort.active || sort.direction == "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == "asc";
      switch (sort.active) {
        case "Serial Number": return this.compare(+a.serialnumber,+b.serialnumber, isAsc);
        case "Asset Tag": return this.compare(a.assettag,b.assettag, isAsc);
        default: return 0;
      }
    });

    let currentValue = JSON.stringify(tableValue);
   
    if(!this.isTempestTask){
      this.tableValues.forEach(data => {
        let previousValue = JSON.stringify(data.table);
        if(currentValue == previousValue){
         data.table = this.sortedData;
        }
     });
    }else{
      this.mockDataObject.data.forEach(data => {
        let previousValue = JSON.stringify(data.table);
        if(currentValue == previousValue){
         data.table = this.sortedData;
        }
     });
    }

  }
  
compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 
}
