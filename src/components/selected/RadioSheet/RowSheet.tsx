import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Block, IconC, Touch} from '@mylib/UIKit'
import {TextApp, TextStyles, ViewStyles} from '@components'
import {capitalizeFirst} from '@utils'
import {AppColor} from '@assets/colors'
type T_RowSheet = {
  styleBox?: ViewStyles
  styleTxt?: TextStyles
  content?: any
  icon?: any
  onPress?: () => void
}
export default function RowSheet ({
  styleBox,
  styleTxt,
  content,
  onPress,
  status,
}: any) {
  return (
    <Touch
      activeOpacity={0.8}
      row
      onPress={onPress}
      h={45}
      styleBox={[styles.defaultBox, styleBox]}>
      <Block minW={50} />
      <TextApp size18 style={[{color: '#2787f9', fontWeight: '500'}, styleTxt]}>
        {capitalizeFirst(content)}
      </TextApp>
      <Block minW={50}>
        {status && (
          <IconC
            name={'checkmark-circle'}
            size={20}
            style={{marginLeft: 10}}
            color={AppColor('primary')}
          />
        )}
      </Block>
    </Touch>
  )
}

const styles = StyleSheet.create({
  defaultBox: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
})
