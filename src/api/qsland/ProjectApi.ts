import { client } from "@api/client";
import { convertArrayField, extraArrayJson, extraObjectJson, extraParams } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";
import { HandlerResponse } from "./utils";

export class ProjectApi {
    static async getDetailCategories(params: AppApiTypeRequest.getDetailCategories) {
        return new HandlerResponse(await client.get(AppURL.Project.getDetailCategories + extraParams(params)))._extraObjectJson(['images'])
    }
    static async getListCampaignProject(params: AppApiTypeRequest.getListCampaignProject) {
        return new HandlerResponse(await client.get(AppURL.Project.getListCampaignProject + extraParams(params)))._response()
    }
    static async getDetailCampaignSale(params: AppApiTypeRequest.getDetailCampaignSale) {
        return new HandlerResponse(await client.get(AppURL.Project.getDetailCampaignSale + extraParams(params)))._response()
    }
    static async countCampaignSale(params: AppApiTypeRequest.countCampaignSale) {
        return new HandlerResponse(await client.get(AppURL.Project.countCampaignSale + extraParams(params)))._response()
    }
    static async getListBuilding(params: AppApiTypeRequest.getListBuilding) {
        return new HandlerResponse(await client.get(AppURL.Project.getListBuilding + extraParams(params)))._response()
    }
    static async getListProduct(params: AppApiTypeRequest.getListProduct) {
        return new HandlerResponse(await client.get(AppURL.Project.getListProduct + extraParams(params)))._response()
    }
    static async getListApartment(params: AppApiTypeRequest.getListApartment) {
        return new HandlerResponse(await client.get(AppURL.Project.getListApartment + extraParams(params)))._response()
    }
    static async getDetailProduct(params: AppApiTypeRequest.getDetailProduct) {
        return new HandlerResponse(await client.get(AppURL.Project.getDetailProduct + extraParams(params)))._response()
    }
}

