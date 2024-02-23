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
  SharedModule,
  HeaderModule,
  FooterModule,
  AvatarModule,
  BreadcrumbModule,
  NavModule,
  ProgressModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  ModalModule,
  SpinnerModule,


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
    HeaderModule,
    FooterModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule, 
    ApplicationManagementRoutingModule,
    NgxPaginationModule,
    NgxDatatableModule,
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ButtonGroupModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule,
    ButtonModule,
    AvatarModule,
    CardModule,
    DropdownModule,
    BadgeModule,
    ModalModule,
    SpinnerModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ApplicationManagementModule { }
