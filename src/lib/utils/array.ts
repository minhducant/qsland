import { isArray, isEmpty, isObject } from "underscore"

export const columnData = (data: any[], column: number = 3) => {
  if (!isArray(data)) return []
  let index = 0
  let arrayLength = data.length
  let res = []
  for (index = 0; index < arrayLength; index += column) {
    let myChunk = data.slice(index, index + column)
    res.push(myChunk)
  }
  return res
}
export const decodeJson = (data: any, type: any = -1) => {
  try {
    let _data = typeof data == "string" ? JSON.parse(data) : data
    if (type != -1) {
      if (typeof _data == typeof type) return _data
      return type
    }
    return _data
  } catch (error) {
    if (type != -1) return type
    return false
  }
}
export const toObjectKey = <T = unknown>(data: any[], key: T) => {
  if (!isArray(data)) return {}
  let res: any = {}
  data.forEach(i => {
    res[i[key]] = i
  })
  return res
}
export const includeArray = (data: any[], props: any[]) => {
  if (isArray(data)) {
    if (!isArray(props)) return data
    let res: any[] = []
    data.forEach(item => {
      if (isObject(item)) {
        let itemNew = {}
        props.forEach(key => {
          itemNew = { ...itemNew, ...{ [key]: item[key] } }
        })
        res.push(itemNew)
      }
    })
    return res
  }
  return []
}
export const excludeArray = (data: any[], props: any[]) => {
  if (isArray(data)) {
    if (!isArray(props)) return data
    let res: any[] = []
    data.forEach(item => {
      if (isObject(item)) {
        let itemNew = {}
        Object.keys(item).forEach(key => {
          if (props.find(i => i == key)) return
          itemNew = { ...itemNew, ...{ [key]: item[key] } }
        })
        res.push(itemNew)
      }
    })
    return res
  }
  return []
}
// Object.assign({}, ...data.map(([key, value]) => ({ [key]: value })));
export function sleep(time: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
export const arrayData = (data: any) => {
  if (isEmpty(data)) return []
  if (data) {
    if (Array.isArray(data)) return data
    return []
  }
  return []
}