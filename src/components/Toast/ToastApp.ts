type AlertType = 'info' | 'warn' | 'error' | 'success'

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string, payload?: any, interval?: any) => void
  clearQueue: () => void
}

export class DropDownHolder {
  static dropDown: DropdownType

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown
  }
  static info(title: string, message: string) {
    this.dropDown.alertWithType('info', title, message)
  }
  static warn(title: string, message: string) {
    this.dropDown.alertWithType('warn', title, message)
  }
  static error(title: string, message: string) {
    this.dropDown.alertWithType('error', title, message)
  }
  static success(title: string, message: string) {
    this.dropDown.alertWithType('success', title, message)
  }
  static clearQueue() {
    this.dropDown.clearQueue()
  }
}
import { AppLang } from '@assets/langs'
import { Log } from '@utils'
export { default as DropdownAlertCustom } from './DropdownAlertCustom'
export const ToastAppError = (mess: string, title = AppLang('thong_bao')) => {
  DropDownHolder.error(title, mess)
  Log.e(title, mess)
}
export const ToastAppSuccess = (mess: string, title = AppLang('thong_bao')) => {
  DropDownHolder.success(title, mess)
  Log.g(title, mess)
}
export const ToastAppClear = () => {
  DropDownHolder.clearQueue()
}
export const notActive = () => {
  return ToastAppError('Tính năng đang phát triển!')
}
/*************************** */
import Toast from 'react-native-toast-message'
export type typeAlert = {
  text1?: string
  text2?: string
}
export class ToastHolder {
  static info({ text1, text2 }: typeAlert) {
    Toast.show({
      type: 'info',
      text1: text1,
      text2: text2,
    })
  }

  static error({ text1, text2 }: typeAlert) {
    Toast.show({
      type: 'error',
      text1: text1,
      text2: text2,
    })
  }
  static success({ text1, text2 }: typeAlert) {
    Toast.show({
      type: 'success',
      text1: text1,
      text2: text2,
    })
  }
}
export class DropDownHolderNotify {
  static dropDown: DropdownType

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown
  }
  static error(title: string, message: string) {
    this.dropDown.alertWithType('error', title, message)
  }
  static success(title: string, message: string, data: any) {
    this.dropDown.alertWithType('success', title, message, data)
  }
}
