import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ReclaimUnitTaskService } from '../services/reclaim-unit-task-service';

@Component({
  selector: 'kt-reclaim-unit-task',
  templateUrl: './reclaim-unit-task.component.html',
  styleUrls: ['./reclaim-unit-task.component.scss']
})
export class ReclaimUnitTaskComponent implements OnInit {
  isTempestTask: boolean = true;
  tableDataObject: any;
  mockData: any;

  constructor(public dialogRef: MatDialogRef<ReclaimUnitTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private reclaimUnitTaskService: ReclaimUnitTaskService)
     { }

  ngOnInit() {
  }

  onCloseClick(): void {  
    this.dialogRef.close(this.data);
    }
    fetchData(){
      this.reclaimUnitTaskService.fetchReclaimUnitTaskNoMockData().subscribe(data => {
        this.mockData = data;
       },
      err =>
       {
        console.log(err);
      });
      this.reclaimUnitTaskService.fetchReclaimUnitTaskTableData().subscribe(data => {
       this.tableDataObject = data;
      },
      err =>
       {
        console.log(err);

      });
    }

}
