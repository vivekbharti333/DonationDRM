import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ApplicationManagementService } from '../application-management.service';
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
  public loginUser: any;
  public applicationDetailsList: any;


  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private applicationManagementService: ApplicationManagementService,
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
      ipAddress: [''],
      loginPageLogo: [''],
      loginPageWallpaper: [''],
      displayLogo: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      displayName: ['', Validators.pattern('^[0-9]*$')],
      emailId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      website: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
    });
  }


  saveAndUpdateAppDetails() {
    this.isLoading = true;
    this.applicationManagementService.saveApplicationDetails(this.applicationForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            let payload = response['payload'];
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.applicationForm.reset();
              this.isLoading = false;
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

  public getApplicationDetailsList() {
    this.applicationManagementService.getApplicationDetailsList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.applicationDetailsList = JSON.parse(JSON.stringify(response['listPayload']));
            this.applicationDetailsList = this.applicationDetailsList[0];
            this.setApplicationDetails();
          } else {
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  setApplicationDetails() {
    this.applicationForm.patchValue({
      ipAddress: this.applicationDetailsList['ipAddress'],
      loginPageLogo: this.applicationDetailsList['loginPageLogo'],
      loginPageWallpaper: this.applicationDetailsList['loginPageWallpaper'],
      displayLogo: this.applicationDetailsList['displayLogo'],
      displayName: this.applicationDetailsList['displayName'],
      emailId: this.applicationDetailsList['emailId'],
      website: this.applicationDetailsList['website'],
      phoneNumber: this.applicationDetailsList['phoneNumber'],
    });
  }

}
