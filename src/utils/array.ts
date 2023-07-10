import { isArray, isEmpty, isObject } from 'underscore'
import { Log } from './LogColor'

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
    let _data = typeof data == 'string' ? JSON.parse(data) : data
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
export function unique(arr: any) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (newArr.findIndex(value => arr[i].id === value.id) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
export const createArray2 = (length = 0, renderItem?: (index: number) => any) => [...new Array(length).keys()].map((i, index) => Object.assign({ id: index }, renderItem ? renderItem(index) : {}))
export const createArray = (length = 0, item = {}) => [...new Array(length).keys()].map((i, index) => Object.assign({ id: index }, item))
export function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function randomMoney(max = 10000, min = 1) {
  var randomDecimal = Math.random()
  var randomMoney = randomDecimal * (max - min) + min
  randomMoney = Math.round(randomMoney * 100) / 100

  return randomMoney
}
export function randomArray(arr: any[]) {
  if (Array.isArray(arr)) {
    return Math.floor(Math.random() * arr.length);
  }
  return null
}
export function isArrayEmpty(arr: any) {
  if (isArray(arr) && arr.length > 0) return true
  return false
}
export function isObjectEmpty(ob: any) {
  if (isObject(ob) && Object.keys(ob).length > 0) return true
  return false
}
export function groupBy(arr: any[], property: string) {
  return arr.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}