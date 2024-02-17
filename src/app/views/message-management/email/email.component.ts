import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { MessageManagenetService } from '../message-managenet.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../services/constants';
import { AuthenticationService} from '../../../views/services/authentication.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailComponent {

  public addEmailForm: FormGroup;
  public isLoading = false;
  public loginUser: any;
  public emailDetailsList: any;

  constructor(
    private fb: FormBuilder,
    private messageManagenetService: MessageManagenetService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  ngOnInit() {
    this.createForms();
    this.getEmailServiceDetailsList();
  }

  emailTypeOption: any = ['DONATION_RECEIPT'];
  

  createForms() {
    this.addEmailForm = this.fb.group({
      emailType: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      host: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      port: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      emailUserid: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      emailPassword: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      emailFrom: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      subject: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      emailBody: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
    });
  }

  addUpdateEmailServiceDetails(){
    this.isLoading = true;
    this.messageManagenetService.addUpdateEmailServiceDetails(this.addEmailForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            // let payload = response['payload'];
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.addEmailForm.reset();
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


  public getEmailServiceDetailsList() {
    this.messageManagenetService.getEmailServiceDetailsList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.emailDetailsList = JSON.parse(JSON.stringify(response['listPayload']));
            this.emailDetailsList = this.emailDetailsList[0];
            console.log(this.emailDetailsList)
            this.setEmailDetails();
          } else {
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  setEmailDetails() {
    this.addEmailForm.patchValue({
      emailType: this.emailDetailsList['emailType'],
      host: this.emailDetailsList['host'],
      port: this.emailDetailsList['port'],
      emailUserid: this.emailDetailsList['emailUserid'],
      emailPassword: this.emailDetailsList['emailPassword'],
      emailFrom: this.emailDetailsList['emailFrom'],
      subject: this.emailDetailsList['subject'],
      emailBody: this.emailDetailsList['emailBody'],
    });
  }

}
