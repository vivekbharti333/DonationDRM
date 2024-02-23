import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Constant } from '../services/constants';
import { LeadDetails, LeadDetailsRequest } from '../interface/lead-management';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { ApplicationDetails, ApplicationRequest } from '../interface/application-management';


@Injectable({
  providedIn: 'root'
})
export class ApplicationManagementService {

    public superadminId: any;
    public loginUser: any;
  
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }


  saveApplicationDetails(applicationDetails: ApplicationDetails): Observable<ApplicationRequest> {
    this.loginUser = this.authenticationService.getLoginUser();
    let request: ApplicationRequest = {
      payload: {
       
        ipAddress: applicationDetails.ipAddress,
        loginPageLogo: applicationDetails.loginPageLogo,
        loginPageWallpaper: applicationDetails.loginPageWallpaper,
        displayLogo: applicationDetails.displayLogo,
        displayName: applicationDetails.displayName,
        emailId: applicationDetails.emailId,
        website: applicationDetails.website,
        phoneNumber: applicationDetails.phoneNumber,
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "addUpdateApplicationHeader", request);
  }

  getApplicationDetailsList(): Observable<any> {
    let request: ApplicationRequest = {
      payload: {
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "getApplicationHeaderDetails", request);
  }

  
  getApplicationDetailsByIpAddress(): Observable<any> {
    let request: ApplicationRequest = {
      payload: {
        // token: this.loginUser['token'],
        // superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "getApplicationDetailsByIpAddress", request);
  }


  getProgramDetailsList(): Observable<any> {
    let request: ApplicationRequest = {
      payload: {
        roleType: this.loginUser['roleType'],
        createdBy: this.loginUser['userId'],
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "getDonationTypeListBySuperadminId", request);
  }
  


}
