import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorManagementRoutingModule } from './vendor-management-routing.module';
import { AuthGuard } from '../gaurd/auth.guard';


@NgModule({
  declarations: [
    AddVendorComponent,
    VendorListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    VendorManagementRoutingModule,
    
  ]
})
export class VendorManagementModule { }
