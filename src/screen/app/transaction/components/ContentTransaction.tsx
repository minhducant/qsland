import { StyleSheet, Text, TextProps, ViewProps } from 'react-native'
import React from 'react'
import { Block } from '@mylib/UIKit';
import { TextApp } from '@components';
type props = {
  title: string
  value: string
  dot2?: boolean
  titleStyle?: TextProps['style'],
  valueStyle?: TextProps['style'],
  containerStyle?: ViewProps['style']
  centerBetween?: boolean
}
export default function ContentTransaction({ title, value, dot2 = true, ...props }: props) {
  return (
    <Block row alignCenter marT5 style={props.containerStyle} centerBetween >
      <TextApp bold style={props.titleStyle} >{title}{dot2 ? ": " : ''}</TextApp>
      <TextApp bold style={props.valueStyle} >{value}</TextApp>
    </Block>
  )
}

const styles = StyleSheet.create({})