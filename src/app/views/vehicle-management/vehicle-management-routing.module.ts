import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vehicle Management',
    },
    children: [
      {
        path: 'add-vehicle',
        component: AddVehicleComponent,
        data: {
          title: 'Add Vehicle',
        },
      },
     
    ],
  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleManagementRoutingModule { }
