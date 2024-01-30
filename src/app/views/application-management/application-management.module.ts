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

import { ApplicationManagementRoutingModule } from './application-management-routing.module';
import { ApplicantionDetailsComponent } from './applicantion-details/applicantion-details.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';

@NgModule({
  declarations: [
    ApplicantionDetailsComponent,
    ProgramDetailsComponent,
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
    ApplicationManagementRoutingModule,
    NgxPaginationModule,
    NgxDatatableModule
  ]
})
export class ApplicationManagementModule { }
