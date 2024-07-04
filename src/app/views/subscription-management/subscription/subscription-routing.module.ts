import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
const routes: Routes = [
  {
    path: 'subscription',
    component: SubscriptionComponent,
    data: {
      title: 'subscription',
    },
  },
]

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SubscriptionRoutingModule { }
