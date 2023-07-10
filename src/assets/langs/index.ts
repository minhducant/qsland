import { VI } from './vi'
import { EN } from './en'
import { SettingApp } from '@assets/common'

export type LangName = keyof typeof VI
export const AppLang = (key: LangName) => {
  let langue = SettingApp.langue
  let res: string = VI[key]
  if (langue === 'VI') res = VI[key]
  if (langue === 'EN') res = EN[key]
  if (res && res !== '') return res
  return key
}


