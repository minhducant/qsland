import { client } from "@api/client";
import { convertArrayField, extraArrayJson, extraBodyMedia, extraObjectJson, extraParams, headersPost } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";
import { HandlerResponse } from "./utils";

export class NewsApi {
    static async getListNews(params: AppApiTypeRequest.getListNews) {
        return new HandlerResponse(await client.get(AppURL.News.getListNews + extraParams(params)))._response()
    }
    static async countNews(params: AppApiTypeRequest.countNews) {
        return new HandlerResponse(await client.get(AppURL.News.countNews + extraParams(params)))._response()
    }
    static async getDetailNews(params: AppApiTypeRequest.getDetailNews) {
        return new HandlerResponse(await client.get(AppURL.News.getDetailNews + extraParams(params)))._response()
    }
    static async getListComment(params: AppApiTypeRequest.getListComment) {
        return new HandlerResponse(await client.get(AppURL.News.getListComment + extraParams(params)))._response()
    }
    static async addComment({ image, video, ...params }: AppApiTypeRequest.addComment) {
        await client.post(AppURL.News.addComment, extraBodyMedia(params, { image, video }), headersPost.formData)
    }
    static async deleteComment(params: AppApiTypeRequest.deleteComment) {
        return new HandlerResponse(await client.get(AppURL.News.deleteComment + extraParams(params)))._response()
    }
    static async addVote(params: AppApiTypeRequest.addVote) {
        return new HandlerResponse(await client.get(AppURL.News.addVote + extraParams(params)))._response()
    }
    static async updateVote(params: AppApiTypeRequest.updateVote) {
        return new HandlerResponse(await client.get(AppURL.News.updateVote + extraParams(params)))._response()
    }
    static async deleteVote(params: AppApiTypeRequest.deleteVote) {
        return new HandlerResponse(await client.get(AppURL.News.deleteVote + extraParams(params)))._response()
    }
}

