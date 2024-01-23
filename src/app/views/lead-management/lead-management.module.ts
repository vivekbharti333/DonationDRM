import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, SpinnerModule } from '@coreui/angular';
import { RegFreshLeadComponent } from './../lead-management/reg-fresh-lead/reg-fresh-lead.component';
import { FreshLeadListComponent } from './fresh-lead-list/fresh-lead-list.component';
import { LeadManagementRoutingModule } from './lead-management-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    RegFreshLeadComponent,
    FreshLeadListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    CardModule,
    SpinnerModule,
    LeadManagementRoutingModule,
    NgxPaginationModule
  ]
})
export class LeadManagementModule { }
