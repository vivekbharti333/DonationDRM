import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Constant } from '../services/constants';
import { LeadDetails, LeadDetailsRequest } from '../interface/lead-management';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { DonationDetailsRequest, DonationDetails } from '../interface/donation-management';


@Injectable({
  providedIn: 'root'
})
export class DonationManagementService {


  // public loginId: any;
  public superadminId: any;
  public loginUser: any;


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  getInvoiceTypeList(): Observable<any> {
    let request: DonationDetailsRequest = {
      payload: {
        requestFor: 'DROPDOWN',
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getInvoiceHeaderTypeList", request);
  }

  getDonationTypeList(): Observable<any> {
    let request: DonationDetailsRequest = {
      payload: {
        requestedFor: "OPTION",
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getDonationTypeListBySuperadminId", request);
  }

  getFundrisingOfficerByTeamLeaderId(): Observable<any> {
    let request: DonationDetailsRequest = {
      payload: {
        requestedFor: "OPTION",
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        loginId: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getFundRisingOfficersBySuperadminId", request);
  }
  

  saveDonationDetails(donationDetails: DonationDetails): Observable<DonationDetailsRequest> {
    this.loginUser = this.authenticationService.getLoginUser();

    let createdBy = this.loginUser['loginId'];

    if(donationDetails.createdBy != 'N/A' || donationDetails.createdBy !='Select Fundrising Officer'){
        createdBy = donationDetails.createdBy;
    }

    alert(donationDetails.createdBy);

    let request: DonationDetailsRequest = {
      payload: {
        createdBy: donationDetails.createdBy,
        invoiceHeaderDetailsId: donationDetails.invoiceHeaderDetailsId,
        donorName: donationDetails.donorName,
        mobileNumber: donationDetails.mobileNumber,
        emailId: donationDetails.emailId,
        address: donationDetails.address,
        panNumber: donationDetails.panNumber,
        programName: donationDetails.programName,
        amount: donationDetails.amount,
        transactionId: donationDetails.transactionId,
        paymentMode: donationDetails.paymentMode,
        notes: donationDetails.notes,
        paymentType: 'OFFLINE',
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        // loginId: this.loginUser['loginId'],
        loginId: createdBy,
        superadminId: this.loginUser['superadminId'],

      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "addDonation", request);
  }


  updateDonationDetails(donationDetails: DonationDetails): Observable<DonationDetailsRequest> {
    this.loginUser = this.authenticationService.getLoginUser();
    let request: DonationDetailsRequest = {
      payload: {
        id: donationDetails.id,
        createdBy: this.loginUser['loginId'],
        invoiceHeaderDetailsId: donationDetails.invoiceHeaderDetailsId,
        donorName: donationDetails.donorName,
        mobileNumber: donationDetails.mobileNumber,
        emailId: donationDetails.emailId,
        address: donationDetails.address,
        panNumber: donationDetails.panNumber,
        programName: donationDetails.programName,
        amount: donationDetails.amount,
        transactionId: donationDetails.transactionId,
        paymentMode: donationDetails.paymentMode,
        notes: donationDetails.notes,
        paymentType: 'OFFLINE',
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        loginId: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],

      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "updateDonation", request);
  }

  getDonationList(tabName:string): Observable<DonationDetailsRequest> {
    let request: DonationDetailsRequest = {
      payload: {
        requestedFor: tabName,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
        roleType: this.loginUser['roleType'],
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getDonationList", request);
  }

  getDonationListByRole(tabName:string, searchDetails:any): Observable<DonationDetailsRequest> {
    let userId;
    let userRole;

    if (searchDetails.loginId === null || searchDetails.loginId.trim() === '') {
        userId = searchDetails.teamLeaderId;
        userRole = Constant.teamLeader;
    }else{
      userId = searchDetails.loginId;
      userRole = Constant.fundraisingOfficer;
    }

    let request: DonationDetailsRequest = {
      payload: {
        requestedFor: tabName,
        token: this.loginUser['token'],
        createdBy: userId,
        superadminId: this.loginUser['superadminId'],
        roleType: userRole,
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getDonationList", request);
  }


  getDonationDetailsBySearch(searchKey: any): Observable<DonationDetailsRequest> {
    let request: DonationDetailsRequest = {
      payload: {
        // firstDate: firstDate,
        // lastDate: lastDate,
        requestedFor: 'tabName',
        searchParam: searchKey,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
        roleType: this.loginUser['roleType'],
        // roleType: 'SUPERADMIN',
        // superadminId: 'CEFINT',
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getDonationListBySearchKey", request);

  }

  getDonationListByDate(firstDate:any,lastDate:any): Observable<DonationDetailsRequest> {
    let request: DonationDetailsRequest = {
      payload: {
        firstDate: firstDate,
        lastDate: lastDate,
        requestedFor: 'CUSTOM',
        
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
        roleType: this.loginUser['roleType'],
        // roleType: 'SUPERADMIN',
        // superadminId: 'CEFINT',
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getDonationList", request);
  }


  getDonationListByReceiptNumber(receiptNum: any): Observable<any> {
    let request: DonationDetailsRequest = {
      payload: {
        receiptNumber: receiptNum,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "getDonationListByReceiptNumber", request);
  }

  yesCancelDonationReceipt(donationReceiptId: any): Observable<DonationDetailsRequest> {
    this.loginUser = this.authenticationService.getLoginUser();
    let request: DonationDetailsRequest = {
      payload: {
        id: donationReceiptId,
        status: 'INACTIVE',
        token: this.loginUser['token'],
        loginId: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],

      }
    };
    return this.http.post<DonationDetailsRequest>(Constant.Site_Url + "updateDonationStatus", request);
  }

  downloadPdf(reffNo: string): Observable<HttpResponse<Blob>> {
    const url = Constant.Site_Url+"donationinvoice/"+reffNo;
    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response'
    });
  }


}