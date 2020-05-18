import { NgModule } from '@angular/core';
import { DynamicModalComponent } from '../../dynamic-modal/dynamic-modal.component';
import { CustomDatePipe } from '../custom-pipes/date-custom-pipes';
import { MatFormFieldModule, MatGridListModule, MatSortModule, MatTableModule, MatInputModule, MatPaginatorModule, MatCheckboxModule, MatIconModule, MatDialogModule, MatSlideToggleModule, MatDatepickerModule, MatSelectModule, MatListModule, MatExpansionModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../../core/core.module';
import { PartialsModule } from '../../../partials/partials.module';
import { StarComponent } from '../star/star.component';
import { ReclaimUnitTaskComponent } from '../../reclaim-unit-task/reclaim-unit-task.component';

@NgModule({
    imports: [
      FormsModule,
      MatSortModule,
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatSlideToggleModule,
      CdkTableModule,
      NgbAccordionModule,
      MatDatepickerModule,
      MatSelectModule,
      MatSortModule,
      MatExpansionModule,
      ReactiveFormsModule,
      HttpClientModule,
      CoreModule,
      PartialsModule,
    ],
    declarations: [DynamicTableComponent,StarComponent,CustomDatePipe,DynamicModalComponent,ReclaimUnitTaskComponent],
	exports: [
    DynamicTableComponent,
    StarComponent,
    DynamicModalComponent,
    CustomDatePipe,
    ReclaimUnitTaskComponent
    ]
  })
  export class SharedModules {}