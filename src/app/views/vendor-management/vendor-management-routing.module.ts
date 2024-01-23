import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { AuthGuard } from '../gaurd/auth.guard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vendor Management',
    },
    children: [
      {
        path: 'add-vendor',
        component: AddVendorComponent,
        data: {
          title: 'Add Vendor',
        },
      },
      {
        path: 'vendor-list',
        component: VendorListComponent,
        data: {
          title: 'Vendor List',
        },
      },
    ],
  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorManagementRoutingModule { }
