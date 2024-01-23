import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthenticationService} from '../../../views/services/authentication.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public loginUser: any;
  public base64Image: string;
  public loginName: any;
  public roleType: any;

  constructor(
    private classToggler: ClassToggleService,
    private authenticationService: AuthenticationService,
   
    ) {
    super();
  }

  ngOnInit() {
    this.getUserDetailsByLoginId();
  }
  

public getUserDetailsByLoginId() {
  this.authenticationService.getUserDetailsByLoginId()
    .subscribe({
      next: (response: any) => {
        if (response['responseCode'] == '200') {
          let resp  = JSON.parse(JSON.stringify(response['payload']));
          let userPic = resp['userPicture'];
          if(userPic == ""){
            this.base64Image  = 'data:image/png;base64,'+resp['userPicture'];
          }else{
            this.base64Image  = 'data:image/png;base64,'+resp['userPicture'];
          }
          
          this.loginName = resp['firstName']+" "+resp['lastName'];
          this.roleType = resp['roleType'];
          // this.getInvoiceHeaderList = this.invoiceHeaderList;
          // this.getAndSetInvoiceHeaderDetails();
         // this.toastr.success(response['status'], response['responseCode']+" "+ response['responseMessage']);
        } else {
          // this.toastr.error(response['responseMessage'], response['responseCode']);
        }
      },
      // error: (error: any) => this.toastr.error('Server Error', '500'),
    });
}



  logOut(){
    this.authenticationService.logOut();
    window.location.href = "/login";
    window.location.reload();
  }
}
