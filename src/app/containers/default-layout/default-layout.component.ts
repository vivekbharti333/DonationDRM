import { Component, Input } from '@angular/core';
import { navItems,  } from './_nav';
import { navDonationSuperadmin } from './_navDoantionSuperadmin';
import { navDonationManager } from './_navDonationManager';
import { navDonationExecutive } from './_navCustomerExecutive';
import { Constant } from '../../views/services/constants';
import { AuthenticationService} from '../../views/services/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public element: HTMLElement = document.body;
  public navItems = navItems;
  // public navItems: any;
  public navItemsDonation = navItems;

  public loginUser: any;

  public roleAndService : boolean = false;

  public base64DisplayLogo: string = '';
  public displayName: string = '';
  public website: string = '';

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  ngOnInit() {
    this.assignMenuByRoleType()
    this.getApplicationDetailsBySuperadminId();
    //this.navItems = navItemsOne;
    
  }

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  
  assignMenuByRoleType(){
    console.log("user role : "+this.loginUser['roleType']+" ,  services : "+this.loginUser['service']);

    if(this.loginUser['service'] == Constant.donation){
      if(this.loginUser['roleType'] == Constant.mainAdmin){
        this.navItems = navItems;
      }else if(this.loginUser['roleType'] == Constant.superAdmin){
        this.navItems = navDonationSuperadmin;
      }else if(this.loginUser['roleType'] == Constant.admin){
        this.navItems = navDonationSuperadmin;
      }else if(this.loginUser['roleType'] == Constant.teamLeader){
        this.navItems = navDonationManager;
      }else if(this.loginUser['roleType'] == Constant.fundraisingOfficer){
        this.navItems = navDonationExecutive;
      }
    }

  }


  checkRoleAndService(){
    this.roleAndService = true;
  }


  public getApplicationDetailsBySuperadminId() {
    this.authenticationService.getApplicationDetailsBySuperadminId()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            let resp  = JSON.parse(JSON.stringify(response['payload']));
            // console.log("Images :"+resp['displayLogo'])
            let userPic = resp['displayLogo'];
            if(userPic == ""){
              this.base64DisplayLogo  = 'data:image/png;base64,'+resp['displayLogo'];
              this.displayName = resp['displayName'];
              this.website = resp['website'];
            }else{
              this.base64DisplayLogo  = 'data:image/png;base64,'+resp['displayLogo'];
              this.displayName = resp['displayName'];
              this.website = resp['website'];
              console.log("this.displayName : "+this.displayName)
            }
          } else {
            // Handle error or display a message if needed
          }
        },
        error: (error: any) => {
          // Handle error or display a message if needed
        },
      });
  }
  
}