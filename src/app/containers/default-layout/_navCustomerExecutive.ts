import { INavData } from '@coreui/angular';
import { AuthenticationService } from '../../views/services/authentication.service';


let navDonationExecutive: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
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



export { navDonationExecutive };