import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { AuthenticationService} from '../../../views/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../services/constants';
import { DatePipe } from '@angular/common';
import { __values } from 'tslib';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [DatePipe],
})
export class UserListComponent {

  public addressTypeValue: string | null = null;

  public userPhoto: any;
  public userList: any;
  public userAddressList: any;
  public cols: any[];
  public displayStyle = "none";
  public editUserForm: FormGroup;
  public teamLeaderForm: FormGroup;
  public searchForm: FormGroup;
  public teamLeaderList: any;

  public searchKey:any;

  public loginUser: any;
  public isMainAdmin: boolean = false;
  public isSuperadmin: boolean = false;
  public isAdmin: boolean = false;
  public isTeamLeader: boolean = false;

  // public myBirtday: '19-09-2023';
  public visible = false;
  public removeUserVisible = false;
  public isLoading = true;
  public loginId :any;

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  ngOnInit() {
    this.getTeamleaderList();
    this.getUserDetails();
    this.createForms();
    this.checkRoleType();
  }

  checkRoleType(){
    console.log("Role type : "+this.loginUser['roleType']);
    if(this.loginUser['roleType'] === Constant.mainAdmin){
      this.isMainAdmin = true;
      this.isSuperadmin = true;
    }else if(this.loginUser['roleType'] === Constant.superAdmin){
      this.isSuperadmin = true;
    }else if(this.loginUser['roleType'] === Constant.admin){
      this.isAdmin = true;
      this.isSuperadmin = true;
    }else if(this.loginUser['roleType'] === Constant.teamLeader){
      this.isTeamLeader = true;
    }
  }

  serviceType: any = ['DONATION'];
  roleTypeForMainAdmin: any = [Constant.superAdmin,Constant.admin, Constant.teamLeader, Constant.fundraisingOfficer];
  roleTypeForSuperadmin: any = [Constant.admin, Constant.teamLeader, Constant.fundraisingOfficer];
  roleTypeForAdmin: any = [Constant.teamLeader, Constant.fundraisingOfficer];
  roleTypeFoManager: any = [Constant.fundraisingOfficer];



  onTableDataChange(event: any) {
    this.page = event;
   // this.getUserDetails();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUserDetails();
  }

