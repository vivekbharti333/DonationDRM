import { INavData } from '@coreui/angular';
import { AuthenticationService } from '../../views/services/authentication.service';


let navDonationSuperadmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  // {
  //   name: 'App Management',
  //   url: '/application',
  //   iconComponent: { name: 'cil-user' }, 
  //   children: [
  //     {
  //       name: 'Application Details',
  //       url: '/application/app-details',
  //       iconComponent: { name: 'cil-user' },
  //       permission: 'app-details'
  //     },
  //     {
  //       name: 'Program Details',
  //       url: '/application/program-details',
  //       iconComponent: { name: 'cil-user' },
  //       permission: 'program-details'
  //     },
  //   ],
  // },
  {
    name: 'User Management',
    url: '/user',
    iconComponent: { name: 'cil-user' }, 
    children: [
      {
        name: 'Add User',
        url: '/user/adduser',
        iconComponent: { name: 'cil-user' },
        permission: 'create-user'
      },
      {
        name: 'User List',
        url: '/user/userlist',
        iconComponent: { name: 'cilList' },
        permission: 'view-user-list'
      },
      {
        name: 'Change User',
        url: '/user/changeUser',
        iconComponent: { name: 'cilLockLocked' },
        permission: 'change-user'
      },
    ],
  },
  {
    name: 'Donation Management',
    url: '/lead',
    iconComponent: { name: 'cilCommentSquare' },
    children: [
      {
        name: 'Add Receipt',
        url: '/donation/add-donation',
        iconComponent: { name: 'cilEnvelopeOpen' },
        permission: ''
      },
      {
        name: 'Receipt List',
        url: '/donation/donationlist',
        iconComponent: { name: 'cilList' },
        permission: ''
      },
    ]
  },
];

export { navDonationSuperadmin };