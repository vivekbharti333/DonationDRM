export interface ApplicationManagement {
}

export class ApplicationRequest {
    payload: {
        id?: Number;
        ipAddress?: String;
        loginPageLogo?: String;
        loginPageWallpaper?: String;
        displayLogo?: String;
        displayName?: String;
        emailId?: String;
        website?: String;
        roleType?: String
        phoneNumber?: String;
        token?: String;
        createdBy?: String;
        superadminId?: String;
        requestedFor?: String;
        requestFor?: String;
        respCode?: Number;
        respMesg?: string;
    }
    responseCode?: String;
}

export class ApplicationDetails{
    id?: Number;
    ipAddress?: String;
    loginPageLogo?: String;
    loginPageWallpaper?: String;
    displayLogo?: String;
    displayName?: String;
    emailId?: String;
    website?: String;
    phoneNumber?: String;
    superadminId?: String;
    requestedFor?: String;
    requestFor?: String;
}

