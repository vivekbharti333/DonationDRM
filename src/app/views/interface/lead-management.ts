export interface LeadManagement {
}

export class LeadDetailsRequest {
    payload: {
        id?: Number;
        sessionId?: String;
        enquiryFor?: String;
        enquirySource?: String;
        businessType?: String;
        customerFirstName?: String;
        customerLastName?: String;
        customerMobile?: String;
        customerAlternateMobile?: String;
        customerEmailId?: String;
        customerCity?: String;
        status?: String;
        notes?: String;
        createdBy?: String;
        superadminId?: String;
        respCode?: string;
        respMesg?: string;
    }
    responseCode?: String;
}

export class LeadDetails {
    id?: Number;
    sessionId?: String;
    enquiryFor?: String;
    enquirySource?: String;
    businessType?: String;
    customerFirstName?: String;
    customerLastName?: String;
    customerMobile?: String;
    customerAlternateMobile?: String;
    customerEmailId?: String;
    customerCity?: String;
    status?: String;
    notes?: String;
    createdBy?: String;
    superadminId?: String;  
}