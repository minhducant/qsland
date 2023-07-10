import { client } from "@api/client";
import { convertArrayField, extraArrayJson, extraBodyMedia, extraObjectJson, extraParams, headersPost } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";
import { HandlerResponse } from "./utils";

export class TransactionApi {
    static async getListLookBookApart(params: AppApiTypeRequest.getListLookBookApart) {
        return new HandlerResponse(await client.get(AppURL.Transaction.getListLookBookApart + extraParams(params)))._response()
    }
    static async getListSalePolicy(params: AppApiTypeRequest.getListSalePolicy) {
        return new HandlerResponse(await client.get(AppURL.Transaction.getListSalePolicy + extraParams(params)))._response()
    }
    static async getDetailSalePolicy(params: AppApiTypeRequest.getDetailSalePolicy) {
        return new HandlerResponse(await client.get(AppURL.Transaction.getDetailSalePolicy + extraParams(params)))._response()
    }
    static async addBookApartment(params: AppApiTypeRequest.addBookApartment) {
        return client.post(AppURL.Transaction.addBookApartment, params);
    }
    static async addPaymentHistory({ file, ...params }: AppApiTypeRequest.addPaymentHistory) {
        return client.post(AppURL.Transaction.addPaymentHistory, extraBodyMedia(params, { file }), headersPost.formData);
    }
    static async getDetailBill(params: AppApiTypeRequest.getDetailBill) {
        return new HandlerResponse(await client.get(AppURL.Transaction.getDetailBill + extraParams(params)))._response()
    }
    static async xacNhanHopDongTuVan(params: AppApiTypeRequest.xacNhanHopDongTuVan) {
        return new HandlerResponse(await client.post(AppURL.Transaction.xacNhanHopDongTuVan, params))._response()
    }
}

