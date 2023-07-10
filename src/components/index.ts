export * from './layout'
export * from './button'
export * from './text'
export * from './input'
export * from './Toast'
export * from './loading'
export * from './ListEmpty'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Dimensions } from 'react-native'
export const screen_width = Dimensions.get('screen').width
export const screen_height = Dimensions.get('screen').height

export const stylesApp = StyleSheet.create<any>({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  mid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: (paddingLeft?: number) => ({
    paddingLeft: paddingLeft,
  }),
  flex1: { flex: 1 },
  row: { flexDirection: 'row' },
  square: (square?: number) => ({ width: square, height: square }),
  centerHorizontal: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shawDow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
})
export type TextStyles = StyleProp<TextStyle>
export type ViewStyles = StyleProp<ViewStyle>
