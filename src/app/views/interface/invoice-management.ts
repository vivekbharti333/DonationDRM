import { ArrayType } from "@angular/compiler";
import { ListFormat } from "typescript/lib/tsserverlibrary";

export interface InvoiceManagement {
}

export class InvoiceRequest {
    payload: {
        id?: Number;
        invoiceNo?: String;
        customerId?: String;
        totalItem?: number;
        totalAmount?: number;
        itemName?: String;
        hsnCode?: String;
        rate?: number;
        quantity?: number;
        amount?: number;
        itemDetails?: Array<InvoiceDetails>;

        token?: String;
        requestFor?: String;
        superadminId?: String;
        createdBy?: String;

        respCode?: string;
        respMesg?: string;

    }
    responseCode?: String;
}

export class InvoiceDetails {
    customerId?: String;
    totalItem?: number;
    totalAmount?: number;
    itemName?: String;
    hsnCode?: String;
    rate?: number;
    quantity?: number;
    amount?: number;
    itemDetails?: Array<InvoiceDetails>;

    token?: String;
    requestFor?: String;
    superadminId?: String;
    createdBy?: String;
}
