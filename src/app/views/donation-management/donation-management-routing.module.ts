import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDonationComponent } from './add-donation/add-donation.component';
import { DonationListComponent } from './donation-list/donation-list.component';

const routes: Routes = [
  {
    path: 'applicationDetails',
    component: AddDonationComponent,
    data: {
      title: 'Add Donation',
    },
  },
  {
    path: 'donationlist',
    component: DonationListComponent,
    data: {
      title: 'Donation List',
    },
  },

];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class DonationManagementRoutingModule { }
