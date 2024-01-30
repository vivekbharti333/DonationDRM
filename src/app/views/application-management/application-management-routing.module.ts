import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantionDetailsComponent } from './applicantion-details/applicantion-details.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';


const routes: Routes = [
  {
    path: 'app-details',
    component: ApplicantionDetailsComponent,
    data: {
      title: 'App Details',
    },
  },
  {
    path: 'program-details',
    component: ProgramDetailsComponent,
    data: {
      title: 'Program Details',
    },
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class ApplicationManagementRoutingModule { }
