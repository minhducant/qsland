import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Block, IconApp, TextApp, Touch } from '@lib/components'

import { Dimensions } from 'react-native'
import { AppLang } from '@assets/langs'

type ListEmptyComponent = {
  isLoading?: boolean
  onRefresh?: () => void
  title?: string
  style?: StyleProp<ViewStyle> | undefined
  hiddenReload?: boolean
}
export function ListEmpty({
  isLoading,
  onRefresh,
  title,
  style,
  hiddenReload,
}: ListEmptyComponent) {
  if (isLoading) return null
  return (
    <Block
      pad={10}
      h={Dimensions.get('screen').height * 0.5}
      mid
      styleBox={style}>
      <TextApp>{title || AppLang('khong_co_du_lieu')}</TextApp>
      <Touch hidden={hiddenReload} marT={10} onPress={onRefresh}>
        <IconApp name='refresh-outline' size={30} />
      </Touch>
    </Block>
  )
}
