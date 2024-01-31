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

  public FRToday: any;
  public PaymentModeCountAmount: any;
  // public FRcount: any;
  // public FRAmount: any;

  activeTab: string = 'TODAY';
  paymentActiveTab: string = 'TODAY';
  

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private widgetsServices: WidgetsServicesService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginUser = this.authenticationService.getLoginUser();
  }

  // data: any[] = [];
  // options: any[] = [];
  // labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  //   'January',
  //   'February',
  //   'March',
  //   'April'
  // ];
  // datasets = [
  //   [{
  //     label: 'My First dataset',
  //     backgroundColor: 'transparent',
  //     borderColor: 'rgba(255,255,255,.55)',
  //     pointBackgroundColor: getStyle('--cui-primary'),
  //     pointHoverBorderColor: getStyle('--cui-primary'),
  //     data: [65, 59, 84, 84, 51, 55, 40]
  //   }], [{
  //     label: 'My Second dataset',
  //     backgroundColor: 'transparent',
  //     borderColor: 'rgba(255,255,255,.55)',
  //     pointBackgroundColor: getStyle('--cui-info'),
  //     pointHoverBorderColor: getStyle('--cui-info'),
  //     data: [1, 18, 9, 17, 34, 22, 11]
  //   }], [{
  //     label: 'My Third dataset',
  //     backgroundColor: 'rgba(255,255,255,.2)',
  //     borderColor: 'rgba(255,255,255,.55)',
  //     pointBackgroundColor: getStyle('--cui-warning'),
  //     pointHoverBorderColor: getStyle('--cui-warning'),
  //     data: [78, 81, 80, 45, 34, 12, 40],
  //     fill: true
  //   }], [{
  //     label: 'My Fourth dataset',
  //     backgroundColor: 'rgba(255,255,255,.2)',
  //     borderColor: 'rgba(255,255,255,.55)',
  //     data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
  //     barPercentage: 0.7
  //   }]
  // ];
  // optionsDefault = {
  //   plugins: {
  //     legend: {
  //       display: false
  //     }
  //   },
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //         drawBorder: false
  //       },
  //       ticks: {
  //         display: false
  //       }
  //     },
  //     y: {
  //       min: 30,
  //       max: 89,
  //       display: false,
  //       grid: {
  //         display: false
  //       },
  //       ticks: {
  //         display: false
  //       }
  //     }
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 1,
  //       tension: 0.4
  //     },
  //     point: {
  //       radius: 4,
  //       hitRadius: 10,
  //       hoverRadius: 4
  //     }
  //   }
  // };

  ngOnInit() {
    this.getCountAndSum();
    this.getDonationCountAndAmountGroupByName("TODAY");
    this.getDonationPaymentModeCountAndAmountGroupByName("TODAY");
    // this.setData();
    this.checkRoleType();

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
    google.charts.setOnLoadCallback(this.drawPieHoleChart.bind(this));

  }

  drawPieHoleChart() {
    //  const dataArray = [['Name', 'Count', 'Amount']];
  
    // for (var i = 0; i < this.FRToday.length; i++) {
    //   // Add data for each item to the dataArray
    //   dataArray.push([this.FRToday[i][0], this.FRToday[i][2]]);
    // }
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
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  drawChart() {
    // Create an array to store data for all items
    const dataArray = [['Name', 'Count', 'Amount']];
  
    for (var i = 0; i < this.FRToday.length; i++) {
      // Add data for each item to the dataArray
      dataArray.push([this.FRToday[i][0], this.FRToday[i][2]]);
    }
  
    // Create a DataTable using the dataArray
    var data = google.visualization.arrayToDataTable(dataArray);
  

  // drawChart() {
  //   for(var i=0; i< this.FRToday.length; i++){
  //     this.FRToday = this.FRToday;
  //    console.log(" juhh "+ this.FRToday[i][0],this.FRToday[i][1],this.FRToday[i][2] )
   

  //   var data = google.visualization.arrayToDataTable([
      
  //     ['Name', 'Count', 'Amount'],
  //     [this.FRToday[i][0],this.FRToday[i][1],this.FRToday[i][2]],
  //     // ['2004',  100000,      400],
  //     // ['2005',  1170,      460],
  //     // ['2006',  6660,       1120],
  //     // ['2007',  1030,      540],
  //     // ['2008',  660,       1120],
  //     // ['2009',  1030,      540],
  //     // ['2010',  660,       1120],
  //     // ['2011',  1030,      540],
  //     // ['2012',  1000,      400],
  //     // ['2013',  1170,      460],
  //     // ['2014',  660,       1120],
  //     // ['2015',  1030,      540],
  //     // ['2016',  660,       1120],
  //     // ['2017',  1030,      540],
  //     // ['2018',  660,       1120],
  //     // ['2019',  1030,      540]
  //   ]);
  // }


    const options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

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
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
