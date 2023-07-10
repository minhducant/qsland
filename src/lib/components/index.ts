import { Dimensions } from 'react-native'

export { default as IconApp } from './AppIcon'
export { Input, InputRows } from './Input'
export { NameIcon } from './AppIcon'
export * from './AppStyle'
export { default as Touch } from './Touch/TouchUI'
export { default as Block } from './Touch/BlockUI'
export { default as TextApp } from './TextApp'
export const ScreenWidth = Dimensions.get('screen').width
export const ScreenHeight = Dimensions.get('screen').height
