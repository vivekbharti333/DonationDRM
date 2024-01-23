import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDetails, UserDetailsRequest } from '../interface/user-management';
import { Constant } from '../services/constants';

@Injectable({
  providedIn: 'root'
})
export class PagesServicesService {

  constructor(
    private http:HttpClient,
  ) { }

  checkCredential(userDetails: UserDetails): Observable<UserDetailsRequest> {
    let request: UserDetailsRequest = {
      payload: {
        loginId: userDetails.loginId,
        password: userDetails.password,
      }
    };
    return this.http.post<UserDetailsRequest>(Constant.Site_Url+"doLogin",request);
  }
}
