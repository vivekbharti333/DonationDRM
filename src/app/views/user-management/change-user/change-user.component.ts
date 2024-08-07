import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../services/constants';
import { AuthenticationService} from '../../../views/services/authentication.service';
import { constants } from 'buffer';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeUserComponent {

  public changePasswordBtnMessage ="Submit";
  public changePasswordBtn: boolean = false;
  public changeUserPasswordForm: FormGroup;
  public changeRoleBtnMessage = "Submit";
  public changeUserRoleBtn: boolean = false;
  public changeUserRoleForm: FormGroup;
  public changeTeamLeaderBtnMessage = "Submit";
  public changeTeamLeaderBtn: boolean = false;
  public changeTeamLeaderForm: FormGroup;
  public isLoading = false;
  public loginUser: any;
  public userList: any;
  public teamLeaderList: any;

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  roleTypeForSuperadmin: any = [Constant.admin, Constant.teamLeader, Constant.fundraisingOfficer, Constant.donorExecutive];

  ngOnInit() {
    this.createForms();
    this.getUserDetailsList();
    this.getTeamleaderList();
  }

  createForms() {
    this.changeUserPasswordForm = this.fb.group({
      loginId: [''],
      password: [''],
    });
    this.changeUserRoleForm = this.fb.group({
      loginId: [''],
      roleType: [''],
    });
    this.changeTeamLeaderForm = this.fb.group({
      loginId: [''],
      teamLeaderId: [''],
    });
  }


  public getUserDetailsList() {
    this.userManagementService.getUserDetailsList()
      .subscribe({
        next: (response: any) => {
         
          if (response['responseCode'] == '200') {
            this.userList = JSON.parse(JSON.stringify(response['listPayload']));
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
          this.isLoading = false;
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  public changePassword(){
    this.isLoading = true;
    this.changePasswordBtnMessage = "Processing Wait.."
    this.changePasswordBtn = true;
    this.userManagementService.changeUserPassword(this.changeUserPasswordForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.changeUserPasswordForm.reset();
              this.createForms();
              this.changePasswordBtnMessage = "Submit"
              this.changePasswordBtn = false;
              this.isLoading = false;
            } else {
              this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
              this.isLoading = false;
              this.changePasswordBtnMessage = "Submit"
              this.changePasswordBtn = false;
              
            }
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
            this.isLoading = false;
            this.changePasswordBtnMessage = "Submit"
              this.changePasswordBtn = false;
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
      this.isLoading = false;
  }

  public changeUserRole(){
    this.isLoading = true;
    this.changeRoleBtnMessage = "Processing Wait.."
    this.changeUserRoleBtn = true;
    this.userManagementService.changeUserRole(this.changeUserRoleForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.changeUserRoleForm.reset();
              this.createForms();
              this.changeRoleBtnMessage = "Submit"
              this.changeUserRoleBtn = false;
              this.isLoading = false;
            } else {
              this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
              this.isLoading = false;
              this.changeRoleBtnMessage = "Submit"
              this.changeUserRoleBtn = false;
            }
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
            this.isLoading = false;
            this.changeRoleBtnMessage = "Submit"
            this.changeUserRoleBtn = false;
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
      this.isLoading = false;
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

  public getFundrisingOfficersList() {
    this.userManagementService.getFundrisingOfficersList()
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


  public changeTeamLeader(){
    this.isLoading = true;
    this.changeTeamLeaderBtnMessage= "Processing wait.."
    this.changeTeamLeaderBtn = true;
    this.userManagementService.changeTeamLeader(this.changeTeamLeaderForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.changeUserRoleForm.reset();
              this.createForms();
              this.changeTeamLeaderBtnMessage = "Submit";
              this.changeTeamLeaderBtn = false;
              this.isLoading = false;
            } else {
              this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
              this.isLoading = false;
              this.changeTeamLeaderBtnMessage = "Submit";
              this.changeTeamLeaderBtn = false;
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
