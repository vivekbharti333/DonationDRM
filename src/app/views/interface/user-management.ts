export interface UserManagement {
}

export interface LoginDetails {
    id?:Number;
    userId?:String;
    loginId?: String;
    fullName?:String;
    mobileNo?: String;
    email: String;
    password: String;
    token?: String;
    tokenExp?: String;
    role: String;
    userRole?:String;
  }


export class UserDetailsRequest {
    payload: {
        id?: Number;
        token?: String;
        loginId?: String;
        password?: String;
        fullName?: String;
        emailId?: String;
        firstName?: String;
        lastName?: String;
        roleType?: String;
        mobileNo?: String;
        alternateMobile?: String;
        superadminId?: String;
        requestedFor?: String;
        searchParam?: String;
        respCode?: string;
        respMesg?: string;
        createdBy?: String;
    }
    responseCode?: String;
}

export class UserDetails {
    id?: Number;
    sessionId?: String;
    loginId?: String;
    password?: String;
    firstName?: String;
    lastName?: String;
    roleType?: String;
    mobileNo?: String;
    alternateMobile?: String;
    emailId?: String;
    superadminId?: String;
    offset?: Number;
    limit?: Number;
    responseCode?: String;
}