  public getTeamleaderList() {
    this.userManagementService.getTeamleaderList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.teamLeaderList = JSON.parse(JSON.stringify(response['listPayload']));
            console.log(this.teamLeaderList)
          } else {
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  public getUserByTeamLeader(){ 
    this.userList = [];
    this.userManagementService.getUserDetailsListBySelectingTeamLeader(this.teamLeaderForm.value)
    .subscribe({
      next: (response: any) => {
        if (response['responseCode'] == '200') {
          this.userList = JSON.parse(JSON.stringify(response['listPayload']));
          const firstAddressForm1 = this.addressList.at(0) as FormGroup;
          firstAddressForm1.reset();
          const firstAddressForm2 = this.addressList.at(1) as FormGroup;
          firstAddressForm2.reset();

          this.isLoading = false;
          this.toastr.success(response['responseMessage']);
        } else {
          this.isLoading = false;
          this.toastr.error(response['responseMessage'], response['responseCode']);
        }
        this.isLoading = false;
      },
      error: (error: any) => this.toastr.error('Server Error', '500'),
    });
}

  public getUserDetails() {
    this.userManagementService.getUserDetailsList()
      .subscribe({
        next: (response: any) => {
         
          if (response['responseCode'] == '200') {
            this.userList = JSON.parse(JSON.stringify(response['listPayload']));
            const firstAddressForm1 = this.addressList.at(0) as FormGroup;
            firstAddressForm1.reset();
            const firstAddressForm2 = this.addressList.at(1) as FormGroup;
            firstAddressForm2.reset();

            this.isLoading = false;
            this.toastr.success(response['responseMessage']);
          } else {
            this.isLoading = false;
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.isLoading = false;
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


  public getUserDetailsBySearch() {
    console.log(this.searchKey+" hjf")
    this.userManagementService.getUserDetailsBySearch(this.teamLeaderForm.value)
      .subscribe({
        next: (response: any) => {
         
          if (response['responseCode'] == '200') {
            this.userList = JSON.parse(JSON.stringify(response['listPayload']));
            const firstAddressForm1 = this.addressList.at(0) as FormGroup;
            firstAddressForm1.reset();
            const firstAddressForm2 = this.addressList.at(1) as FormGroup;
            firstAddressForm2.reset();

            this.getTeamleaderList();

            this.isLoading = false;
            this.toastr.success(response['responseMessage']);
          } else {
            this.isLoading = false;
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.isLoading = false;
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  public getAddressDetailsByUserId(user:any) {
    this.userManagementService.getAddressDetailsByUserId(user)
      .subscribe({
        next: (response: any) => {
          console.log("Data : "+response)
          if (response['responseCode'] == '200') {
            this.userAddressList = JSON.parse(JSON.stringify(response['listPayload']));
            // this.toastr.success(response['status'], response['responseCode']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


  createForms() {
    this.editUserForm = this.fb.group({
      loginId: [''],
      firstName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      lastName: ['', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]],
      roleType: [''],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      alternateMobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailId: ['', [Validators.required, Validators.email]],
      dob: [''],
      userPicture:[''],
      addressList: this.fb.array([
        this.addressForm(),
        this.addressForm()]),
    });
    this.teamLeaderForm = this.fb.group({
      teamLeaderId: [''],
      searchKey: [''],
    });
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
  }

  get addressList(): FormArray {
    return this.editUserForm.get("addressList") as FormArray
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

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; 

        this.editUserForm.patchValue({
          userPicture: base64String
        }); 
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  removeUserPopup(user: any){
 console.log("Userid : "+ user.id);
    this.loginId = user.loginId;
    this.removeUserVisible = !this.removeUserVisible;
  }

  closeUserRemovePopup() {
    // this.displayStyle = "none";
    this.removeUserVisible = !this.removeUserVisible;
   }

   removeUser(){
    this.isLoading = true;
    this.userManagementService.removeUserParmanent(this.loginId)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.isLoading = false;
              this.removeUserVisible = !this.removeUserVisible;
              this.getUserDetails();
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

  editUserPopup(user: any) {
    this.getAddressDetailsByUserId(user);
  
    // Create a copy of the addressList from userAddressList
    const addressListCopy = [...this.userAddressList];
  
    // Fill the addressForm array with values from userAddressList
    while (this.addressList.length < addressListCopy.length) {
      this.addressList.push(this.addressForm());
    }
  
    for (let i = 0; i < addressListCopy.length; i++) {
      const addressGroup = this.addressList.at(i) as FormGroup;
      const address = addressListCopy[i];
  
      // Update the values in the addressForm
      addressGroup.patchValue({
        addressType: address.addressType,
        addressLine: address.addressLine,
        landmark: address.landmark,
        district: address.district,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      });
    }
  
    this.editUserForm.patchValue({
      userPicture: user['userPicture'],
      loginId: user['loginId'],
      firstName: user['firstName'],
      lastName: user['lastName'],
      roleType: user['roleType'],
      mobileNo: user['mobileNo'],
      alternateMobile: user['alternateMobile'],
      emailId: user['emailId'],
      dob: user['dob'],
      userPhoto: user['userPhoto']
    });

    if(user['userPicture'] != ""){
      this.userPhoto = 'data:image/png;base64,'+user['userPicture'];
    }else{
      this.userPhoto = "";
    }
  
    
    
    // this.displayStyle = "block";
    this.visible = !this.visible;
  }
  


  closeEditPopup() {
   // this.displayStyle = "none";
   this.visible = !this.visible;
  }

  

  // handleLiveDemoChange(event: any) {
  //   this.visible = event;
  // }

  updateUserDetails(){
    this.userManagementService.updateUserDetails(this.editUserForm.value)
    .subscribe({
      next: (response: any) => {
        if (response['responseCode'] == '200') {
          if (response['payload']['respCode'] == '200') {
            console.log("ok hai")
            this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
            this.editUserForm.reset();
            this.displayStyle = "none";
            this.getUserDetails();
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

changeUserStatus(user:any) {
  this.userManagementService.changeUserStatus(user)
    .subscribe({
      next: (response: any) => {
        if (response['responseCode'] == '200') {
          if (response['payload']['respCode'] == '200') {
            console.log("ok hai")
            this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
            this.getUserDetails();
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











// toggleLiveDemo() {
//   this.visible = !this.visible;
// }








}






