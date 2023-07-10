import { client } from "@api/client";
import { convertArrayField, extraArrayJson, extraObjectJson, extraParams } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";

export class DenyAdminApi {
    static async getListAdDenyWait(params: AppApiTypeRequest.getListAdDenyWait) {
        let res = await client.get(AppURL.Admin.getListDenyAdmin + extraParams(params));
        return {
            ...res,
            data: extraArrayJson(res.data, ['images']),
        };
    }
    static async getListAdDenyDone(params: AppApiTypeRequest.getListAdDenyDone) {
        let res = await client.get(AppURL.Admin.getListDenyAdmin + extraParams(params));
        return {
            ...res,
            data: extraArrayJson(res.data, ['images']),
        };
    }
    static async getListAdDenyNone(params: AppApiTypeRequest.getListAdDenyNone) {
        let res = await client.get(AppURL.Admin.getListDenyAdmin + extraParams(params));
        return {
            ...res,
            data: extraArrayJson(res.data, ['images']),
        };
    }
    static async getCountAdDenyWait(params: AppApiTypeRequest.getCountAdDenyWait) {
        let res = await client.get(AppURL.Admin.getCountDenyAdmin + extraParams(params));
        return { ...res, data: { count: res.data ?? 0 } };
    }
    static async getCountAdDenyDone(params: AppApiTypeRequest.getCountAdDenyDone) {
        let res = await client.get(AppURL.Admin.getCountDenyAdmin + extraParams(params));
        return { ...res, data: { count: res.data ?? 0 } };
    }
    static async getCountAdDenyNone(params: AppApiTypeRequest.getCountAdDenyNone) {
        let res = await client.get(AppURL.Admin.getCountDenyAdmin + extraParams(params));
        return { ...res, data: { count: res.data ?? 0 } };
    }
    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    static async getDetailDenyAdmin(params: AppApiTypeRequest.getDetailDenyAdmin) {
        let res = await client.get(AppURL.Admin.getDetailDenyAdmin + extraParams(params));
        return {
            ...res,
            data: extraObjectJson(res.data, ['images']),
        };
    }
    static async addDenyAdmin(params: AppApiTypeRequest.addDenyAdmin) {
        return client.post(AppURL.Admin.addDenyAdmin, params);
    }
    /**
     * 
     * 
     * 
     */
    static async getListStaff(params: AppApiTypeRequest.getListStaff) {
        return client.get(AppURL.Admin.getListStaff + extraParams(params));
    }
    static async getListExchange(params = {}) {
        return client.get(AppURL.Admin.getListExchange + extraParams(params));
    }
    static async getListCategories(params: AppApiTypeRequest.getListCategories) {
        let res = await client.get(AppURL.Admin.getListCategories + extraParams({ ...params, cb_level: 1, cb_status: 1 }));
        return {
            ...res,
            data: convertArrayField(res.data, { cb_title: 'name' }),
        };
    }
    static async getListBuilding(params: AppApiTypeRequest.getListCategories) {
        let res = await client.get(AppURL.Admin.getListCategories + extraParams({ ...params, cb_level: 2, cb_status: 1 }));
        return {
            ...res,
            data: convertArrayField(res.data, { cb_title: 'name' }),
        };
    }
}