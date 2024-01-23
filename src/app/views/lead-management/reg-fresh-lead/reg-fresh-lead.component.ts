import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// import { DropdownInterface } from '../../Interface/dropdown';
import { LeadManagementService } from '../lead-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg-fresh-lead',
  templateUrl: './reg-fresh-lead.component.html',
  styleUrls: ['./reg-fresh-lead.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegFreshLeadComponent {

  public addLeadForm: FormGroup;
  public loading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private leadManagementService: LeadManagementService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.createForms();
  }

  enquiryForOption: any = ['WEB_SITE', 'CRM', 'CUSTOMIZE PORTAL', 'MOBILE_APP', 'SMS, EMAIL & WHATS APP',];
  enquirySourceOption: any = ['FACEBOOK', 'INSTAGRAM', 'GOOGLE', 'DIRECT', 'OTHERS'];
  businessTypeOption: any = ['REAL_ESTATES', 'SHOP', 'RESTORENT', 'OFFICE', 'OTHERS'];
  statusOption: any = ['INTRESTED', 'LOST', 'FOLLOWUP', 'ENQUIRY', 'OTHERS'];

  createForms() {
    this.addLeadForm = this.fb.group({
      enquiryFor: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      enquirySource: ['', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]],
      businessType: [''],
      customerFirstName: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      customerLastName: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      customerMobile: ['', [Validators.required, Validators.email]],
      customerAlternateMobile: ['', [Validators.required, Validators.email]],
      customerEmailId: ['', [Validators.required, Validators.email]],
      customerCity: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required, Validators.email]],
      notes: ['']
    });
  }

  public saveFreshLeadDetails() {
    this.leadManagementService.saveFreshLeadDetails(this.addLeadForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              console.log("ok hai")
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.addLeadForm.reset();
            } else {
              this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
              console.log(response['payload']['respMesg'])
            }
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

}