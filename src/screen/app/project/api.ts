import moment from "moment"

export const checkStatusCampaign = (start: string, end: string) => {
    let start_time = new Date(moment(start).format('YYYY/MM/DD 00:00:00')).getTime()
    let end_time = new Date(moment(end).format('YYYY/MM/DD 23:59:59')).getTime()
    let current_time = new Date().getTime()
    if (current_time < start_time || current_time > end_time) return false
    return true
}