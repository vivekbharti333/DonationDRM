import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { ThankuComponent } from './views/pages/thanku/thanku.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './views/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [AuthGuard],
          
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./views/user-management/user-management.module').then((m) => m.UserManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'lead',
        loadChildren: () =>
          import('./views/lead-management/lead-management.module').then((m) => m.LeadManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'application',
        loadChildren: () =>
          import('./views/application-management/application-management.module').then((m) => m.ApplicationManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'donation',
        loadChildren: () =>
          import('./views/donation-management/donation-management.module').then((m) => m.DonationManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./views/invoice-management/invoice-management.module').then((m) => m.InvoiceManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./views/customer-management/customer-management.module').then((m) => m.CustomerManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'vendor',
        loadChildren: () =>
          import('./views/vendor-management/vendor-management.module').then((m) => m.VendorManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./views/booking-management/booking-management.module').then((m) => m.BookingManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'vehicle',
        loadChildren: () =>
          import('./views/vehicle-management/vehicle-management.module').then((m) => m.VehicleManagementModule), canActivate: [AuthGuard],
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '505',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'receipt/:receiptNo',
    component: ThankuComponent,
    data: {
      title: 'Thankyou'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
