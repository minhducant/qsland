import React from 'react'
import { AppColor } from '@assets/colors'
import SafeAreaView, { ForceInsetProp } from 'react-native-safe-area-view'
// import GestureRecognizer from 'react-native-swipe-gestures'
import { goBack } from '@navigation'
import { Platform, StyleProp, ViewStyle } from 'react-native'
export type { ForceInsetProp }
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
