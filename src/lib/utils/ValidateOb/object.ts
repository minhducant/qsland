import { isArray, isNumber, isObject, isString } from 'underscore'
import { ToastAppError } from '@components';
import { Log } from '../Log'
export const Validate = {
  phone: (value: any, min = 9, max = 11) => {
    if (!isString(value)) return false
    if (value.length < min || value.length > max) return false
    const checkPhoneCountry = /(([0-9]{9,})\b)/g
    if (!checkPhoneCountry.test(value)) return false
    return true
  },
  phoneOther: (value: any, min = 5, max = 20) => {
    if (!isString(value)) return false
    if (value.length < min || value.length > max) return false
    const checkPhoneCountry = /(([0-9]{9,})\b)/g
    if (!checkPhoneCountry.test(value)) return false
    return true
  },
  email: (value: any) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
  },
  identityCard: (value: any, min = 9, max = 12) => {
    if (!isString(value)) return false
    if (value.length < min || value.length > max) return false
    return true
  },
  identityCard2: (value: any) => {
    if (!isString(value)) return false
    if (value.length == 9 || value.length == 12) return false
    return true
  },
  string: (value: any) => {
    if (isString(value)) return false
    return true
  },
  number: (value: any) => {
    if (isNumber(value)) return false
    return true
  },
  empty: (value: any) => {
    if (!value) return false
    if (isString(value) && value.trim() === '') return false
    return true
  },
  emptyArray: (value: any) => {
    if (!value || !isArray(value)) return false
    if (value.length == 0) return false
    return true
  },
  emptyObject: (value: any) => {
    if (!value || isArray(value)) return false
    if (!isObject(value)) return false
    if (Object.keys(value).length == 0) return false
    return true
  },
}

export type keyCheck = keyof typeof Validate | 'none'
export type options = {
  [n: string]: [keyCheck, string | undefined] | [keyCheck]
}
export type keyToast = keyof typeof ValidateToast
export const ValidateToast = {
  phone: 'Số điện thoại không đúng định dạng',
  phoneOther: 'Số điện thoại không đúng định dạng tối thiểu 5 số và nhỏ hơn 21 số!',
  email: 'Email không đúng định dạng',
  identityCard: 'CMNN/CCCD không đúng định dạng',
  identityCard2: 'CMNN/ CCCD không đúng định dạng',
  // string: 'Không đúng định dạng',
  // number: 'Không đúng định dạng',
  // empty: 'Không đúng định dạng',
}
//key 1 .....&& none
//key 2 ==undefine  toast key1
//key 2 undefine none
export const ValidateObject = (data: Object = {}, options: options) => {
  try {
    if (!isObject(data)) return
    // Log.d('try ValidateObject')
    let validate = true
    let keyErr = null
    Object.keys(data).forEach(key => {
      if (validate === false) return
      let arr = options[key]
      //find check
      if (isArray(arr) && arr.length > 0) {
        let type = arr[0]
        if (type == 'none') return
        validate = Validate[type](data[key])
        if (validate === false) keyErr = key
      }
    })
    ///
    if (keyErr !== null && validate === false) {
      let toast = options[keyErr][1]
      let type = options[keyErr][0]
      if (toast) {
        ToastAppError(toast)
      }
      if (toast == undefined && type !== 'none') {
        ToastAppError(ValidateToast[type] ?? keyErr + '=>>sai định dạng')
      }
    }
    return validate
  } catch (error) {
    // Log.d('catch ValidateObject', error)
    return false
  }
}
//example
/**
 
let check = ValidateObject(
  {
    phone: false,
    start_time: false,
    cccd: false,
    name: false,
    email: false,
    end_time: false,
    type_vehicle: false,
    type_payment: false,
    number_vehicle: false,
  },
  {
    phone: ['phone'],
    start_time: ['empty', 'vui_long_nhap_du'],
    cccd: ['empty'],
    name: ['empty'],
    email: ['email'],
    end_time: ['empty'],
    type_vehicle: [__DEV__ ? 'empty' : 'none', 'type_vehicle empty'],
    // type_payment: ['empty'],
    // number_vehicle: ['empty'],
  },
)

 */
