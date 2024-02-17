import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from '../message-management/email/email.component';
import { SmsComponent } from '../message-management/sms/sms.component';
import { WhatsAppComponent } from '../message-management/whats-app/whats-app.component';


const routes: Routes = [
  {
    path: 'email',
    component: EmailComponent,
    data: {
      title: 'Email',
    },
  },
  {
    path: 'sms',
    component: SmsComponent,
    data: {
      title: 'sms',
    },
  },
  {
    path: 'whats-app',
    component: WhatsAppComponent,
    data: {
      title: 'Whats App',
    },
  },
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageManagementRoutingModule { }
