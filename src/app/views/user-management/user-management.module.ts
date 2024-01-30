import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';


import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
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
    AddUserComponent,
    UserListComponent,
    ChangeUserComponent,
    
  ],
  imports: [
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
    IconModule,
    CardModule,
    DropdownModule,
    BadgeModule,
    ModalModule,
    SpinnerModule,
    UserManagementRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class UserManagementModule { }
