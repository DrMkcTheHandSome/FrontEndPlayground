import { NgModule } from '@angular/core';
import { MatSortModule, MatTableModule, MatInputModule, MatPaginatorModule, MatCheckboxModule, MatIconModule, MatDialogModule, MatSlideToggleModule, MatDatepickerModule, MatSelectModule, MatGridListModule, MatListModule, MatFormFieldModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ReclaimUnitInquiryComponent } from './reclaim-unit-inquiry.component';
import {reclaimUnitInquiryRouting} from './reclaim-unit-inquiry.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { CustomDatePipe } from '../shared/custom-pipes/date-custom-pipes';
import { StarComponent } from '../shared/star/star.component';

@NgModule({
    declarations: [ReclaimUnitInquiryComponent, DynamicTableComponent, DynamicModalComponent,CustomDatePipe,StarComponent],
    exports: [DynamicModalComponent,CustomDatePipe],
		imports: [reclaimUnitInquiryRouting,
			MatFormFieldModule,
			MatGridListModule,	
        MatSortModule,
		MatTableModule,
		MatInputModule,
		MatPaginatorModule,
		CdkTableModule,
		MatCheckboxModule,
		MatIconModule,
		MatDialogModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		MatSelectModule,
		CommonModule,
		FormsModule,
		MatGridListModule,
		MatListModule,
		ReactiveFormsModule,
        HttpClientModule,
    	PartialsModule,
		CoreModule],
    entryComponents: [
		DynamicModalComponent
	],
  })
  export class ReclaimUnitInquiryModule {}