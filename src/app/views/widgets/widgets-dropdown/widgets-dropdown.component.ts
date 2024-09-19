import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { WidgetsServicesService } from '../widgets-services.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../services/constants';
import { AuthenticationService } from '../../services/authentication.service';


declare var google: any;

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  public loginUser: any;
  public isMainAdmin: boolean = false;
  public isSuperadmin: boolean = false;
  public isAdmin: boolean = false;
  public isTeamLeader: boolean = false;

  public activeUserCount: any;
  public inactiveUserCount: any;
  public todaysCount: any;
  public todaysAmount: any;
  public yesterdayCount: any;
  public yesterdayAmount: any;
  public monthCount: any;
  public monthAmount: any;

  public validityExpireOn: any;

  public FRToday: any;
  public star: any;
  public starfundrisingofficer: string;
  public starTeam: string;
  public PaymentModeCountAmount: any;
  // public FRcount: any;
  // public FRAmount: any;

  activeTab: string = 'TODAY';
  paymentActiveTab: string = 'TODAY';

  currentMonthName: string;
  previousMonthName: string

  public diffInDays = 0;

  slideIndex = 0;
  slides = [
    { image: 'https://www.w3schools.com/howto/img_avatar.png', caption: 'Caption Text' ,name: 'fdhdthteyt13545' },
    { image: 'https://www.w3schools.com/howto/img_avatar.png' , caption: 'Caption Text' ,name: 'hkjhkjkhj'},
   
  ];


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private widgetsServices: WidgetsServicesService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }




  ngOnInit() {
    this.showSlides(this.slideIndex);
    this.getCountAndSum();
    this.getStarFundrisingOfficerOfTheMonth();
    this.getStarTeamOfTheMonth();
    this.getDonationCountAndAmountGroupByName("TODAY");
    this.getDonationPaymentModeCountAndAmountGroupByName("TODAY");
    // this.setData();
    this.checkRoleType();
    this.showNotification();

    const currentDate = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.currentMonthName = months[currentDate.getMonth()];

    const currentMonthIndex = currentDate.getMonth();

    // Calculate the previous month index
const previousMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;

// Get the previous month name
this.previousMonthName = months[previousMonthIndex];



    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawPieHoleChart.bind(this));

    // google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  plusSlides(n: number) {
    this.slideIndex += n;
    this.showSlides(this.slideIndex);
  }

  currentSlide(n: number) {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);
  }

  showSlides(n: number) {
    if (n > this.slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = this.slides.length; }
  }


  drawPieHoleChart() {
    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 8],
      ['Eat', 2],
      ['TV', 4],
      ['Gym', 2],
      ['Sleep', 8]
    ]);

    const options = {
      title: 'My Average Day',
      width: 550,
      height: 400,
      pieHole: 0.4,
      is3D: true,
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable(
      [
    ['Payment mode', 'Count', 'Amount'], // Add column headers if necessary
    ...this.PaymentModeCountAmount
    ]
    
    );

    var options = {
      title: 'Payment Mode Graph',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

  checkRoleType(){
    console.log("user role : "+this.loginUser['roleType'])
    if(this.loginUser['roleType'] == Constant.mainAdmin){
      this.isMainAdmin = true;
    }else if(this.loginUser['roleType'] == Constant.superAdmin){
      this.isSuperadmin = true;
    }else if(this.loginUser['roleType'] == Constant.admin){
      this.isAdmin = true;
    }else if(this.loginUser['roleType'] == Constant.teamLeader){
      this.isTeamLeader = true;
    }
  }

  showNotification() {
    this.validityExpireOn = new Date(this.loginUser['validityExpireOn']);
    const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

    // Calculate the difference in days
    const diffInMs = this.validityExpireOn.getTime() - new Date().getTime();
    this.diffInDays = Math.floor(diffInMs / msInDay);

    return this.diffInDays;
  }

  openDetails(tabName: string) {
    this.getDonationCountAndAmountGroupByName(tabName);
    this.activeTab = tabName;
  }

  isTabActive(tabName: string): boolean {
    return this.activeTab === tabName;
  }


  openPaymentDetails(tabName: string) {
    this.getDonationPaymentModeCountAndAmountGroupByName(tabName);
    this.paymentActiveTab = tabName;
  }

  isPaymentTabActive(tabName: string): boolean {
    return this.paymentActiveTab === tabName;
  }



  getCountAndSum() {
    this.widgetsServices.getCountAndSum()
      .subscribe({
        next: (response: any) => {
          console.log("Response : "+response['payload']['todaysCount'])
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
               
              this.activeUserCount = response['payload']['activeUserCount'];
              this.inactiveUserCount = response['payload']['inactiveUserCount'];
              this.todaysCount = response['payload']['todaysCount'];
              this.todaysAmount = response['payload']['todaysAmount'];
              this.yesterdayCount = response['payload']['yesterdayCount'];
              this.yesterdayAmount = response['payload']['yesterdayAmount'];
              this.monthCount = response['payload']['monthCount'];
              this.monthAmount = response['payload']['monthAmount'];
            } else {
            }
          } else {
            this.toastr.error(response['responseMessage'], response['responseCode']);
          }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  getStarFundrisingOfficerOfTheMonth() {
    this.widgetsServices.getStarFundrisingOfficerOfTheMonth()
      .subscribe({
        next: (response: any) => {
            if (response['responseCode'] == '200') {
              let star = response['listPayload'];
              for(var i=0; i< star.length; i++){
                this.star = star;
              }
              this.starfundrisingofficer = this.star[0][0];              
            } 
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  getStarTeamOfTheMonth() {
    this.widgetsServices.getStarTeamOfTheMonth()
      .subscribe({
        next: (response: any) => {
            if (response['responseCode'] == '200') {
              let star = response['listPayload'];
              for(var i=0; i< star.length; i++){
                this.star = star;
              }
              this.starTeam = this.star[0][0];              
            } 
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  getDonationCountAndAmountGroupByName(tabName: string) {
    this.FRToday= null;
    this.widgetsServices.getDonationCountAndAmountGroupByName(tabName)
      .subscribe({
        next: (response: any) => {
            if (response['responseCode'] == '200') {
              let frtoday = response['listPayload'];
              for(var i=0; i< frtoday.length; i++){
                this.FRToday = frtoday;
              }
              // this.drawChart();
            } else {
              // this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
            }
          // } else {
          //   this.toastr.error(response['responseMessage'], response['responseCode']);
          // }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }

  getDonationPaymentModeCountAndAmountGroupByName(tabName: string) {
    this.PaymentModeCountAmount = null;
    this.widgetsServices.getDonationPaymentModeCountAndAmountGroupByName(tabName)
      .subscribe({
        next: (response: any) => {
            if (response['responseCode'] == '200') {
              let paymentDetails = response['listPayload'];
              for(var i=0; i< paymentDetails.length; i++){
                this.PaymentModeCountAmount = paymentDetails;
              }

              this.drawChart();

            } else {
              // this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
            }
          // } else {
          //   this.toastr.error(response['responseMessage'], response['responseCode']);
          // }
        },
        error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }

  // setData() {
  //   for (let idx = 0; idx < 4; idx++) {
  //     this.data[idx] = {
  //       labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
  //       datasets: this.datasets[idx]
  //     };
  //   }
  //   this.setOptions();
  // }

  // setOptions() {
  //   for (let idx = 0; idx < 4; idx++) {
  //     const options = JSON.parse(JSON.stringify(this.optionsDefault));
  //     switch (idx) {
  //       case 0: {
  //         this.options.push(options);
  //         break;
  //       }
  //       case 1: {
  //         options.scales.y.min = -9;
  //         options.scales.y.max = 39;
  //         this.options.push(options);
  //         break;
  //       }
  //       case 2: {
  //         options.scales.x = { display: false };
  //         options.scales.y = { display: false };
  //         options.elements.line.borderWidth = 2;
  //         options.elements.point.radius = 0;
  //         this.options.push(options);
  //         break;
  //       }
  //       case 3: {
  //         options.scales.x.grid = { display: false, drawTicks: false };
  //         options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
  //         options.scales.y.min = undefined;
  //         options.scales.y.max = undefined;
  //         options.elements = {};
  //         this.options.push(options);
  //         break;
  //       }
  //     }
  //   }
  // }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };

      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);

      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }



 
 

  
}
