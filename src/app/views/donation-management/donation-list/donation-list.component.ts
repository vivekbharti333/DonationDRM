import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DonationManagementService } from '../donation-management-.service';
import { UserManagementService } from '../../user-management/user-management.service';
import { AuthenticationService} from '../../../views/services/authentication.service';
import { Constant } from '../../services/constants';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
declare var $: any;
import { Pipe, PipeTransform } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



interface UserData {
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0 })), // Initial state
      state('*', style({ opacity: 1 })),    // Final state
      transition(':enter, :leave', [         // Transition between states
        animate('0.3s ease-in-out')          // Animation duration and easing function
      ]),
    ]),
  ],
  providers: [DatePipe],
})



export class DonationListComponent {

  rows: UserData[] = [];
  columns = [
    { prop: 'name' },
    { prop: 'age' },
    { prop: 'email' }
    // ... add more columns as needed
  ];
  temp: UserData[] = [];



  public selectedTeamLeaderLoginId: string;
  public userList: any;
  public donationList: any[];
  public cols: any[];
  public isLoading = true;
  public loginUser: any;
  public isMainAdmin: boolean = false;
  public isSuperadmin: boolean = false;
  public isAdmin: boolean = false;
  public isTeamLeader: boolean = false;
  public isDonationExecutive: boolean = false;
  public teamLeaderList: any;
  

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  public editDonationForm: FormGroup;
  public searchDonationForm: FormGroup;
  public displayStyle = "none";
  public cancelDisplayStyle = "none"
  public selectedLoginId: string | null = null;
  public donationReceiptId : any;
 

  activeTab: string = 'TODAY';
  firstDate: any;
  lastDate: any


