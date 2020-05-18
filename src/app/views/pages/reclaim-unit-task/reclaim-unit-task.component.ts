import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'kt-reclaim-unit-task',
  templateUrl: './reclaim-unit-task.component.html',
  styleUrls: ['./reclaim-unit-task.component.scss']
})
export class ReclaimUnitTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReclaimUnitTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder)
     { }

  ngOnInit() {
  }

  onCloseClick(): void {  
    this.dialogRef.close(this.data);
    }
}
