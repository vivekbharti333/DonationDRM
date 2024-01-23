import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { BookingManagementRoutingModule } from './booking-management-routing.module';


@NgModule({
  declarations: [
    AddBookingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    BookingManagementRoutingModule,
  ]
})
export class BookingManagementModule { }
