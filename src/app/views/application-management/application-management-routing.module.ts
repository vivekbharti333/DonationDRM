import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicantionDetailsComponent } from './applicantion-details/applicantion-details.component';

const routes: Routes = [
  {
    path: 'application',
    component: ApplicantionDetailsComponent,
    data: {
      title: 'Application Details',
    },
  },
  {
    path: 'donationlist',
    component: ApplicantionDetailsComponent,
    data: {
      title: 'Donation List',
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class ApplicationManagementRoutingModule { }
