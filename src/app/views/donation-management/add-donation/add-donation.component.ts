import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { DonationManagementService } from '../donation-management-.service';
import { InvoiceManagementService } from '../../invoice-management/invoice-management.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constant } from '../../services/constants';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.scss']
})
export class AddDonationComponent {

  public addDonationForm: FormGroup;
  public isLoading = false;
  public loginUser : any;
  public showFundrisingOfficerList: boolean = false;

  public showCurrencyBox: boolean = false;
  public currencyList: any;
  public fundRisingOffcerList: any;
  public invoiceTypeList: any;
  public invoiceType: any;
  public paymentModeList: any;
  public donationTypeList: any;
  public programNames: string;
  public selectedProgramAmount: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authenticationService : AuthenticationService,
    private donationManagementService : DonationManagementService,
    private invoiceManagementService : InvoiceManagementService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
    this.createForms();
  }

  ngOnInit() {
    this.createForms();
    this.getCurrencyDetailBySuperadmin();
    this.getFundrisingOfficerByTeamLeaderId();
    this.getInvoiceTypeList();
    this.getDonationTypeList();
    this.getPaymentModeList();
    this.setValueInForm();
    this.checkRoleType();
    // this.getCurrentLocation();
    this.getClientIpAddress(); 
  }

  checkRoleType(){
    if(this.loginUser['roleType'] == Constant.mainAdmin ||
      this.loginUser['roleType'] == Constant.superAdmin ||
      this.loginUser['roleType'] == Constant.admin 
      // ||
      // this.loginUser['roleType'] == Constant.teamLeader
    ){
      this.showFundrisingOfficerList = true;
    } else if(this.loginUser['roleType'] == Constant.fundraisingOfficer){
      this.showFundrisingOfficerList = false;
    }
  }


  createForms() {
    this.addDonationForm = this.fb.group({
      createdBy: ['N/A'],
      invoiceHeaderDetailsId:[''],
      donorName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      mobileNumber: ['', Validators.pattern('^[0-9]*$')],
      emailId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      panNumber: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      programName: [''],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      currency: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      currencyCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      transactionId: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      paymentMode: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      notes: ['']
    });
  }

  setValueInForm(){
    this.addDonationForm.patchValue({
      createdBy: this.loginUser['loginId'],
     
    });
  }

  onSelectFundrisingOfficer(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selectedValue);
    // alert('Selected value:', selectedValue);
  }

  public getInvoiceTypeList() {
    // this.donationManagementService.getInvoiceTypeList()
    this.invoiceManagementService.getInvoiceHeaderList()
        .subscribe({
          next: (response: any) => {
            if (response['responseCode'] == '200') {
              this.invoiceTypeList = JSON.parse(JSON.stringify(response['listPayload']));
              console.log(this.invoiceTypeList)
             // this.toastr.success(response['responseMessage'], response['responseCode']);
            } else {
              //this.toastr.error(response['responseMessage'], response['responseCode']);
            }
          },
          error: (error: any) => this.toastr.error('Server Error', '500'),
        });
    }

    

  public getCurrencyDetailBySuperadmin() {
    this.donationManagementService.getCurrencyDetailBySuperadmin()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.currencyList = JSON.parse(JSON.stringify(response['listPayload']));

            if (this.currencyList.length > 1) {
              this.showCurrencyBox = true;
              
            }
            this.addDonationForm.controls['currencyCode'].setValue(this.currencyList[0].currencyCode);
          } else {
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

    public getFundrisingOfficerByTeamLeaderId() {
      this.donationManagementService.getFundrisingOfficerByTeamLeaderId()
          .subscribe({
            next: (response: any) => {
              if (response['responseCode'] == '200') {
                this.fundRisingOffcerList = JSON.parse(JSON.stringify(response['listPayload']));
              } else {
                //this.toastr.error(response['responseMessage'], response['responseCode']);
              }
            },
            error: (error: any) => this.toastr.error('Server Error', '500'),
          });
      }

  public getDonationTypeList() {
    this.donationManagementService.getDonationTypeList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.donationTypeList = JSON.parse(JSON.stringify(response['listPayload']));

            console.log("This one :"+this.donationTypeList.value)
            this.programNames = this.donationTypeList.listPayload.map((item: any) => item.programName);
            
            this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }
  

  onProgramSelect(program: any) {
    this.selectedProgramAmount = program['programAmount']; 
  }

  public getPaymentModeList() {
    this.invoiceManagementService.getPaymentModeList()
        .subscribe({
          next: (response: any) => {
            if (response['responseCode'] == '200') {
              this.paymentModeList = JSON.parse(JSON.stringify(response['listPayload']));
            } else {
            }
          },
          error: (error: any) => this.toastr.error('Server Error', '500'),
        });
    }

    getClientIpAddress() {
      const url = Constant.Site_Url+'test';
      this.http.get(url).subscribe(
        (response) => {
          console.log('Response from API:', response);
          // Further processing of the response can be done here
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
    }

    setCurrency(rawData:any) {
      const selectedCurrency = rawData['unicode'];
      console.log('Selected Currency:', rawData.currencyCode, selectedCurrency);
    }

  public saveDonationDetails() {
    this.isLoading = true;
    this.donationManagementService.saveDonationDetails(this.addDonationForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            let payload = response['payload'];
            if (response['payload']['respCode'] == '200') {
              console.log("ok hai")
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.addDonationForm.reset();
              this.addDonationForm.controls['currencyCode'].setValue(this.currencyList[0].currencyCode);
              this.setValueInForm();
              this.isLoading = false;
              

              if(payload['paymentMode'] == 'PAYMENT_GATEWAY'){
                let url = payload['paymentGatewayPageRedirectUrl'];
                console.log(" URL : "+url)
                this.router.navigate(['donation/donationlist']);
                window.open(url, '_blank');
              }

            } else {
              this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
              this.isLoading = false;
            }
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
            this.isLoading = false;
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  // getCurrentLocation() {
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           if (position) {
  //             console.log(
  //               'Latitude: ' +
  //                 position.coords.latitude +
  //                 'Longitude: ' +
  //                 position.coords.longitude
  //             );
  //             let lat = position.coords.latitude;
  //             let lng = position.coords.longitude;

  //             const location = {
  //               lat,
  //               lng,
  //             };
  //             resolve(location);
  //           }
  //         },
  //         (error) => console.log(error)
  //       );
  //     } else {
  //       reject('Geolocation is not supported by this browser.');
  //     }
  //   });
  // }

}