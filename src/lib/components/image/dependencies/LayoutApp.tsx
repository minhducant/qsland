import React from 'react'

import SafeAreaView, { ForceInsetProp } from 'react-native-safe-area-view'
import { Platform, StyleProp, ViewStyle } from 'react-native'
import { AppColor } from '@assets/colors'
export type LayoutAppProps = {
  children?: any
  forceInset?: ForceInsetProp
  forceInsetBot?: ForceInsetProp
  styleBot?: StyleProp<ViewStyle> | undefined
  style?: StyleProp<ViewStyle> | undefined
  isBack?: boolean
  disable?: boolean
}
export default function LayoutApp({
  children,
  forceInset = { top: 'always', horizontal: 'never', bottom: 'never' },
  forceInsetBot = { vertical: 'never' },
  styleBot,
  style,
  disable,
}: LayoutAppProps) {
  if (disable) return <>{children}</>
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: AppColor('primary'),
        },
        style,
      ]}
      forceInset={forceInset}>
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: AppColor('primary'),
          },
          styleBot,
        ]}
        forceInset={forceInsetBot}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  )
}
