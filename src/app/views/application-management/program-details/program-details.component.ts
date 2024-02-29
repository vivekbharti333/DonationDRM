import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { ApplicationManagementService } from '../application-management.service';  
import { AuthenticationService} from '../../../views/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../services/constants';
import { DatePipe } from '@angular/common';
import { __values } from 'tslib';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent {

  public loginUser: any;
  public programList: any;
  public isLoading = true;
  public visible = false;
  public addPopupVisible = false;
  public editProgramForm: FormGroup;
  public addProgramForm: FormGroup;

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private applicationManagementService: ApplicationManagementService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  ngOnInit() {
    this.getProgramDetailsList();
    // this.getUserDetails();
    this.createForms();
    // this.checkRoleType();
  }

  onTableDataChange(event: any) {
    this.page = event;
   // this.getUserDetails();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getProgramDetailsList();
  }


  createForms() {
    this.addProgramForm = this.fb.group({
      programName: ['', [Validators.required]], // Example of adding required validator
      programAmount: ['', [Validators.required]], // Example of adding required validator
    });
    this.editProgramForm = this.fb.group({
      id: [''],
      programName: ['', [Validators.required]], // Example of adding required validator
      programAmount: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
    });

  }


  public getProgramDetailsList() {
    this.applicationManagementService.getProgramDetailsList()
      .subscribe({
        next: (response: any) => {
         
          if (response['responseCode'] == '200') {
            this.programList = JSON.parse(JSON.stringify(response['listPayload']));
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


  changeProgramStatus(program:any) {
    this.applicationManagementService.changeProgramStatus(program)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              console.log("ok hai")
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.getProgramDetailsList();
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

  addProgramPopup(){
    this.addPopupVisible = !this.addPopupVisible
  }

  closeAddProgramPopup(){
    this.addPopupVisible = !this.addPopupVisible
  }

  
  addProgramDetails() {
    this.isLoading = true;
    this.applicationManagementService.addProgramDetails(this.addProgramForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            // let payload = response['payload'];
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.addProgramForm.reset();
              this.addPopupVisible = !this.addPopupVisible
              this.isLoading = false;
              this.getProgramDetailsList();
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


  editProgramPopup(programDetails:any){

    console.log(programDetails.id+" idd")
    this.editProgramForm.patchValue({
      id: programDetails.id,
      programName: programDetails.programName,
      programAmount: programDetails.programAmount
    }); 
    this.visible = !this.visible;
  }

  closeUpdateProgramPopup(){
    this.visible = !this.visible;
  }

 
  updateProgramDetails() {
    this.isLoading = true;
    this.applicationManagementService.updateProgramDetails(this.editProgramForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            // let payload = response['payload'];
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.editProgramForm.reset();
              this.visible = !this.visible;
              this.isLoading = false;
              this.getProgramDetailsList();
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

  

  removeProgramPopup(){

  }



  

}
