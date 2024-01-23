import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LeadManagementService } from '../lead-management.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';


@Component({
  selector: 'app-fresh-lead-list',
  templateUrl: './fresh-lead-list.component.html',
  styleUrls: ['./fresh-lead-list.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class FreshLeadListComponent {

  public leadList: any;
  public cols: any[];

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

 
  constructor(
    private leadManagementService: LeadManagementService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getFreshLeadDetails();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getFreshLeadDetails();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getFreshLeadDetails();
  }

  public getFreshLeadDetails() {
    this.leadManagementService.getFreshLeadDetails()
      .subscribe({
        next: (response: any) => {
          console.log("Data : "+response)
          if (response['responseCode'] == '200') {
            this.leadList = JSON.parse(JSON.stringify(response['listPayload']));
            this.toastr.success(response['status'], response['responseCode']);
            // this.toastr.success(response['responseMessage'], response['responseCode']);
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


}
