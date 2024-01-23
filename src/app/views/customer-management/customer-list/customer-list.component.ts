import { Component } from '@angular/core';
import { CustomerManagementService } from '../customer-management.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [DatePipe],
})
export class CustomerListComponent {

  public customerList: any;
  public cols: any[];

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  

  constructor(
    private customerManagementService: CustomerManagementService,
    private toastr: ToastrService,
    //private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.getCustomerDetails();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getCustomerDetails();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCustomerDetails();
  }
  

  public getCustomerDetails() {
    this.customerManagementService.getCustomerDetails()
      .subscribe({
        next: (response: any) => {
          console.log("Data : "+response)
          if (response['responseCode'] == '200') {
            this.customerList = JSON.parse(JSON.stringify(response['listPayload']));
            this.toastr.success(response['status'], response['responseCode']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

}
