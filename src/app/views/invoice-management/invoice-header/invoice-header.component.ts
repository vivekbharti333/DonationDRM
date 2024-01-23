import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { InvoiceManagementService } from '../invoice-management.service';
import { UserManagementService } from '../../user-management/user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrls: ['./invoice-header.component.scss']
})
export class InvoiceHeaderComponent {

  public superadminForm: FormGroup;
  public addInvoiceHeaderForm: FormGroup;
  public loading: Boolean = false;
  public superadminList: any;
  public invoiceHeaderList : any;
  public isInvoiceHeaderExists: Boolean = false;

  public superadminId: any;

  public logo: any;

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private invoiceManagementService: InvoiceManagementService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.createForms();
    this.getSuperadminList();
    // this.getInvoiceHeaderList();
  }

  createForms() {
    this.superadminForm = this.fb.group({
      id:[''],
      superadminId: [''],
    });
    this.addInvoiceHeaderForm = this.fb.group({
      invoiceInitial: [''],
      companyLogo:[''],
      companyFirstName: [''],
      companyFirstNameColor:[''],
      companyLastName: [''],
      companyLastNameColor: [''],
      backgroundColor: [''],
      address: [''],
      officeAddress: [''],
      regAddress: [''],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      alternateMobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailId: ['', [Validators.required, Validators.email]],
      website: [''],
      gstNumber: [''],
      panNumber: [''],
      accountHolderName: [''],
      accountNumber: [''],
      ifscCode: [''],
      bankName: [''],
      branchName: [''],
      footer: [''],
      thankYouNote: [''],
      createdBy: [''],
      superadminId: [''],
    });
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Get the base64 part

        // Set the base64 string to the userPicture field
        this.addInvoiceHeaderForm.patchValue({
          companyLogo: base64String
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  }

    public getSuperadminList() {
    this.userManagementService.getUserDetailsList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.superadminList = JSON.parse(JSON.stringify(response['listPayload']));
            this.superadminList = this.superadminList;
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  public getInvoiceHeaderList(event: Event, requestFor:any) {
    const superadminId = (event.target as HTMLSelectElement).value;
    console.log(superadminId)
    const str = superadminId;
    
    const splitValues = str.split(':'); // Split the string by colon
    this.superadminId = splitValues[1].trim();
    this.invoiceManagementService.getInvoiceHeaderBySuperadminId(this.superadminId,"",requestFor)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.invoiceHeaderList = JSON.parse(JSON.stringify(response['listPayload']));
            this.getAndSetInvoiceHeaderDetails();
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  public getInvoiceHeaderById(event: Event, requestFor:any) {
    const id = (event.target as HTMLSelectElement).value;
    console.log(id)
    const str = id;
    
    const splitValues = str.split(':'); // Split the string by colon
    this.invoiceManagementService.getInvoiceHeaderBySuperadminId(this.superadminId,splitValues[1].trim(),"BYID")
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.invoiceHeaderList = JSON.parse(JSON.stringify(response['listPayload']));
            this.getAndSetInvoiceHeaderDetails();
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  getAndSetInvoiceHeaderDetails(){
    
    if(this.invoiceHeaderList[0]['gstNumber'] != null){
      this.isInvoiceHeaderExists = true;
    }
    this.invoiceHeaderList[0]['gstNumber'],

      this.addInvoiceHeaderForm.patchValue({
        invoiceInitial: this.invoiceHeaderList[0]['invoiceInitial'],
        companyFirstName: this.invoiceHeaderList[0]['companyFirstName'],
        companyFirstNameColor: this.invoiceHeaderList[0]['companyFirstNameColor'],
        companyLastName: this.invoiceHeaderList[0]['companyLastName'],
        companyLastNameColor: this.invoiceHeaderList[0]['companyLastNameColor'],
        backgroundColor: this.invoiceHeaderList[0]['backgroundColor'],
        officeAddress: this.invoiceHeaderList[0]['officeAddress'],
        regAddress: this.invoiceHeaderList[0]['regAddress'],
        mobileNo: this.invoiceHeaderList[0]['mobileNo'],
        alternateMobile: this.invoiceHeaderList[0]['alternateMobile'],
        emailId: this.invoiceHeaderList[0]['emailId'],
        website: this.invoiceHeaderList[0]['website'],
        gstNumber: this.invoiceHeaderList[0]['gstNumber'],
        panNumber: this.invoiceHeaderList[0]['panNumber'],
        accountHolderName: this.invoiceHeaderList[0]['accountHolderName'],
        accountNumber: this.invoiceHeaderList[0]['accountNumber'],
        ifscCode: this.invoiceHeaderList[0]['ifscCode'],
        bankName: this.invoiceHeaderList[0]['bankName'],
        branchName: this.invoiceHeaderList[0]['branchName'],
        thankYouNote: this.invoiceHeaderList[0]['thankYouNote'],
        footer: this.invoiceHeaderList[0]['footer'],
        companyLogo: this.invoiceHeaderList[0]['companyLogo'],

        // createdBy: this.invoiceHeaderList[0]['createdBy'],
        // superadminId: this.invoiceHeaderList.superadminId,
      });
      this.logo = 'data:image/png;base64,'+this.invoiceHeaderList[0]['companyLogo'];
    }



  saveInvoiceHeader() {
    this.invoiceManagementService.saveInvoiceHeader(this.superadminId,this.addInvoiceHeaderForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              console.log("ok hai")
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              // this.getInvoiceHeaderList();
            } else {
              this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
            }
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


//   onSelectSuperadmin(event: Event) {
//     const selectedId = (event.target as HTMLSelectElement).value;
//     if (selectedId !== null) {
//         // Implement your logic here using the selectedId (userList.loginId)
//         console.log('Selected ID:', selectedId);

//         // You can call any function or perform any action with the selected ID
//         // For example, call a function from your component:
//         this.yourFunction(selectedId);
//     }
// }

// // Define the function you want to call when an option is selected
// yourFunction(loginId: string) {
//     // Your logic here using the loginId
//     console.log('Login ID:', loginId);
// }


}
