import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps, View
} from 'react-native'
import React from 'react'
import { IconC } from '@mylib'
import { isString } from 'underscore'
import { AppColor } from '@assets/colors'
import { goBack } from '@navigation'
////custom
const PADDING_HORIZONTAL = 25
const PADDING_LEFT = 10
const PADDING_RIGHT = 10
const SIZE_ICON = 23
interface Props {
  title?: string
  left?: LeftProps
  style?: ViewProps['style']
  styleTitle?: ViewProps['style']
  right?: LeftProps
  propsTitle?: any
  renderRight?: any
  back?: boolean
}
interface LeftProps {
  icon?: string
  show?: boolean
  style?: ViewProps['style']
  onPress?: () => void
  size?: number
}
const Header = (props: Props) => {
  const {
    title = 'Header',
    left,
    style,
    styleTitle,
    right,
    propsTitle,
    renderRight,
  } = props
  const renderTitle = () => {
    if (isString(title)) return title
    return title
  }
  const newLeft = props.back ? {
    show: true,
    onPress: () => goBack(),
  } : left
  return (
    <View style={[styles.box, style]}>
      <LeftComponent left={newLeft} />
      <Text numberOfLines={1} style={[styles.text, styleTitle]} {...propsTitle}>
        {renderTitle()}
      </Text>
      <RightComponent right={right} />
      {renderRight}
    </View>
  )
}
export default Header
const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColor('primary'),
    // paddingTop: 10,
  },
  boxHorizontal: {
    position: 'absolute',
    // paddingTop: 10,
  },
  boxLeft: {
    left: PADDING_HORIZONTAL ? PADDING_HORIZONTAL : PADDING_LEFT,
  },
  boxRight: {
    right: PADDING_HORIZONTAL ? PADDING_HORIZONTAL : PADDING_RIGHT,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    width: '70%',
    textAlign: 'center',
    textTransform: 'uppercase',

    // maxWidth: screen_width * 0.7,
  },
})
const LeftComponent = ({ left }: { left?: LeftProps }) => {
  if (!left?.show) return null
  return (
    <TouchableOpacity
      style={[styles.boxHorizontal, styles.boxLeft, left?.style]}
      onPress={left?.onPress}>
      <IconC
        name={left?.icon ? left.icon : 'arrow-back-outline'}
        size={left?.size ? left.size : SIZE_ICON}
        color='#fff'
      />
    </TouchableOpacity>
  )
}
const RightComponent = ({ right }: { right?: LeftProps }) => {
  if (!right?.show) return null
  return (
    <TouchableOpacity
      style={[styles.boxHorizontal, styles.boxRight, right?.style]}
      onPress={right?.onPress}>
      <IconC
        name={right?.icon ? right.icon : 'chevron-back-outline'}
        size={right?.size ? right.size : SIZE_ICON}
        color='#fff'
      />
    </TouchableOpacity>
  )
}
