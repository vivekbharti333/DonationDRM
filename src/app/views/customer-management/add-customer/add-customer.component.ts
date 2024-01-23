import { Component,  ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { CustomerManagementService } from '../customer-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  public addCustomerForm: FormGroup;
  public loading: Boolean = false;


  constructor(
    private fb: FormBuilder,
    private customerManagementService: CustomerManagementService,
    private toastr: ToastrService,
  ) {
  }

  addressType: any = ['BILLING ADDRESS', 'SHIPPING ADDRESS']

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.addCustomerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      lastName: ['', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      alternateMobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailId: ['', [Validators.required, Validators.email]],
      companyName: [''],
      gstNumber: [''],

      addressList: this.fb.array([
        this.addressForm(),
        this.addressForm()]), // two type because to show only two index after load page
   
    });
  }

  get addressList(): FormArray {
    return this.addCustomerForm.get("addressList") as FormArray
  }

  addressForm() {
    return this.fb.group({
      addressType: [''],
      addressLine: [''],
      landmark: [''],
      district: [''],
      city: [''],
      state: [''],
      country: ['INDIA'],
      pincode: ['']
    });
  }

  // addItem() {
  //   this.addressList.push(this.addressForm());
  // }
  // removeItem(i: number) {
  //   this.addressList.removeAt(i);
  // }

  // copyValuesFromIndex0To1() {
  //   const addressList = this.addressList.get('addressList') as FormArray;
  //   const address0 = addressList.at(0);
  //   const address1 = addressList.at(1);

  //   // Loop through the form controls and copy values from index 0 to index 1
  //   Object.keys(address0.value).forEach((key) => {
  //     address1.get(key)?.setValue(address0.get(key)?.value);
  //   });
  // }

  saveCustomerDetails() {
    this.customerManagementService.saveCustomerDetails(this.addCustomerForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.addCustomerForm.reset();
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
