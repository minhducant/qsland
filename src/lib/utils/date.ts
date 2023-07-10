import moment from "moment"

export const DateShow = (date: any, init?: string) => {
  if (date)
    return moment(date).format("DD-MM-YYYY")
  if (init) return init
  return null
}
export const DatePost = (date: any, init?: any) => {
  if (date)
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  if (init) return init
  return null
}
export const DatePostStart = (date: any, init?: any) => {
  if (date)
    return moment(date).format("YYYY-MM-DD 00:00:00")
  if (init) return init
  return null
}
export const DatePostEnd = (date: any, init?: any) => {
  if (date)
    return moment(date).format("YYYY-MM-DD 23:59:59")
  if (init) return init
  return null
}
export const FMTime = {
  full: (date: any) => {
    if (date)
      return moment(date).format("HH:mm:ss DD/MM/YYYY")
    return ''
  },
  day: (date: any) => {
    if (date)
      return moment(date).format("DD/MM/YYYY")
    return ''
  },
  post: (date: any) => {
    if (date)
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    return ''
  },
}