import * as IconSrc from './src_index'
export type NameIconSvg = keyof typeof IconSrc

/**
 *
 */
import React from 'react'
import { ViewStyle } from 'react-native'
import { TextStyle, TextProps } from 'react-native'
interface IconProps {
  name: NameIconSvg
  size?: number | string
  color?: string
  onPress?: Function | undefined
  style?: ViewStyle | TextStyle | undefined
  height?: number
  width?: number
}
export default class IconSvg extends React.PureComponent<IconProps> {
  render() {
    if (!IconSrc[this.props.name]) return <></>
    const IconView: any = IconSrc[this.props.name || 'angry']
    return (
      <IconView
        width={this.props.size ? this.props.size : 14}
        height={this.props.size ? this.props.size : 14}
        fill={this.props.color ? this.props.color : '#000'}
        onPress={this.props.onPress}
        style={[this.props.style]}
      />
    )
  }
}
