import { client } from "@api/client";
import { convertArrayField, extraArrayJson, extraBodyMedia, extraObjectJson, extraParams, headersPost } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";

export class CommonApi {
    static async getListNotify(params: AppApiTypeRequest.getListNotify) {
        return client.get(AppURL.Notify.getListNotify + extraParams(params));

    }
    static async getCountNotify(params: AppApiTypeRequest.getCountNotify) {
        return await client.get(AppURL.Notify.getCountNotify + extraParams(params));

    }
    static async readNotifyItem(params: AppApiTypeRequest.readNotifyItem) {
        return await client.get(AppURL.Notify.readNotifyItem + extraParams(params));
    }
    static async updateUserInfo({ image, ...params }: AppApiTypeRequest.updateUserInfo) {
        return await client.post(AppURL.User.updateUserInfo, extraBodyMedia(params, { image }), headersPost.formData);
    }
}