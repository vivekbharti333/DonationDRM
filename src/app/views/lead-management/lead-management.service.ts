import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../services/constants';
import { LeadDetails, LeadDetailsRequest } from '../interface/lead-management';

@Injectable({
  providedIn: 'root'
})
export class LeadManagementService {

  public loginId: any;
  public superadminId: any;

  constructor(
    private http: HttpClient,
  ) { }


  saveFreshLeadDetails(leadDetails: LeadDetails): Observable<LeadDetailsRequest> {
    this.loginId = localStorage.getItem('loginId');
    this.superadminId = localStorage.getItem('superadminId');

    let request: LeadDetailsRequest = {
      payload: {
        enquiryFor: leadDetails.enquiryFor,
        enquirySource: leadDetails.enquirySource,
        businessType: leadDetails.businessType,
        customerFirstName: leadDetails.customerFirstName,
        customerLastName: leadDetails.customerLastName,
        customerMobile: leadDetails.customerMobile,
        customerAlternateMobile: leadDetails.customerAlternateMobile,
        customerEmailId: leadDetails.customerAlternateMobile,
        customerCity: leadDetails.customerCity,
        status: leadDetails.status,
        notes: leadDetails.notes,
        createdBy: this.loginId,
        superadminId: this.superadminId
      }
    };
    return this.http.post<LeadDetailsRequest>(Constant.Site_Url + "regFreshLead", request);
  }

  getFreshLeadDetails(): Observable<LeadDetailsRequest> {
    this.loginId = localStorage.getItem('loginId');
    this.superadminId = localStorage.getItem('superadminId');

    let request: LeadDetailsRequest = {
      payload: {
        createdBy: this.loginId,
        superadminId: this.superadminId
      }
    };
    return this.http.post<LeadDetailsRequest>(Constant.Site_Url + "getLeadDetails", request);
  }
}