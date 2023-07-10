import storage from '@react-native-async-storage/async-storage'
import { decodeJson } from '@utils/array'
import { Log } from '@utils'
import { isString } from 'underscore';
type keyStore = string
export const setStorage = (key: keyStore, value: any) => {
  // Log.g(`[${key}]`, 'setStorage')
  return storage.setItem(key, JSON.stringify(value))
}
export const getStorage = async (key: keyStore) => {
  let data = await storage.getItem(key)
  if (isString(data)) {
    return JSON.parse(data)
  }
  return null
}
export const multiRemove = async (list: keyStore[]) => {
  return storage.multiRemove(list)
}
export const multiGet = async (list: keyStore[]) => {
  const data = await storage.multiGet(list)
  if (data) {
    const newData = Object.assign({}, ...data.map(([key, value]) => ({ [key]: decodeJson(value) })));
    return newData
  }
  return {}
}
export const multiSet = async (list: any) => {
  const data = Object.entries(list).map(([key, value]) => ([key, JSON.stringify(value)]))
  return storage.multiSet(data)
}


export const getDataFormStore = async (key: any, callBack: any) => {
  const data = await getStorage(key)
  callBack(data)
}
export const removeStorage = (key: any) => {
  return storage.removeItem(key)
}
export const getAllKeys = async () => {
  return storage.getAllKeys()
}