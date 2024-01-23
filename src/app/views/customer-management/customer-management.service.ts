import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Constant } from '../services/constants';
//import { UserDetails, UserDetailsRequest } from '../interface/user-management';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  public loginId: any;
  public superadminId: any;
  public loginUser: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  saveCustomerDetails(customerDetails : any) : Observable<any> {
    this.loginId = localStorage.getItem('loginId');
    this.superadminId = localStorage.getItem('superadminId');

    let request: any = {
      payload: {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        roleType: customerDetails.roleType,
        mobileNo: customerDetails.mobileNo,
        alternateMobile: customerDetails.alternateMobile,
        emailId: customerDetails.emailId,
        companyName: customerDetails.companyName,
        gstNumber: customerDetails.gstNumber,
        addressList: customerDetails.addressList,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"customerRegistration",request);

  }

  getCustomerDetails(): Observable<any> {
    let request: any = {
      payload: {
        requestedFor: "DROPDOWN",
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<any>(Constant.Site_Url + "getCustomerList", request);
  }

}
