import { client } from "@api/client";
import { Log } from "@utils/Log";
import { convertArrayField, extraArrayJson, extraObjectJson, extraParams } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";

export class StaticApi {
    static async getStaticCusStatus(params: AppApiTypeRequest.getDetailCustomerStatus) {
        return client.get(AppURL.Static.getDetailCustomerStatus + extraParams(params));
    }
    static async countAllottedCustomersOfSale(params: AppApiTypeRequest.countAllottedCustomersOfSale) {
        return client.get(AppURL.Static.countAllottedCustomersOfSale + extraParams(params));
    }
    static async countCustomersAllocatedByMonth(params: AppApiTypeRequest.countCustomersAllocatedByMonth) {
        let res = await  client.get(AppURL.Static.countCustomersAllocatedByMonth + extraParams(params));
        return { ...res, data: res.data?.data ?? [] }
    }
    static async countCustomerOverviewOfLead(params: AppApiTypeRequest.countCustomerOverviewOfLead) {
        return client.get(AppURL.Static.countCustomerOverviewOfLead + extraParams(params));

    }
    static async countCustomerOverviewOfManager(params: AppApiTypeRequest.countCustomerOverviewOfManager) {
        let res = await client.get(AppURL.Static.countCustomerOverviewOfManager + extraParams(params));
        return { ...res, data: res?.data ?? [] }
    }
    static async getListPermission(params: AppApiTypeRequest.getListPermission) {
        return client.get(AppURL.Static.getListPermission + extraParams(params));
    }
}