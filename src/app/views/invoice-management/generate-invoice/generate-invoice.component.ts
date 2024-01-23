
import { Component, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomerManagementService } from '../../customer-management/customer-management.service';
import { InvoiceManagementService } from '../invoice-management.service';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent {

  public tbodyDataList: any[] = [{}];
  public invoiceForm: FormGroup;
  public customerList: any[] = [];
  public invoiceFormList: FormArray;

  public showLoader = false;
  selectedOption: string = 'option1'
  public isNewCustomer: Boolean = false;
  public isExistsCustomer: Boolean = false;
  selectedGstNumber: string = '';

  onOptionChange() {
    if (this.selectedOption == 'NEW') {
      this.isNewCustomer = true;
      this.isExistsCustomer = false
    } else {
      this.isExistsCustomer = true;
      this.isNewCustomer = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    private customerManagementService: CustomerManagementService,
    private invoiceManagementService: InvoiceManagementService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.createInvoiceForms();
    this.getCustomerDetails();
    
  }


  createInvoiceForms() {
    this.invoiceForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      //customerId: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      firstName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      lastName: ['', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]],
      roleType: [''],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      alternateMobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailId: ['', [Validators.required, Validators.email]],
      companyName: ['', [Validators.required, Validators.email]],
      gstNumber: ['', [Validators.required, Validators.email]],
  
      itemDetails: this.fb.array([this.itemListForm()]),
  
    });
  }

  get itemDetails(): FormArray {
    return this.invoiceForm.get("itemDetails") as FormArray
  }

  itemListForm() {
    return this.fb.group({
      itemName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      rate: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      quantity: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      amount: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
    });
  }

  addItem() {
    this.itemDetails.push(this.itemListForm());
  }
  removeItem(i: number) {
    this.itemDetails.removeAt(i);
  }

  public getCustomerDetails() {
    this.customerManagementService.getCustomerDetails()
      .subscribe({
        next: (response: any) => {
          console.log("Data : "+response)
          if (response['responseCode'] == '200') {
            this.customerList = JSON.parse(JSON.stringify(response['listPayload']));
            // this.toastr.success(response['status'], response['responseCode']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


  saveNewInvoice() {
    console.log(JSON.stringify(this.invoiceForm.value));
    this.showLoader = true;

    this.invoiceManagementService.saveNewInvoice(this.invoiceForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              console.log("ok hai");
              console.log("Form values:", this.invoiceForm.value);
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.invoiceForm.reset();
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



}
