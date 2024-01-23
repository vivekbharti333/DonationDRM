import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../services/constants';
import { InvoiceRequest, InvoiceDetails } from '../interface/invoice-management';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceManagementService {

  public loginId: any;
  public superadminId: any;
  public loginUser: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  saveInvoiceHeader(superadninId: any,invoiceHeader: any){
      let request: any = {
        payload: {
          invoiceInitial: invoiceHeader.invoiceInitial,
          companyLogo: invoiceHeader.companyLogo,
          companyFirstName: invoiceHeader.companyFirstName,
          companyFirstNameColor: invoiceHeader.companyFirstNameColor,
          companyLastName: invoiceHeader.companyLastName,
          companyLastNameColor: invoiceHeader.companyLastNameColor,
          backgroundColor: invoiceHeader.backgroundColor,
          // address: invoiceHeader.address,
          officeAddress: invoiceHeader.officeAddress,
          regAddress: invoiceHeader.regAddress,
          mobileNo: invoiceHeader.mobileNo,
          alternateMobile: invoiceHeader.alternateMobile,
          emailId: invoiceHeader.emailId,
          website: invoiceHeader.website,
          gstNumber: invoiceHeader.gstNumber,
          panNumber: invoiceHeader.panNumber,
          accountHolderName: invoiceHeader.accountHolderName,
          accountNumber: invoiceHeader.accountNumber,
          ifscCode: invoiceHeader.ifscCode,
          bankName: invoiceHeader.bankName,
          branchName: invoiceHeader.branchName,
          thankYouNote: invoiceHeader.thankYouNote,
          footer: invoiceHeader.footer,
          token: this.loginUser['token'],
          createdBy: superadninId,
          superadminId: superadninId,
        }
      };
      return this.http.post<any>(Constant.Site_Url + "addInvoiceHeader", request);
  }

  getInvoiceHeaderList(){
    let request: InvoiceRequest = {
      payload: {
        requestFor: 'BYSUPERADMINID',
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<InvoiceRequest>(Constant.Site_Url + "getInvoiceHeaderList", request);
  }

  getInvoiceHeaderBySuperadminId(superadminId:any, id:any, requestFor:string){
    let request: InvoiceRequest = {
      payload: {
        id:id,
        requestFor: requestFor,
        token: this.loginUser['token'],
        createdBy: superadminId,
        superadminId: superadminId,
      }
    };
    return this.http.post<InvoiceRequest>(Constant.Site_Url + "getInvoiceHeaderList", request);
  }

  getPaymentModeList(){
    let request: any = {
      payload: {
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<any>(Constant.Site_Url + "getPaymentModeListBySuperadminId", request);
  }

  saveNewInvoice(invoiceDetail: any): Observable<any> {

    let request: any = {
      payload: {
        customerId: invoiceDetail.customerId,
        totalItem: invoiceDetail.totalItem,
        totalAmount: invoiceDetail.totalAmount,
        itemDetails: invoiceDetail.itemDetails,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<any>(Constant.Site_Url + "generateInvoice", request);
  }

  getInvoiceNumberList(): Observable<InvoiceRequest> {
    let request: InvoiceRequest = {
      payload: {
        token: this.loginUser['token'],
        requestFor: "SUPALL",
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<InvoiceRequest>(Constant.Site_Url + "getInvoiceNumberList", request);
  }

  getInvoiceDetailsByInvoiceNumber(invoiceNumber : String): Observable<InvoiceRequest> {
    let request: InvoiceRequest = {
      payload: {
        token: this.loginUser['token'],
        requestFor: "SUPALL",
        invoiceNo: invoiceNumber,
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<InvoiceRequest>(Constant.Site_Url + "getInvoiceDetailsList", request);
  }
}



