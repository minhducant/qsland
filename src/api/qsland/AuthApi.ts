import { client } from "@api/client";
import { extraParams, AppResponse } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";
export class AuthApi {
    static async getInfo(params: AppApiTypeRequest.getInfo) {
        return new AppResponse(await client.get(AppURL.Auth.get, params));
    }
    static async login(params: AppApiTypeRequest.login) {
        return new AppResponse(await client.post(AppURL.Auth.login, params));
    }
    static async forgot(params: AppApiTypeRequest.forgot) {
        return new AppResponse(
            await client.post(AppURL.Auth.forgetAccount, params),
        );
    }
    static async sendOtp(params: AppApiTypeRequest.sendOtp) {
        return new AppResponse(
            await client.post(AppURL.Auth.verifyAccount, params),
        );
    }
    static async resetPassword(params: AppApiTypeRequest.resetPassword) {
        return new AppResponse(await client.post(AppURL.Auth.setPword, params));
    }
    static async changePassword(params: AppApiTypeRequest.changePassword) {
        return new AppResponse(await client.post(AppURL.Auth.changePword, params));
    }
    static async addFirebaseTokenPush(params: AppApiTypeRequest.addFirebaseTokenPush) {
        return await client.post(AppURL.Auth.addFirebaseTokenPush, params)
    }

}