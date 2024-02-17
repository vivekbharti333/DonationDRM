import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MessageManagementRoutingModule } from './message-management-routing.module';
import { EmailComponent } from '../message-management/email/email.component';
import { SmsComponent } from '../message-management/sms/sms.component';
import { WhatsAppComponent } from '../message-management/whats-app/whats-app.component';
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
    EmailComponent,
    SmsComponent,
    WhatsAppComponent,
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
    NgxPaginationModule,
    FormsModule,
    MessageManagementRoutingModule,
  ]
})
export class MessageManagementModule { }
