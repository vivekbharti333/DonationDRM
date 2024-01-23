import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  BadgeModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { AddDonationComponent } from './add-donation/add-donation.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationManagementRoutingModule } from './donation-management-routing.module';

@NgModule({
  declarations: [
    AddDonationComponent,
    DonationListComponent,
   
  ],
  imports: [
    CommonModule,
    CardModule,
    BadgeModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule, 
    DonationManagementRoutingModule,
    NgxPaginationModule,
    NgxDatatableModule
  ]
})
export class DonationManagementModule { }
