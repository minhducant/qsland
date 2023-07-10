import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Block, IconC, Touch } from '@mylib'
import { TextApp } from '@components'
import { AppColor } from '@assets/colors'
import { AppLang, } from '@assets/langs'
export const RowInfo = ({ item, onPress }: any) => {
  return (
    <Touch
      row
      centerH
      h={55}
      borderBW={1}
      borderC='#ddd'
      onPress={onPress}
      padH10>
      <Block row alignCenter>
        <IconC color={AppColor('txt_origin')} name={item.icon} size={20} />
        <TextApp style={{ paddingHorizontal: 15, flex: 1 }} numberOfLines={1}>
          {item.name}
        </TextApp>
      </Block>
      <IconC color={AppColor('txt_gray')} name='chevron-forward-outline' />
    </Touch>
  )
}
export const TextLogout = ({ onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 2 }}>
      <Block row alignCenter justifyC='flex-end'>
        <IconC
          color={AppColor('txt_origin')}
          size={20}
          name='log-out-outline'
        />
        <TextApp color={AppColor('txt_origin')}>{AppLang('dang_xuat')}</TextApp>
      </Block>
    </TouchableOpacity>
  )
}
