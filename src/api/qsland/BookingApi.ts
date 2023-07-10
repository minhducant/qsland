import { client } from "@api/client";
import { convertArrayField, extraArrayJson, extraObjectJson, extraParams } from "./index";
import { AppApiTypeRequest } from "./TypeRequest";
import { AppURL } from "./url";
import { HandlerResponse } from "./utils";

export class BookingApi {
    static async getListCart(params: AppApiTypeRequest.getListCart) {
        return new HandlerResponse(await client.get(AppURL.Booking.getListCartV3 + extraParams(params)))._response()
    }
    static async getDetailCart(params: AppApiTypeRequest.getDetailCart) {
        return new HandlerResponse(await client.get(AppURL.Booking.getDetailCart + extraParams(params)))._response()
    }
}

