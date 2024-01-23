import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


const routes: Routes = [
  {
    path: 'addCustomer',
    component: AddCustomerComponent,
    data: {
      title: 'Add Customer',
    },
  },
  {
    path: 'customerlist',
    component: CustomerListComponent,
    data: {
      title: 'Customer List',
    },
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
