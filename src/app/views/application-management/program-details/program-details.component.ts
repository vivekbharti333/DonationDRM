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
  public editProgramForm: FormGroup;

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
    this.editProgramForm = this.fb.group({
      programName: [''],
      programAmount: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      status: ['']
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

  changeProgramStatus(type:any){

  }

  editProgramPopup(programDetails:any){

    this.editProgramForm.patchValue({
      programName: programDetails.programName,
      programAmount: programDetails.programAmount
    }); 
    this.visible = !this.visible;
  }

  removeProgramPopup(){

  }

  updateProgramDetails(){

  }

}
