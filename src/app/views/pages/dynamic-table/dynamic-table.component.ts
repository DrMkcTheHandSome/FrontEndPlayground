import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatInput, MatCheckbox, MatDialog} from '@angular/material';
import {UnitDeploymentInquiryMockData, UnitDeploymentInquiryTableData} from '../reclaim-unit-inquiry/mock-data';
import {DynamicColumn, UnitDeploymentInquiry} from '../../interface/interface';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import {CustomDatePipe} from '../shared/custom-pipes/date-custom-pipes';
import { Mode } from '../shared/enums/mode';
import swal, { SweetAlertResult } from 'sweetalert2'
import { ProgressService } from '../services/progress-service';

@Component({
  selector: 'kt-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit {
  displayedColumns = [];
  columns: DynamicColumn[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnTypes: any;
  tableValues: any;
  pageTitle: string;
  @Output() deleteClicked: EventEmitter<string> =
  new EventEmitter<string>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input("tableColumn") set tableColumn(val: any){
    if(val != undefined){
      this.setupDynamicTable(val);
      this.columnTypes = val;
    }
  };

  @Input("pageName") set pageName(val: any){
    if(val != undefined){
      this.pageTitle = val;
    }
  };

  @Input("tableData") set tableData(val: any){
    if(val != undefined){
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
      data: {"rowData": row, "columnData":  this.columnTypes, "mode": Mode.Update}
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
}
