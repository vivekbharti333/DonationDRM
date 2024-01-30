import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-applicantion-details',
  templateUrl: './applicantion-details.component.html',
  styleUrls: ['./applicantion-details.component.scss']
})
export class ApplicantionDetailsComponent {

  public applicationForm: FormGroup;
  public isLoading = false;
  public loginUser : any;


  constructor(
    private fb: FormBuilder,
    private authenticationService : AuthenticationService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  ngOnInit() {
    this.createForms();
    
  }

  createForms() {
    this.applicationForm = this.fb.group({
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


  saveAndUpdateAppDetails(){
    
  }

}
