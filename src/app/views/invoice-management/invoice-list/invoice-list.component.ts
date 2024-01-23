import { Component } from '@angular/core';
import { InvoiceManagementService } from '../invoice-management.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  providers: [DatePipe],
})
export class InvoiceListComponent {

  public displayStyle = "none";
  public invoiceNumberList: any;
  public invoiceItemList: any;
  public invoiceHeaderList: any;
  public showLoader = false;

  public invoiceNo: any;
  public totalItem: number;
  public totalAmount: number;
  public createdAt: any;
  public dueDate: any;
  public status: any;
  public footer: any;

  public cols: any[];

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

    constructor(
    private invoiceManagementService: InvoiceManagementService,
    private toastr: ToastrService,
    // private datePipe: DatePipe,
  ) {
  }

    ngOnInit() {
    this.getInvoiceNumberList();
  }

    onTableDataChange(event: any) {
    this.page = event;
    this.getInvoiceNumberList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getInvoiceNumberList();
  }

public getInvoiceNumberList() {
  // Show the loader before making the HTTP request
  this.showLoader = true;

  this.invoiceManagementService.getInvoiceNumberList()
    .subscribe({
      next: (response: any) => {
        console.log("Data : " + response);
        if (response['responseCode'] == '200') {
          this.invoiceNumberList = JSON.parse(JSON.stringify(response['listPayload']));
          this.toastr.success(response['status'], response['responseCode'] + " " + response['responseMessage']);
          this.showLoader = false;
        } else {
          this.toastr.error(response['responseMessage'], response['responseCode']);
        }
        
        // Hide the loader when the response is received
        this.showLoader = false;
      },
      error: (error: any) => {
        this.toastr.error('Server Error', '500');
        
        // Hide the loader in case of an error
        this.showLoader = false;
      },
    });
}


  public getInvoiceDetailsByInvoiceNumber(invoiceNumber: String) {
    this.invoiceManagementService.getInvoiceDetailsByInvoiceNumber(invoiceNumber)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.invoiceItemList = JSON.parse(JSON.stringify(response['listPayload']));
            this.toastr.success(response['status'], response['responseCode']+" "+ response['responseMessage']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  public getInvoiceHeaderList() {
    this.invoiceManagementService.getInvoiceHeaderList()
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.invoiceHeaderList = JSON.parse(JSON.stringify(response['listPayload']));

            this.toastr.success(response['status'], response['responseCode']+" "+ response['responseMessage']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


 
  
  openPopup(invNumList: any) {
    this.getInvoiceDetailsByInvoiceNumber(invNumList.invoiceNo);
    this.getInvoiceHeaderList();

    this.invoiceNo = invNumList.invoiceNo;
    this.totalItem = invNumList.totalItem;
    this.totalAmount = invNumList.totalAmount;
    this.createdAt = invNumList.createdAt;
    this.dueDate = invNumList.dueDate; 
    this.status = invNumList.status;
    this.footer = invNumList.footer;
    
    this.displayStyle = "block";
  }


  closePopup() {
    this.displayStyle = "none";
  }

}
