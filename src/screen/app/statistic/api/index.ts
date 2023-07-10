import { Log } from "@utils/Log"
import moment from "moment"
import { isObject } from 'underscore';

const getStartWeek = (time: string) => {
    const currentDate = new Date(time)
    let date = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1),
    )
    return moment(date)
}
const getEndWeek = (time: string) => {
    const currentDate = new Date(time)
    var firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    let date = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + 6);
    return moment(date)
}
const getNumberWeek = (start: string, end: string) => {
    var oneWeek = 7 * 24 * 60 * 60 * 1000;
    const time_start = new Date(start).getTime()
    const time_end = new Date(end).getTime()
    Log.d(123, { time_end, time_start, start, end })
    var numberOfWeeks = ((time_end - time_start) / oneWeek).toFixed(4)
    return Number(Number(numberOfWeeks).toFixed(0))
}
const getFirstDayByMonth = (time: string) => {
    var currentDate = new Date(time);
    currentDate.setDate(1);
    var firstDayOfMonth = currentDate;
    return moment(firstDayOfMonth)
}
const getEndDayByMonth = (time: string) => {
    var currentDate = new Date(time);
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(0);
    var lastDayOfMonth = currentDate;
    return moment(lastDayOfMonth)
}
export const getLabelWeekMonth = (timeCurrent: string) => {
    Log.d('timeCurrent', timeCurrent)
    const start_month = getFirstDayByMonth(timeCurrent).format()
    const end_month = getEndDayByMonth(timeCurrent).format()
    const start_month_week = getStartWeek(start_month).format('YYYY/MM/DD 00:00:00')
    const end_month_week = getEndWeek(end_month).format('YYYY/MM/DD 23:59:59')
    Log.d(111, { start_month_week, end_month_week })
    const numberWeek = getNumberWeek(start_month_week, end_month_week)
    Log.d(222, { numberWeek })
    return [...new Array(numberWeek)].map((i, j) => `Tuẩn ${j + 1}`)

}
export const getLabelByParams = (params: any) => {
    if (isObject(params)) {
        const { month, year } = params
        if (month && year) {
            Log.d('getLabelByParams', { month, year })
            let date = new Date(year, Number(month) - 1)
            Log.d('getLabelByParams2', { date, date1: moment(date).format('YYYY/MM/DD') })
            return getLabelWeekMonth(moment(date).format())
        }
    }
    return []
}