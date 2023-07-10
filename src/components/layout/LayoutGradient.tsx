import React from 'react'
import { AppColor } from '@assets/colors'
import SafeAreaView, { ForceInsetProp } from 'react-native-safe-area-view'
import LinearGradient from 'react-native-linear-gradient'

import { Platform, StyleProp, ViewStyle } from 'react-native'
export type LayoutAppProps = {
  children?: any
  forceInset?: ForceInsetProp
  forceInsetBot?: ForceInsetProp
  styleBot?: StyleProp<ViewStyle> | undefined
  style?: StyleProp<ViewStyle> | undefined
  isBack?: boolean
  disable?: boolean
}
const COLOR_START = AppColor('primary')
const COLOR_END = '#9597F0'
export default function LayoutGradient({
  children,
  forceInset = { top: 'always', horizontal: 'never', bottom: 'never' },
  forceInsetBot = { vertical: 'never' },
  styleBot,
  style,
  disable,
}: LayoutAppProps) {
  if (disable) return <>{children}</>
  return (
    <LinearGradient
      colors={[COLOR_START, COLOR_END]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          {
            flex: 1,
            // backgroundColor: AppColor('primary'),
          },
          style,
        ]}
        forceInset={forceInset}>
        <SafeAreaView
          style={[
            {
              flex: 1,
              // backgroundColor: AppColor('primary'),
            },
            styleBot,
          ]}
          forceInset={forceInsetBot}>
          {children}
        </SafeAreaView>
      </SafeAreaView>
    </LinearGradient>
  )
}
