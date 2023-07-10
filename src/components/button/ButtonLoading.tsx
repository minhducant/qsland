import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, Touch } from '@mylib/UIKit'
import { AppColor } from '@assets/colors'
import { TextApp } from '@components'
import { AppLang } from '@assets/langs'
type buttonLoadingProps = {
  onPress: any
  isLoading: boolean
  title?: any
}
export default function ButtonLoading({
  onPress,
  isLoading = false,
  title,
}: buttonLoadingProps) {
  const init = {
    color: AppColor('primary'),
    title: AppLang('gui'),
  }
  return (
    <Block mid padV20>
      <Touch onPress={onPress} borderR100 h={50} bg={init.color} w={'100%'} mid>
        {isLoading ? (
          <ActivityIndicator size={40} color='#fff' />
        ) : (
          <TextApp colorW size16>
            {title ? title : init.title}
          </TextApp>
        )}
      </Touch>
    </Block>
  )
}
