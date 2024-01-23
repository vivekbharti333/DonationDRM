import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegFreshLeadComponent } from '../lead-management/reg-fresh-lead/reg-fresh-lead.component';
import { FreshLeadListComponent } from './fresh-lead-list/fresh-lead-list.component';

const routes: Routes = [
  {
    path: 'reg-fresh-lead',
    component: RegFreshLeadComponent,
    data: {
      title: 'Reg Fresh Lead',
    },
  },
  {
    path: 'fresh-lead-list',
    component: FreshLeadListComponent,
    data: {
      title: 'Fresh Lead List',
    },
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadManagementRoutingModule { }
