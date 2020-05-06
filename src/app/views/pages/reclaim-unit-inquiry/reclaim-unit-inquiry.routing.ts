import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReclaimUnitInquiryComponent } from './reclaim-unit-inquiry.component';

const reclaimUnitInquryRoutes: Routes = [
    {
        path: '', component: ReclaimUnitInquiryComponent
    }
];

export const reclaimUnitInquiryRouting: ModuleWithProviders = RouterModule.forChild(reclaimUnitInquryRoutes);