  constructor(
    private userManagementService: UserManagementService,
    private donationManagementService: DonationManagementService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  ngOnInit() {
    this.getUserList();
    this.getTeamleaderList();
    this.getDonationList('TODAY');
    this.createForms();
    this.checkRoleType();
    
  }





  checkRoleType(){
    console.log("user role : "+this.loginUser['roleType']);
    if(this.loginUser['roleType'] == Constant.mainAdmin){
      this.isMainAdmin = true;
    }else if(this.loginUser['roleType'] == Constant.superAdmin){
      this.isSuperadmin = true;
    }else if(this.loginUser['roleType'] == Constant.admin){
      this.isAdmin = true;
    }else if(this.loginUser['roleType'] == Constant.teamLeader){
      this.isTeamLeader = true;
    }else if(this.loginUser['roleType'] == Constant.donorExecutive){
      this.isDonationExecutive = true;
    }
  }

  openDetails(tabName: string) {
    this.getDonationList(tabName);
    this.activeTab = tabName;
  }

  isTabActive(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  downloadInvoice(receiptNo : string) {
    window.open(Constant.Site_Url+"donationinvoice/"+receiptNo, '_blank');
    console.log(Constant.Site_Url+"donationinvoice/"+receiptNo);
  }

  calcelInvoice(id : Number) {
   
    console.log(id+" id");
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getDonationList(this.activeTab);
  }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getDonationList(this.activeTab);
  // }


  onTableCustomDataChange(event: any) {
    this.page = event;
    //this.getDonationListByDate(this.firstDate,this.lastDate);
  }

  // onTableCustomeSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getDonationListByDate(this.firstDate,this.lastDate);
  // }


  public getUserList() {
    this.userManagementService.getUserDetailsList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.userList = JSON.parse(JSON.stringify(response['listPayload']));
           
          } else {
           
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }




  public getDonationList(tabName: string) {
    this.donationList = [];
    this.donationManagementService.getDonationList(tabName)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.donationList = JSON.parse(JSON.stringify(response['listPayload']));
            this.isLoading = false;
            this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.isLoading = false;
            if(tabName != 'CUSTOM')
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.isLoading = false;
        },
        
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });this.isLoading = false;
  }

  public getDonationDetailsBySearch(searchKey: any){
    this.donationList = [];
    this.donationManagementService.getDonationDetailsBySearch(searchKey)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.donationList = JSON.parse(JSON.stringify(response['listPayload']));
            this.isLoading = false;
            this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.isLoading = false;
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.isLoading = false;
        },
        
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });this.isLoading = false;

  }

  public getDonationListByDate(firstDate: any, lastDate: any) {
    this.donationList = [];
    this.firstDate = firstDate;
    this.lastDate = lastDate;
    
    this.donationManagementService.getDonationListByDate(firstDate, lastDate)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.donationList = JSON.parse(JSON.stringify(response['listPayload']));
            this.isLoading = false;
            this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.isLoading = false;
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.isLoading = false;
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });this.isLoading = false;
  }


  createForms() {
    this.editDonationForm = this.fb.group({
      id: [''],
      createdBy: [''],
      donorName: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      mobileNumber: ['', Validators.pattern('^[0-9]*$')],
      emailId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      panNumber: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      transactionId: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      paymentMode: ['', [Validators.required, Validators.pattern("[0-9A-Za-z ]{3,150}")]],
      notes: ['']
    });
    this.searchDonationForm = this.fb.group({
      loginId: [''],
      teamLeaderId: ['']
    });

  }

  paymentModeOption: any = ['CASH', 'CARD','CHEQUE', 'NET-BANKING', 'UPI', 'PROMO'];

  cancelConfirmationPopup(donation: any) {
    this.donationReceiptId = donation;    
    this.cancelDisplayStyle = "block";
    this.displayStyle = "none";
  
  }


  editDonationPopup(donation: any) {

    this.cancelDisplayStyle = "none";
    this.displayStyle = "block";

    console.log("Opening Edit Modal");
    console.log("displayStyle:", this.displayStyle);

    this.cancelDisplayStyle = "none";
    this.displayStyle = "block";

    this.editDonationForm.patchValue({
      id: donation['id'],
      createdBy: donation['createdBy'],
      donorName: donation['donorName'],
      mobileNumber: donation['mobileNumber'],
      emailId: donation['emailId'],
      address: donation['address'],
      panNumber: donation['panNumber'],
      amount: donation['amount'],
      transactionId: donation['transactionId'],
      paymentMode: donation['paymentMode'],
      notes: donation['notes'],
    });
    
  }

  closeEditPopup() {
    this.displayStyle = "none";
  }

  closeCancelPopup(){
    this.cancelDisplayStyle = "none";
  }

  public removeUserVisible = false;
  removeUserPopup(){
    this.removeUserVisible = !this.removeUserVisible;
  }


  closeRemoveUserPopup() {
    this.removeUserVisible = !this.removeUserVisible;
   }

  yesCancelDonationReceipt(){
    this.isLoading = true;
    this.donationManagementService.yesCancelDonationReceipt(this.donationReceiptId)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.cancelDisplayStyle = "none";
              this.getDonationList('TODAY');
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

  public getUserDetailsList() {
    this.userManagementService.getUserDetailsList()
      .subscribe({
        next: (response: any) => {
         
          if (response['responseCode'] == '200') {
            this.userList = JSON.parse(JSON.stringify(response['listPayload']));
          } else {
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
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

  getDonationByLoginId(tabName:any){
    
    this.donationList = [];
    this.donationManagementService.getDonationListByRole(tabName,this.searchDonationForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.donationList = JSON.parse(JSON.stringify(response['listPayload']));
            this.isLoading = false;
            this.searchDonationForm.reset();
            this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.searchDonationForm.reset();
            this.isLoading = false;
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.searchDonationForm.reset();
          this.isLoading = false;
        },
        
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });this.isLoading = false;
  }

  getDonationByTeamLeaderId(tabName:any){
    this.donationList = [];
    this.donationManagementService.getDonationListByRole(tabName, this.searchDonationForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.donationList = JSON.parse(JSON.stringify(response['listPayload']));
            this.isLoading = false;
            this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.isLoading = false;
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
          this.isLoading = false;
        },
        
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });this.isLoading = false;
  }



  updateDonationDetails(){
    this.isLoading = true;
    this.donationManagementService.updateDonationDetails(this.editDonationForm.value)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              console.log("ok hai")
              this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
              this.editDonationForm.reset();
              this.getDonationList('TODAY');
              // this.setValueInForm();
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



  public exportAsExcelFile(): void {
    let filterdArrayList: any[] = [];  // Initialize as an empty array
  
    this.donationList.forEach(element => {
      let fromDate = this.datePipe.transform(element['fromDate'], 'dd-MM-yyyy');
      let todate = this.datePipe.transform(element['toDate'], 'dd-MM-yyyy');
      let createdAt = this.datePipe.transform(element['createdAt'], 'dd-MM-yyyy');
  
      let data: any = {
        'Donor Name': element['donorName'], 'Mobile Number': element['mobileNumber'],
        'Emailid': element['emailId'],  'Pan Number': element['panNumber'], 
        'Address': element['address'], 'Donation For': element['programName'], 
        'Amount': element['amount'], 'TransactionId': element['transactionId'], 
        'Payment Mode': element['paymentMode'], 'receipt': element['receiptNumber'], 
        'Invoice Number': element['invoiceNumber'], 'Received By': element['createdbyName'], 
        'TeamLeader Id': element['teamLeaderId'], 'Invoice for': element['invoiceHeaderName'], 
        'Superadmin Id': element['superadminId'], 'Donation Date': createdAt };
  
      filterdArrayList.push(data);
    });
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filterdArrayList);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const blob: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(blob, 'Report.xlsx');
    //   this.spinner.hide();
  }
  
  
  
  



}













