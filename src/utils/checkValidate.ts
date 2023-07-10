import { isString } from 'underscore'

/**
 *
 * @param {String} value
 * @returns
 */
export const validatePhone = (value: string) => {
  // const checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
  const checkPhoneCountry = /(([0-9]{9,})\b)/g
  if (!checkPhoneCountry.test(value)) return false
  return true
}
/**
 *
 * @param {String} value
 * @returns
 */
/**
 * Regex này sẽ thực thi các quy tắc sau:

Ít nhất một chữ cái viết hoa bằng tiếng Anh ,(?=.*?[A-Z])
Ít nhất một chữ cái tiếng Anh viết thường,(?=.*?[a-z])
Ít nhất một chữ số,(?=.*?[0-9])
Ít nhất một ký tự đặc biệt,(?=.*?[#?!@$%^&*-])
Chiều dài tối thiểu tám .{8,}(có neo)
 */
export const validatePassword = (value: string) => {
  //app Stech::khong dc it hon 8 ky tu
  // const checkPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/

  const checkPass = /^.{6,}$/
  if (!checkPass.test(value)) return false
  // if(isString(value)){
  //   if(value.trim())
  // }
  return true
}
/**
 *
 * @param {String} value
 * @returns
 */
export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const isStringNull = (str: string) => {
  if (!str) return false
  if (str.trim() === '') return false
  return true
}
///
export const vdEmail2 = (email: string) => { }
export const vdPhone2 = (email: string) => { }
export const vdPass2 = (email: string) => { }
function validatePhoneNumber(phoneNumber: any) {
  const numericRegex = /^[0-9]+$/;
  const prefixRegex = /^(09|06|07|05|08)/;

  if (
    numericRegex.test(phoneNumber) &&
    phoneNumber.length >= 9 &&
    phoneNumber.length <= 11 &&
    prefixRegex.test(phoneNumber.substring(0, 2))
  ) {
    return true;
  } else {
    return false;
  }
}