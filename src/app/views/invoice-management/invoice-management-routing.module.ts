import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { InvoiceHeaderComponent } from './invoice-header/invoice-header.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';


const routes: Routes = [
  {
    path: 'generate-invoice',
    component: GenerateInvoiceComponent,
    data: {
      title: 'New Invoice',
    },
  },
  {
    path: 'invoice-header',
    component: InvoiceHeaderComponent,
    data: {
      title: 'Invoice Header',
    },
  },
  {
    path: 'invoice-list',
    component: InvoiceListComponent,
    data: {
      title: 'Invoice List',
    },
  },
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceManagementRoutingModule { }
