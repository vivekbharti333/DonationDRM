export interface DonationManagement {
}

export class DonationDetailsRequest {
    payload: {
        receiptNumber?: String;
        id?: Number;
        status?: String;
        token?: String;
        donorName?: String;
        mobileNumber?: String;
        emailId?: String;
        address?: String;
        searchParam?: String;
        panNumber?: String;
        amount?: Number;
        transactionId?: String;
        paymentMode?: String;
        paymentType?: String;
        notes?: String;
        programName?: String;
        firstDate?: any,
        lastDate?: any,
        roleType?: String;
        createdBy?: String;
        loginId?: String;
        invoiceHeaderDetailsId?: String;
        superadminId?: String;
        requestedFor?: String;
        requestFor?: String;
        respCode?: Number;
        respMesg?: string;
    }
    responseCode?: String;
}

export class DonationDetails {
    id?: Number;
    sessionId?: String;
    donorName?: String;
    mobileNumber?: String;
    emailId?: String;
    address?: String;
    panNumber?: String;
    amount?: Number;
    transactionId?: String;
    paymentMode?: String;
    paymentType?: String;
    notes?: String;
    programName?: String;
    createdBy?: String;
    loginId?: String;
    superadminId?: String;
    invoiceHeaderDetailsId?: String;

}
