import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChangeUserComponent } from './change-user/change-user.component';


const routes: Routes = [
  {
    path: 'adduser',
    component: AddUserComponent,
    data: {
      title: 'Add user',
    },
  },
  {
    path: 'userlist',
    component: UserListComponent,
    data: {
      title: 'user list',
    },
  },
  {
    path: 'changeUser',
    component: ChangeUserComponent,
    data: {
      title: 'change user',
    },
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
