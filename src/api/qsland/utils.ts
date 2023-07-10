import { extraArrayJson, extraObjectJson } from './index'
export class HandlerResponse {
    client: any
    constructor(client: any) {
        this.client = client
    }
    _extraArrayJson(keys: string[]) {
        return {
            ...this.client,
            data: extraArrayJson(this.client?.data, keys),
        };
    }
    _extraObjectJson(keys: string[]) {
        return {
            ...this.client,
            data: extraObjectJson(this.client?.data, keys),
        };
    }
    _response() {
        return this.client
    }
}