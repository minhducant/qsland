import React, { useMemo } from 'react'
import SafeAreaView, { ForceInsetProp } from 'react-native-safe-area-view'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Dimensions,
  Image,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { AppImage } from '@assets/image'
import LinearGradient from 'react-native-linear-gradient'
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'

import { TextVersion } from '@components/Codepush'
import { useKeyboard } from '@react-native-community/hooks'
export type LayoutAppProps = {
  children?: any
  forceInset?: ForceInsetProp
  forceInsetBot?: ForceInsetProp
  styleBot?: StyleProp<ViewStyle> | undefined
  style?: StyleProp<ViewStyle> | undefined
  isBack?: boolean
  disable?: boolean
  background?: string
}
const { width, height } = Dimensions.get('screen')
const WIDTH_CIRCLE = height * 1.2
const MARGIN_TOP = height * 0.085
const WIDTH_LOGO = 120
export default function LayoutAuth({
  children,
  forceInset = { top: 'always', horizontal: 'never', bottom: 'always' },
  style,
  disable,
}: LayoutAppProps) {
  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()

  if (disable) return <>{children}</>
  return (
    <AnimatedLinearGradient
      customColors={[`rgb(0, 137, 243)`, 'rgb(57, 169, 255)', 'rgb(148, 183, 209)']} speed={1000}
      // colors={['#0089f3', '#F0F6FB', '#ffffff']}
      // colors={['#39A9FF', '#F0F6FB', '#ffffff']}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.parent, style]} forceInset={forceInset}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={"light-content"} />
            {/* <Langue /> */}
            {/* {children} */}
            <View
              style={{
                position: 'absolute',
                top: MARGIN_TOP - WIDTH_LOGO / 2,
                width: WIDTH_LOGO,
                height: WIDTH_LOGO,
                backgroundColor: 'white',
                borderRadius: WIDTH_LOGO,
                zIndex: 100,
              }}>
              <Image
                source={AppImage('logo_bg1')}
                style={{
                  width: WIDTH_LOGO,
                  height: WIDTH_LOGO,
                  resizeMode: 'stretch',
                  borderRadius: WIDTH_LOGO * 2,
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: MARGIN_TOP,
                height: WIDTH_CIRCLE,
                width: WIDTH_CIRCLE,
                backgroundColor: '#fff',
                borderTopLeftRadius: WIDTH_CIRCLE * 2,
                borderTopRightRadius: WIDTH_CIRCLE * 2,
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <View
                style={{
                  // position: 'absolute',
                  width: width - 10,
                  height: height - MARGIN_TOP * 2,
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  paddingTop: WIDTH_LOGO / 2,
                }}>
                {children}
              </View>
            </View>
          </View>
          {!keyboardShown && <TextVersion style={{ textAlign: 'center' }} />}
        </SafeAreaView>
      </SafeAreaProvider>
    </AnimatedLinearGradient>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  children: {
    flex: 1,
  },
})
