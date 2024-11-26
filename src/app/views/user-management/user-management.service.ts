import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Constant } from '../services/constants';
import { UserDetails, UserDetailsRequest } from '../interface/user-management';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

 public loginId: any;
 public superadminId: any;
 public loginUser: any;

 constructor(
  private http: HttpClient,
  private authenticationService: AuthenticationService,
) {
  this.loginUser = this.authenticationService.getLoginUser();
}


updateUserSubscription(user: any): Observable<UserDetailsRequest> {
  let request: any = {
    payload: {
      loginId:user.loginId,
    }
  };
  return  this.http.post<any>(Constant.Site_Url+"updateUserSubscription",request);
}


removeUserParmanent(loginId: any): Observable<UserDetailsRequest> {
  let request: any = {
    payload: {
      loginId:loginId,
      token: this.loginUser['token'],
      createdBy: this.loginUser['loginId'],
      superadminId: this.loginUser['superadminId'],
    }
  };
  return  this.http.post<any>(Constant.Site_Url+"removeUserParmanent",request);
}

  saveUserDetails(userDetails: any): Observable<UserDetailsRequest> {
    this.loginId = localStorage.getItem('loginId');
    this.superadminId = localStorage.getItem('superadminId');

    console.log("1 : "+userDetails.createdBy);
    var creatBy ="";
    if(userDetails.roleType === Constant.fundraisingOfficer){
      creatBy = userDetails.createdBy;
    }else {
      creatBy = this.loginUser['roleType'];
    }

    let request: any = {
      payload: {
        userPicture: userDetails.userPicture,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        roleType: userDetails.roleType,
        mobileNo: userDetails.mobileNo,
        alternateMobile: userDetails.alternateMobile,
        emailId: userDetails.emailId,
        service: userDetails.service,
        dob: userDetails.dob,
        addressList: userDetails.addressList,
        requestedFor: 'WEB',
        token: this.loginUser['token'],
        createdBy: creatBy,
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"userRegistration",request);
  }

  changeUserPassword(userDetails: any): Observable<UserDetailsRequest> {
    this.loginId = localStorage.getItem('loginId');
    this.superadminId = localStorage.getItem('superadminId');

    let request: any = {
      payload: {
        loginId: userDetails['loginId'],
        password: userDetails['password'],
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"changeUserPassword",request);
  }

  changeUserRole(userDetails: any): Observable<UserDetailsRequest> {
    let request: any = {
      payload: {
        loginId: userDetails['loginId'],
        roleType: userDetails['roleType'],
        token: this.loginUser['token'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"changeUserRole",request);
  }

  changeTeamLeader(userDetails: any): Observable<UserDetailsRequest> {
    let request: any = {
      payload: {
        loginId: userDetails['loginId'],
        teamLeaderId: userDetails['teamLeaderId'],
        token: this.loginUser['token'],
        // createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"changeTeamLeader",request);
  }


  changeUserStatus(userDetails: any): Observable<UserDetailsRequest> {
    this.loginId = localStorage.getItem('loginId');
    this.superadminId = localStorage.getItem('superadminId');

    let request: any = {
      payload: {
        loginId: userDetails['loginId'],
        status: userDetails['status'],
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"changeUserStatus",request);
  }

  updateUserDetails(userDetails: any): Observable<UserDetailsRequest> {
   
    let request: any = {
      payload: {
        loginId: userDetails.loginId,
        userPicture: userDetails.userPicture,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        roleType: userDetails.roleType,
        mobileNo: userDetails.mobileNo,
        alternateMobile: userDetails.alternateMobile,
        emailId: userDetails.emailId,
        dob: userDetails.dob,
        addressList: userDetails.addressList,
        requestedFor: 'WEB',
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"updateUserDetails",request);
  }

  getUserDetailsList(): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        requestedFor: 'ALL',
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url + "getUserDetails", request);
  }

  
  getUserDetailsBySearch(param: any): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        requestedFor: 'SEARCH',
        searchParam: param.searchKey,
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url + "getUserDetails", request);
  }

  getUserDetailsListBySelectingTeamLeader(teamLeader:any): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        requestedFor: 'ALL',
        roleType: "TEAM_LEADER",
        token: this.loginUser['token'],
        createdBy: teamLeader.teamLeaderId,
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url + "getUserDetails", request);
  }

  getTeamleaderList(): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        roleType: Constant.teamLeader,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url + "getUserListForDropDown", request);
  }


  getFundrisingOfficersList(): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        roleType: Constant.fundraisingOfficer,
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url + "getUserListForDropDown", request);
  }

  
  getAddressDetailsByUserId(user:any): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        requestedFor: 'ALL',
        id: user['id'],
        token: this.loginUser['token'],
        roleType: this.loginUser['roleType'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url + "getAddressDetails", request);
  }

}
