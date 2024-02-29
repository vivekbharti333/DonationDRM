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


  addProgramDetails(programDetails: ApplicationDetails): Observable<ApplicationRequest> {
    this.loginUser = this.authenticationService.getLoginUser();
    let request: ApplicationRequest = {
      payload: {
       
        programName: programDetails.programName,
        programAmount: programDetails.programAmount,
        token: this.loginUser['token'],
        createdBy: this.loginUser['userId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "addDonationType", request);
  }

  getProgramDetailsList(): Observable<any> {
    let request: ApplicationRequest = {
      payload: {
        requestedFor: "ALL",
        roleType: this.loginUser['roleType'],
        createdBy: this.loginUser['userId'],
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "getDonationTypeListBySuperadminId", request);
  }

  changeProgramStatus(programDetails: any): Observable<any> {
    

    let request: any = {
      payload: {
        
        id: programDetails['id'],
        // status: programDetails['status'],
        
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"changeDonationTypeStatus",request);
  }

  
  updateProgramDetails(programDetails: ApplicationDetails): Observable<ApplicationRequest> {
    console.log(programDetails.id+" iddd")
    this.loginUser = this.authenticationService.getLoginUser();
    let request: ApplicationRequest = {
      payload: {
        id: programDetails.id,
        programName: programDetails.programName,
        programAmount: programDetails.programAmount,
        token: this.loginUser['token'],
        createdBy: this.loginUser['userId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<ApplicationRequest>(Constant.Site_Url + "updateDonationType", request);
  }


}
