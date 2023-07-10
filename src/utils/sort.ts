import {isArray} from 'underscore'
import {Log} from './LogColor'
export const sortNumber = (array: any[], key?: any) => {
  if (!isArray(array) || !array) return []
  if (array.length == 0) return []
  let _data = [...array]
  if (!key) {
    return _data.sort((a, b) => a - b)
  }
  if (key && typeof key == 'string') {
    return _data.sort((a, b) => a[key] - b[key]) //catch
  }
  return []
}
export const sortNumberObject = (array: any[], key: any) => {
  if (!isArray(array) || !array) return []
  if (array.length == 0) return []

  if (!key) {
    array.sort((a, b) => a - b)
  }
  // Log.d('sortNumberObject', array)
  if (key) {
    return array.sort((a, b) => {
      // Log.d('a[1][key]', a[1][key])
      if (!a[1][key]) return -1
      return a[1][key] - b[1][key]
    }) //catch
  }
  return []
}
