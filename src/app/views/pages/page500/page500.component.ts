import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../services/constants';
import { DonationManagementService } from '../../donation-management/donation-management-.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss']
})
export class Page500Component implements OnInit {
  public receiptNo: any;
  public message: any;

  constructor(
    private routerAct: Router,
    private router: ActivatedRoute,
    private donationManagementService: DonationManagementService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.receipt();
  }

  public receipt() {
    // Fetch the 'receiptNo' parameter from the route snapshot

    this.message = "Please Wait.."

    this.receiptNo = this.router.snapshot.params['receiptNo'];
    console.log(this.receiptNo + ": this is receiptNo");

    this.routerAct.navigateByUrl(Constant.Site_Url+"donationinvoice/"+this.receiptNo);
    window.open(Constant.Site_Url+"donationinvoice/"+this.receiptNo);

  }



  public getInvoiceHeaderById() {
    this.receiptNo = this.router.snapshot.params['receiptNo']; // Changed router to route
    console.log(this.receiptNo + ": this is receiptNo");
    
    this.donationManagementService.getDonationListByReceiptNumber(this.receiptNo)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.message = "Thank you for your kind Donation";
            // Redirecting to the new URL using Angular Router
            this.routerAct.navigateByUrl(Constant.Site_Url + "donationinvoice/" + this.receiptNo);
          } else {
            this.message = "Invalid Request";
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }
}
