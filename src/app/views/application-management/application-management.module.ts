import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';


import {NgxPaginationModule} from 'ngx-pagination';
// import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
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
  ModalModule,
  SpinnerModule,
} from '@coreui/angular';


@NgModule({
  declarations: [
   
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AvatarModule,
    IconModule,
    CardModule,
    BadgeModule,
    ModalModule,
    SpinnerModule,
 
    NgxPaginationModule,
    FormsModule
  ]
})
export class ApplicationManagementModule { }
