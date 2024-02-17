export interface EmailManagement {
}

export class EmailRequest {
    payload: {
        id?: Number;
        token?: String;
        emailType?: String;
        host?: String;
        port?: String;
        emailUserid?: String;
        emailPassword?: String;
        emailFrom?: String;
        subject?: String;
        emailBody?: String;
        superadminId?: String;
        requestedFor?: String;
        searchParam?: String;
        respCode?: string;
        respMesg?: string;
        createdBy?: String;
    }
    responseCode?: String;
}

export class EmailDetails {
    id?: Number;
    token?: String;
    emailType?: String;
    host?: String;
    port?: String;
    emailUserid?: String;
    emailPassword?: String;
    emailFrom?: String;
    subject?: String;
    emailBody?: String;
    superadminId?: String;
    requestedFor?: String;
    searchParam?: String;
    respCode?: string;
    respMesg?: string;
    createdBy?: String;
    responseCode?: String;
}

