import React, { isValidElement, useRef } from 'react'
import { TextStyle, TextProps, StyleProp } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import { AppColor, AppSize } from '@lib/utils';
import { AppLang } from '@lib/utils';
import { isObject, isArray } from 'underscore';
/**
 *
 */
interface PropsTextDefault extends TextProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
  transform?: TextStyle['textTransform']
  decorationLine?: TextStyle['textDecorationLine']
  bold?: boolean
  background?: string
  color?: string
  upper?: boolean
  lower?: boolean
  center?: boolean
  italic?: boolean
  underline?: boolean
  size?: number
  flex1?: boolean | undefined
  content?: any
}
interface TextAppProps extends PropsTextDefault {
  colorApp?: keyof typeof AppColor
  contentApp?: keyof typeof AppLang
  sizeApp?: keyof typeof AppSize
}
const TextApp: React.FC<TextAppProps> = props => {
  const styleProps: Array<any> = [
    {
      color: props.color,
      backgroundColor: props.background,
      fontSize: props.size,
    },
    //
    props.center && { textAlign: 'center' },
    props.italic && { fontStyle: 'italic' },
    props.bold && styles.bold,
    props.underline && { textDecorationLine: 'underline' },
    props.upper && { textTransform: 'uppercase' },
    props.lower && { textTransform: 'lowercase' },
    props.colorApp && AppColor[props.colorApp] && { color: AppColor[props.colorApp] },
    props.sizeApp && AppSize[props.sizeApp] && { fontSize: AppSize[props.sizeApp] },
    props?.style && props?.style
  ]
  /**
   *
   * @returns
   */
  const Children = () => {
    const children = props?.children
    const content = props?.content || (props?.contentApp ? AppLang[props?.contentApp] : undefined)
    if (typeof content !== 'undefined') {
      if (typeof content == 'string' || typeof content == 'number' || isArray(children)) return content
      if (typeof content == 'function') if (isValidElement(content())) return content()
      if (isObject(children)) return JSON.stringify(children)
      if (isValidElement(content)) return content
      return React.createElement(Text, {})
    }
    if (typeof children !== 'undefined') {
      if (typeof children == 'string' || typeof children == 'number' || isArray(children)) return children
      if (isObject(children)) return JSON.stringify(children)
      if (typeof children == "function") return new Error('Children is a React node cannot be a function!')
      if (isValidElement(children)) return children
      return React.createElement(Text, {}, children)
    }
  }
  return (
    <Text {...props} style={[styles.defaultText, styleProps,]}>
      {Children()}
    </Text>
  )
}
export default TextApp
const styles = StyleSheet.create({
  defaultText: {
    fontSize: 15,
    fontWeight: '300',
    color: AppColor['black']
  },
  bold: {
    fontWeight: '500'
  }
})
