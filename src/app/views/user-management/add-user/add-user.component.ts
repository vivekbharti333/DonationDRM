import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../services/constants';
import { AuthenticationService} from '../../../views/services/authentication.service';
import { constants } from 'buffer';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserComponent {

  public addUserForm: FormGroup;
  public isLoading = false;

  public currentAddressType: string = 'CURRENT';
  public parmanentAddressType: string = 'PERMANENT';

  public userList: any;
  public loginUser: any;
  public isMainAdmin: boolean = false;
  public isSuperadmin: boolean = false;
  public isAdmin: boolean = false;
  public isTeamLeader: boolean = false;


  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  ngOnInit() {
    this.createForms();
    this.checkRoleType();
    this.getTeamleaderList();
  }

  checkRoleType(){
    console.log("user role : "+this.loginUser['roleType'])
    if(this.loginUser['roleType'] == Constant.mainAdmin){
      this.isMainAdmin = true;
    }else if(this.loginUser['roleType'] == Constant.superAdmin){
      this.isSuperadmin = true;
    }else if(this.loginUser['roleType'] == Constant.admin){
      this.isAdmin = true;
    }else if(this.loginUser['roleType'] == Constant.teamLeader){
      this.isTeamLeader = true;
    }
  }


  serviceType: any = ['DONATION'];

  roleTypeForMainAdmin: any = ['SUPERADMIN',Constant.admin, Constant.teamLeader, Constant.fundraisingOfficer, Constant.donorExecutive];
  roleTypeForSuperadmin: any = [Constant.admin, Constant.teamLeader, Constant.fundraisingOfficer, Constant.donorExecutive];
  roleTypeForAdmin: any = [Constant.teamLeader, Constant.fundraisingOfficer];
  roleTypeFoManager: any = [Constant.fundraisingOfficer];

  createForms() {
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      lastName: ['', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]],
      roleType: [''],
      createdBy: [''],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      alternateMobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailId: ['', [Validators.required, Validators.email]],
      userPicture:[''],
      service:['DONATION'],
      dob: [''],
      addressList: this.fb.array([
        this.addressForm(),
        this.addressForm()]),
      

    });
  }

  get addressList(): FormArray {
    return this.addUserForm.get("addressList") as FormArray
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

  addItem() {
    this.addressList.push(this.addressForm());
  }
  removeItem(i: number) {
    this.addressList.removeAt(i);
  }


  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Get the base64 part

        // Set the base64 string to the userPicture field
        this.addUserForm.patchValue({
          userPicture: base64String
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  public getTeamleaderList() {
    this.userManagementService.getTeamleaderList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.userList = JSON.parse(JSON.stringify(response['listPayload']));
            console.log(this.userList)
           // this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            //this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  saveUserDetails() {
    this.isLoading = true;
    this.userManagementService.saveUserDetails(this.addUserForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.addUserForm.reset();
              this.createForms();
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
      this.isLoading = false;
  }



}
