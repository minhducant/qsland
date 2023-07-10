import React, { useEffect, useRef, useState } from 'react'
import { Easing, Image } from 'react-native'
import { Animated, Button, StyleSheet, View } from 'react-native'
import { Block } from '@mylib'
import { AppLang } from '@assets/langs'
import { _APP_ } from '@navigation/Navigation'
import { AppImage } from '@assets/image'
import { screen_width } from '@components'
import { AppColor } from '@assets/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { asyncAuth } from './asyncAuth'

export default function Splash() {
  // AsyncStorage.clear()
  useEffect(() => {
    animate()
    const cache = setTimeout(() => {
      asyncAuth()
    }, 500)
    return () => {
      cache && clearTimeout(cache)
    }
  }, [])
  const scale = useRef(new Animated.Value(1)).current
  const rotateZ = scale.interpolate({
    inputRange: [1, 2],
    outputRange: ['0deg', '360deg'],
  })
  const translateX = scale.interpolate({
    inputRange: [1, 2],
    outputRange: [0, 3],
  })
  const translateY = scale.interpolate({
    inputRange: [1, 2],
    outputRange: [-200, 0],
  })
  const animate = () => {
    Animated.spring(scale, {
      toValue: 2,
      useNativeDriver: true,
      bounciness: 0,
      // easing: Easing.bezier(1, 0.02, 0.76, 1.05),
    }).start()
  }
  return (
    <Block flex1 bg={AppColor('primary')} mid>
      <Animated.Image
        source={AppImage('logo_white')}
        style={[
          {
            width: screen_width * 0.4,
            height: screen_width * 0.4,
            resizeMode: 'contain',
          },
          {
            transform: [
              { scale },
              // { rotateZ },
              { perspective: 9500 },
              { translateX },
              { translateY },
            ],
          },
        ]}
      />
    </Block>
  )
}
