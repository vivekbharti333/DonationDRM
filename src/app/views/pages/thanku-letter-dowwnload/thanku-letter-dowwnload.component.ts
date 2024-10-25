import { Component, OnInit } from '@angular/core';
import { DonationManagementService } from '../../donation-management/donation-management-.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../services/constants';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-thanku-letter-dowwnload',
  templateUrl: './thanku-letter-dowwnload.component.html',
  styleUrls: ['./thanku-letter-dowwnload.component.scss']
})
export class ThankuLetterDowwnloadComponent implements OnInit{

  public receiptNo: any;
  public message: any;


  successMessageVisible = "Wait";
  errorMessageVisible = "Wait";
  countShow = false;

  countdownValue: number = 5; // Initial countdown value
  countdownInterval: any;


  constructor(
    private donationManagementService: DonationManagementService,
    private toastr: ToastrService,
    private router: Router, // Change routerAct to router
    private route: ActivatedRoute, // Renamed router to route
  ) { }

  ngOnInit() {
    this.getInvoiceHeaderById();
    // this.startCountdown();
    // this.downloadPdf();
  }
  public getInvoiceHeaderById() {
    this.route.queryParams.subscribe(params => {
      this.receiptNo = params['receiptNo']; 

      if (this.receiptNo) {
        this.donationManagementService.getDonationListByReceiptNumber(this.receiptNo)
          .subscribe({
            next: (response: any) => {
              console.log(response['responseCode'] + " response");
              if (response['responseCode'] == '200') {
                this.successMessageVisible = "Please Wait... Your Download will start in ";
                this.countShow = true;
                this.startCountdown();
                setTimeout(() => {
                  this.downloadPdf(this.receiptNo);
                }, 5000);
              } else {
                this.successMessageVisible = "Invalid Request. Contact the admin for details";
                this.countShow = false;
              }
            },
            error: (error: any) => this.toastr.error('Server Error', '500'),
          });
      } else {
        this.successMessageVisible = "No receipt number provided";
      }
    });
  }


  showSuccessMessage(): void {
    this.successMessageVisible = 'Thank You for Your Kind Donation';
    this.countShow = false;
  }


  downloadPdf(receiptNo:any): void {
    // this.receiptNo = this.route.snapshot.params['receiptNo'];
    console.log("receiptNo : "+receiptNo);
    this.donationManagementService.downloadPdf(receiptNo).subscribe(
      (response: any) => {
        const filename = this.getFileNameFromHttpResponse(response);
        console.log("filename : "+filename);
        this.saveFile(response.body, filename);
        this.showSuccessMessage();
      },
      error => {
        console.error('Error downloading PDF: ', error);
      }
    );
  }
  

  private saveFile(blob: Blob, fileName: string): void {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const objectUrl = window.URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(objectUrl);
    document.body.removeChild(a);
  }


  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdownValue > 0) {
        this.countdownValue--;
      } else {
        clearInterval(this.countdownInterval); // Stop the countdown when it reaches 0
      }
    }, 1000); // Update countdown every 1 second (1000 milliseconds)
  }

  private getFileNameFromHttpResponse(response: HttpResponse<Blob>): string {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    
    if (contentDispositionHeader !== null) {
      const matches = /filename="?([^"]+)"?;/g.exec(contentDispositionHeader);
      if (matches != null && matches[1]) {
        return matches[1];
      }
    }
    
    return 'file.pdf'; // Default filename if header is null or filename not found
  }






//   private getFileNameFromHttpResponse(response: HttpResponse<Blob>, url: string): string {
//     const contentDispositionHeader = response.headers.get('Content-Disposition');
    
//     if (contentDispositionHeader !== null) {
//         const matches = /filename="?([^"]+)"?;?/.exec(contentDispositionHeader);
//         if (matches != null && matches[1]) {
//             return matches[1];
//         }
//     }
//     // Extract receiptNo from URL if present, otherwise default to 'file.pdf'
//     const urlParams = new URL(url).searchParams;
//     const receiptNo = urlParams.get('receiptNo');

//     return receiptNo ? `invoice_${receiptNo}.pdf` : 'file.pdf';
// }



}