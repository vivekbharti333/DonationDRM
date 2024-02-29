import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesServicesService } from '../pages-services.service'; 
import { DropdownInterface } from '../../Interface/dropdown';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApplicationManagementService } from '../../application-management/application-management.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public loading: Boolean = false;
  public passwordVisible: boolean = false;
  public loginFormBtn: boolean = false;
  // public submitted: boolean = false;

  public loginMsg: any;
  public applicationDetailsList: any;
  public loginPageWallpaper:any;

  constructor(
    private fb: FormBuilder,
    private pagesServicesService: PagesServicesService,
    private toastr: ToastrService,
    private applicationManagementService: ApplicationManagementService,
    public router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit() {
    this.createForms();
    this.loginMsg = "Login";
    this.getApplicationDetailsByIpAddress();
   // this.loginForm.valid;
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // disableSubmitButton(): boolean {
  //   return this.loginForm.valid; // Disable if the form is invalid

  // }

  createForms() {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]], // Using pattern validator
      password: ['', Validators.required]
    });
  }

  checkCredential() {
    this.loginFormBtn = true;
    this.loginMsg = 'Please Wait..';
    // this.submitted = true;
    this.pagesServicesService.checkCredential(this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          console.log(response['responseCode']+" , MMM ,"+response['payload']['respCode']);
          if (response['responseCode'] == '200') {
          if (response['payload']['respCode'] == '200') {

            let expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 1);
            this.cookieService.set('loginDetails', JSON.stringify(response['payload']), expiredDate);
            this.router.navigate(['dashboard']);

            this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
          }else{
            this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
            this.loginMsg = 'Login';
            this.loginFormBtn = false;
          }
        }
        },
        error: (error:any) => this.toastr.error('Server Error','500'),
      });
  }

  public getApplicationDetailsByIpAddress() {
    this.applicationManagementService.getApplicationDetailsByIpAddress()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.applicationDetailsList = JSON.parse(JSON.stringify(response['payload']));
            // this.applicationDetailsList = this.applicationDetailsList;
            console.log(this.applicationDetailsList['loginPageWallpaper']);

            if(this.applicationDetailsList['loginPageWallpaper'] != null){
              this.loginPageWallpaper = 'data:image/png;base64,'+this.applicationDetailsList['loginPageWallpaper'];
            }else{
              this.loginPageWallpaper ="";
            }

            // this.setApplicationDetails();
          } else {
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

}
