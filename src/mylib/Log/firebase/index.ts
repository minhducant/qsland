export class LogFireBase {

    static active = false
    static setActive(e: boolean) {
        this.active = e
    }
    static pushToken(token: number) {
        api(token)
    }
    static LogAction(action: string = "debug", message: string) {
        api(action, message)
    }
    static LogApi(api_name: string = "api-name", message: string) {
        api(api_name, message)
    }
}
export const api = (...arg: any[]) => { }