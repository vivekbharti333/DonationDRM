import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { SubscriptionComponent } from './subscription.component';

import { SubscriptionRoutingModule } from './subscription-routing.module';
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
    SubscriptionComponent,
    ,
    
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
    SubscriptionRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class SubscriptionModule { }
