import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { CardModule } from '@coreui/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceHeaderComponent } from './invoice-header/invoice-header.component'; 
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ModalModule } from '@coreui/angular';
import { SpinnerModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
// import { PrimengModule } from '../primeng/primeng.module';



@NgModule({
  declarations: [
    GenerateInvoiceComponent,
    InvoiceListComponent,
    InvoiceHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    CardModule,
    InvoiceManagementRoutingModule,
    NgxPaginationModule,
    ModalModule,
    SpinnerModule,
    FormsModule,
    // PrimengModule

  ]
})
export class InvoiceManagementModule { }
