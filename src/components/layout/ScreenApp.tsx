import { StatusBar, ViewProps } from 'react-native'
import React from 'react'
import { Block } from '@mylib';
import { HeaderC } from '@components/layout';
import LayoutGradient from '@components/layout/LayoutGradient';
import { goBack } from '@navigation';
interface ScreenApp {
  children?: any
  title?: string
  iconLeft?: string
  iconSize?: number
  iconColor?: string
  renderRight?: any
  onLeft?: () => void
  back?: boolean
  styleBox?: ViewProps['style']
}
export default function ScreenApp({ children, styleBox, ...props }: ScreenApp) {
  return (
    <LayoutGradient  >
      <StatusBar backgroundColor={'transparent'} translucent />
      <HeaderC
        style={{ backgroundColor: 'transparent' }}
        title={props.title ?? ""}
        left={{
          icon: props.back ? 'arrow-back-outline' : props.iconLeft,
          show: props.back ? true : props.iconLeft ? true : false,
          onPress: () => {
            if (typeof props.onLeft == "function") props.onLeft()
            else { goBack() }
          },
        }}
        renderRight={props.renderRight}
      />
      <Block flex1 bgW styleBox={styleBox}>
        {children}
      </Block>
    </LayoutGradient >
  )
}
