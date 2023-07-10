import moment, { Moment } from 'moment';
import { isNumber, isString } from 'underscore';

export const checkEmpty = (data: any[], item: any, key = 'date_id') => {
  let find = data.find(i => i[key] == item[key]);
  return find ? false : true;
};
export const isEndDayMonth = (date: any) => {
  //kiem tra co phai la ngay cuoi cung cua thang ?
  let end = moment(date).endOf('month').format('DD');
  let day = moment(date).format('DD');
  // Log.d1('aa', { end, day, date })
  if (day == end) return true;
  else return false;
};
export function getDates(startDate: any, stopDate: any) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var endDate = moment(stopDate);
  while (currentDate <= endDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

export const FMTime = {
  full: (date: any) => {
    if (date) return moment(date).format('HH:mm:ss DD/MM/YYYY');
    return '';
  },
  day: (date: any) => {
    if (date) return moment(date).format('DD/MM/YYYY');
    return '';
  },
  post: (date: any) => {
    if (date) return moment(date).format('YYYY-MM-DD HH:mm:ss');
    return '';
  },
};
export const DateShow = (date: any, init?: string) => {
  if (date && date !== '0000-00-00 00:00:00')
    return moment(date).format('DD-MM-YYYY');
  if (init) return init;
  return null;
};
export const DatePost = (date: any, init?: any) => {
  if (date) return moment(date).format('YYYY-MM-DD HH:mm:ss');
  if (init) return init;
  return null;
};

export function calculateTimeDifference(
  createDate: string,
  ruleTime: number,
): number | null {
  const currentDateTime: Moment = moment();
  const calculatedTime: Moment = moment(createDate).add(ruleTime, 'minutes');
  const diffInSeconds: number = calculatedTime.diff(currentDateTime, 'seconds');
  if (diffInSeconds >= 0) {
    return diffInSeconds;
  } else {
    return null;
  }
}
export const AppDate = {
  format1: (date: any, init?: any) => {
    if (date) return moment(date).format('YYYY-MM-DD HH:mm:ss');
    if (init) return init;
    return null;
  },
  format2: (date: any, init?: string) => {
    if (date && date !== '0000-00-00 00:00:00')
      return moment(date).format('DD-MM-YYYY');
    if (init) return init;
    return null;
  },
  format3: (date: any, init?: string) => {
    if (date && date !== '0000-00-00 00:00:00')
      return moment(date).format('HH:mm DD/MM/YYYY');
    if (init) return init;
    return null;
  }
}
/** 2023-02-02 00:00:00==>>>  2023/02/02 00:00:00*/
export function convertDateApp(inputString: string) {
  if (!isString(inputString)) return null
  const [datePart, timePart] = inputString.split(' ');
  const [year, month, day] = datePart.split('-');
  const convertedString = `${year}/${month}/${day} ${timePart}`;
  return convertedString;
}
export function convertDateMoment(inputString: string) {
  if (!isString(inputString)) return moment()
  const [datePart, timePart] = inputString.split(' ');
  const [year, month, day] = datePart.split('-');
  const convertedString = `${year}/${month}/${day} ${timePart}`;
  return moment(new Date(convertedString));
}
export const formatTime = (time_second: number, f = [' s', `'`, ' h', ' ngày']) => {
  if (!isNumber(time_second)) return 0
  const m = 60
  const h = m * 60
  const d = h * 24
  if (time_second < m) return time_second + f[0]
  else if (time_second < h) return Math.floor(time_second / m) + f[1]
  else if (time_second < d) return Math.floor(time_second / h) + f[2]
  else return Math.floor(time_second / d) + f[3]
}