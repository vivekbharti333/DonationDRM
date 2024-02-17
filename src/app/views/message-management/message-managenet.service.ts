import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Constant } from '../services/constants';
import { LeadDetails, LeadDetailsRequest } from '../interface/lead-management';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { EmailRequest, EmailDetails } from '../interface/email-management';


@Injectable({
  providedIn: 'root'
})
export class MessageManagenetService {

  public superadminId: any;
    public loginUser: any;

    constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  addUpdateEmailServiceDetails(emailDetails: EmailDetails): Observable<EmailRequest> {
    this.loginUser = this.authenticationService.getLoginUser();
    let request: EmailRequest = {
      payload: {
        emailType: emailDetails.emailType,
        host: emailDetails.host,
        port: emailDetails.port,
        emailUserid: emailDetails.emailUserid,
        emailPassword: emailDetails.emailPassword,
        emailFrom: emailDetails.emailFrom,
        subject: emailDetails.subject,
        emailBody: emailDetails.emailBody,
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<EmailRequest>(Constant.Site_Url + "addUpdateEmailServiceDetails", request);
  }

  getEmailServiceDetailsList(): Observable<any> {
    let request: EmailRequest = {
      payload: {
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<EmailRequest>(Constant.Site_Url + "getEmailServiceDetailsList", request);
  }

  
}
