import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesServicesService } from '../pages-services.service'; 
import { DropdownInterface } from '../../Interface/dropdown';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public loading: Boolean = false;
  public passwordVisible: boolean = false;
  // public submitted: boolean = false;

  public loginMsg: any;

  constructor(
    private fb: FormBuilder,
    private pagesServicesService: PagesServicesService,
    private toastr: ToastrService,
    public router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit() {
    this.createForms();
    this.loginMsg = "Login";
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
            this.loginForm.valid;
          }
        }
        },
        error: (error:any) => this.toastr.error('Server Error','500'),
      });
  }

}
