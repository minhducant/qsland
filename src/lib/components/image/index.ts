import { isArray, isString } from 'underscore'
export * from './ListImage'
export * from './ListImageViewer'
export const getLink = (data: any[], type = 1) => {
  if (!isArray(data)) return []
  let res: any[] = []
  data.forEach((item) => {
    if (type == 1 && isString(item?.uri)) {
      if (item?.uri.search('http') != -1) res.push(item?.uri)
    }
    if (type == -1 && isString(item?.uri)) {
      if (item?.uri.search('http') == -1) res.push(item)
    }
  })
  return res
}