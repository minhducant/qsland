import { client } from "@api/client";
import {
    extraParams,
    extraArrayJson,
    extraObjectJson,
    extraBodyMedia, headersPost
} from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";

///
/**
 * 
 * ERROR AXIOS
 */
import { addCustomer, updateCustomer, sendExplanation } from '@api/addCustomer';
import { Log } from "@utils";

export class CustomerApi {
    static async getListCities(params: AppApiTypeRequest.getListCities) {
        return client.get(AppURL.Customer.getListCities + extraParams(params));
    }

    static async getDetailDistricts(
        params: AppApiTypeRequest.getDetailDistricts,
    ) {
        return client.get(AppURL.Customer.getDetailDistricts + extraParams(params));
    }
    static async getDetailWard(params: AppApiTypeRequest.getDetailWard) {
        return client.get(AppURL.Customer.getDetailWard + extraParams(params));
    }
    static async getListDistricts(params: AppApiTypeRequest.getListDistricts) {
        return client.get(AppURL.Customer.getListDistricts + extraParams(params));
    }
    static async getListWard(params: AppApiTypeRequest.getListWard) {
        return client.get(AppURL.Customer.getListWard + extraParams(params));
    }
    static async getListCustomer(params: AppApiTypeRequest.getListCustomer) {
        let res = await client.get(
            AppURL.Customer.getListCustomer + extraParams(params),
        );
        return {
            ...res,
            data: extraArrayJson(res.data, ['images']),
        };
    }
    static async getDetailCustomer(params: AppApiTypeRequest.getDetailCustomer) {
        let res = await client.get(
            AppURL.Customer.getDetailCustomer + extraParams(params),
        );
        return {
            ...res,
            data: extraObjectJson(res.data, ['images']),
        };
    }
    static async getCountCustomer(params: AppApiTypeRequest.getCountCustomer) {
        let res = await client.get(
            AppURL.Customer.getCountCustomer + extraParams(params),
        );
        return { ...res, data: { count: res.data ?? 0 } };
    }
    static async getListGroupCustomer(
        params: AppApiTypeRequest.getListGroupCustomer,
    ) {
        return client.get(AppURL.Customer.getListGroupCustomer + extraParams(params));
    }
    static async getListSource(params: AppApiTypeRequest.getListSource) {
        return client.get(AppURL.Customer.getListSource + extraParams(params));
    }
    static async getListGroupSale(params = {}) {
        return client.get(AppURL.Static.getListGroupSale + extraParams(params));
    }
    static async getListSaleCustomerCampaignHistory(
        params: AppApiTypeRequest.getListSaleCustomerCampaignHistory,
    ) {
        return client.get(
            AppURL.Customer.getListSaleCustomerCampaignHistory + extraParams(params),
        );
    }
    static async addSaleCustomerCampaignHistoryTakeCare(
        params: AppApiTypeRequest.addSaleCustomerCampaignHistoryTakeCare,
    ) {
        return client.post(
            AppURL.Customer.addSaleCustomerCampaignHistoryTakeCare,
            params,
        );
    }
    static async addCustomer({
        cmt_img_before,
        cmt_img_after,
        ...params
    }: AppApiTypeRequest.addCustomer) {
        return client.post(AppURL.Customer.addCustomer, extraBodyMedia(params, { cmt_img_before, cmt_img_after }), headersPost.formData);
    }
    static async updateCustomer({
        cmt_img_before,
        cmt_img_after,
        ...params
    }: AppApiTypeRequest.updateCustomer) {
        return client.post(AppURL.Customer.updateCustomer, extraBodyMedia(params, { cmt_img_before, cmt_img_after }), headersPost.formData);

    }
    static async getListDenyCustomer(params: AppApiTypeRequest.getListCustomer) {
        let res = await client.get(
            AppURL.Customer.getListDenyCustomer + extraParams(params),
        );
        return { ...res, data: extraArrayJson(res.data, ['images']), };
    }
    static async sendExplanation({
        image,
        ...params
    }: AppApiTypeRequest.sendExplanation) {
        return client.post(AppURL.Customer.sendExplanation, extraBodyMedia(params, { image }), headersPost.formData);
    }
    static async getListCampaign(params: AppApiTypeRequest.getListCampaign) {
        return client.get(AppURL.Customer.getListCampaign + extraParams(params));
    }
    static async getCountDenyCustomer(
        params: AppApiTypeRequest.getCountCustomer,
    ) {
        let res = await client.get(AppURL.Customer.getCountDenyCustomer + extraParams(params));
        return { ...res, data: { count: res.data ?? 0 } };
    }
    static async cancelExplanation(params: AppApiTypeRequest.cancelExplanation) {
        return client.post(AppURL.Customer.cancelExplanation, params);
    }
    static async getDetailDenyCustomer(params: AppApiTypeRequest.getDetailCustomer) {
        let res = await client.get(
            AppURL.Customer.getDetailDenyCustomer + extraParams(params),
        );
        return { ...res, data: extraObjectJson(res.data, ['images']), };
    }
}