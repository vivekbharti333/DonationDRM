import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Constant } from '../services/constants';
import { DonationDetailsRequest } from '../interface/donation-management';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetsServicesService {
  public loginId: any;
  public superadminId: any;
  public loginUser: any;
 
  constructor(
   private http: HttpClient,
   private authenticationService: AuthenticationService,
 ) {
   this.loginUser = this.authenticationService.getLoginUser();
 }

 getCountAndSum(): Observable<any> {
  this.loginId = localStorage.getItem('loginId');
  this.superadminId = localStorage.getItem('superadminId');

  let request: any = {
    payload: {
     
      roleType: this.loginUser['roleType'],
      token: this.loginUser['token'],
      createdBy: this.loginUser['loginId'],
      superadminId: this.loginUser['superadminId'],
    }
  };
  return  this.http.post<any>(Constant.Site_Url+"getCountAndSum",request);
}

getStarFundrisingOfficerOfTheMonth(){

  let request: any = {
    payload: {
      requestedFor: "ALL",
      // token: this.loginUser['token'],
      // createdBy: this.loginUser['loginId'],
      superadminId: this.loginUser['superadminId'],
    }
  };
  return this.http.post<any>(Constant.Site_Url+"getStartPerformer",request);
}


getStarTeamOfTheMonth(){
  let request: any = {
    payload: {
      requestedFor: "ALL",
      // token: this.loginUser['token'],
      teamLeaderId: this.loginUser['teamLeaderId'],
      superadminId: this.loginUser['superadminId'],
    }
  };
  return this.http.post<any>(Constant.Site_Url+"getStartPerformer",request);
}

getDonationCountAndAmountGroupByName(tabName:string){

  let request: any = {
    payload: {
      requestedFor: tabName,
      roleType: this.loginUser['roleType'],
      token: this.loginUser['token'],
      createdBy: this.loginUser['loginId'],
      superadminId: this.loginUser['superadminId'],
    }
  };
  return  this.http.post<any>(Constant.Site_Url+"getDonationCountAndAmountGroupByName",request);
}

getDonationPaymentModeCountAndAmountGroupByName(tabName:string){
  // this.loginId = localStorage.getItem('loginId');
  // this.superadminId = localStorage.getItem('superadminId');

  let request: any = {
    payload: {
      requestedFor: tabName,
      roleType: this.loginUser['roleType'],
      token: this.loginUser['token'],
      createdBy: this.loginUser['loginId'],
      superadminId: this.loginUser['superadminId'],
    }
  };
  return  this.http.post<any>(Constant.Site_Url+"getDonationPaymentModeCountAndAmountGroupByName",request);
}

}
