import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { DonationManagementService } from '../donation-management-.service';
import { InvoiceManagementService } from '../../invoice-management/invoice-management.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.scss']
})
export class AddDonationComponent {

  public addDonationForm: FormGroup;
  public isLoading = false;
  public loginUser : any;

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
  }

  ngOnInit() {
    this.createForms();
    this.getInvoiceTypeList();
    this.getDonationTypeList();
    this.getPaymentModeList();
    this.setValueInForm();
    this.getCurrentLocation();
    this.getClientIpAddress();
  }

  // paymentModeOption: any = ['CASH', 'CARD','CHEQUE', 'NET-BANKING', 'UPI','WEBSITE'];

  createForms() {
    this.addDonationForm = this.fb.group({
      createdBy: [''],
      invoiceHeaderDetailsId:[''],
      donorName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      mobileNumber: ['', Validators.pattern('^[0-9]*$')],
      emailId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      panNumber: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      programName: [''],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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
      const url = 'https://datafusionlab.co.in:8080/mycrm/test';
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

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                  position.coords.latitude +
                  'Longitude: ' +
                  position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

}