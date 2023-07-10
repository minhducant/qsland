import { StyleSheet, Text, View, TouchableWithoutFeedbackProps, ViewProps, TextProps } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { AppColor } from '@assets/colors';
interface ButtonAppProps extends TouchableWithoutFeedbackProps {
  style?: ViewProps['style'],
  styleText?: TextProps['style']
  title?: string,
  background?: string
  color?: string
  marginOption?: { all?: number, top?: number, left?: number, right?: number, bottom?: number }

}
export default function ButtonApp({ style, styleText, title, background, color, ...props }: ButtonAppProps) {
  return (
    <TouchableOpacity style={[
      styles.container,
      { ...background && { backgroundColor: background } },
      props.marginOption && {
        marginLeft: props.marginOption?.all || props.marginOption?.left,
        marginTop: props.marginOption?.all || props.marginOption?.top,
        marginRight: props.marginOption?.all || props.marginOption?.right,
        marginBottom: props.marginOption?.all || props.marginOption?.bottom,
      }, style
    ]} {...props}>
      <Text style={[styles.text, { ...color && { color: color } }, styleText]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColor('primary'),
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: '600'
  }
})