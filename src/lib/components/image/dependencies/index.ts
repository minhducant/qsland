
export const screen_width = Dimensions.get('screen').width

export { default as Block } from './Block'
export { default as IconC } from './Icon'
export { default as Touch } from './Touch'
export { default as LayoutApp } from './LayoutApp'

import { isEmpty } from 'underscore';
import { Dimensions } from 'react-native';
export const arrayData = (data: any) => {
  if (isEmpty(data)) return []
  if (data) {
    if (Array.isArray(data)) return data
    return []
  }
  return []
}
export function sleep(time: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
export { Log } from '@utils/Log'