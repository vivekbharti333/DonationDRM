import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { VehicleManagementRoutingModule } from './vehicle-management-routing.module';


@NgModule({
  declarations: [
    AddVehicleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    VehicleManagementRoutingModule,
  ]
})
export class VehicleManagementModule { }
