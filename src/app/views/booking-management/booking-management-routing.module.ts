import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking/add-booking.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Booking Management',
    },
    children: [
      {
        path: 'add-booking',
        component: AddBookingComponent,
        data: {
          title: 'Add Booking',
        },
      },
    ],

    
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule { }
