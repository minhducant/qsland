import { StyleSheet, TextInput, View, ViewProps } from 'react-native'

import React, { useState } from 'react'
import { TextApp, } from '@components';
import { AppLang } from "@assets/langs"
import { AppColor } from '@assets/colors';
import { Block, Touch, TouchScale } from '@mylib';
import { IconC } from '@mylib/UIKit';
import IconApp, { NameIcon } from '@components/AppIcon';

type HeaderFilterProps = {
  onSearch?: (e: any) => void
  onFilter?: () => void
  placeholder?: string
  containerStyle?: ViewProps['style']
  hiddenRight?: boolean
  onRightAdd?: () => void
  onSubmitEditing?: (e: any) => void
  activeFilter?: boolean
  filter?: boolean
}
export function HeaderSearch({ filter = true, ...props }: HeaderFilterProps) {
  const [value, setValue] = useState('')
  const _onSubmitEditing = () => {
    typeof props.onSubmitEditing == "function" && props.onSubmitEditing(value)
  }
  const _onSearch = () => {
    typeof props.onSearch == "function" && props.onSearch(value)
  }
  const color = props.activeFilter ? AppColor('primary') : 'gray'
  const icon = props.activeFilter ? 'funnel' : 'funnel-outline'
  return (
    <Block flex1 row alignCenter pad={10}  >
      <View style={[styles.viewSearchBar, { overflow: 'hidden' }]}>
        <Touch onPress={_onSearch}>
          <IconC name={NameIcon.search} size={23} />
        </Touch>
        <TextInput
          placeholder={props?.placeholder ?? 'Tìm kiếm...'}
          placeholderTextColor={'#ACB0BE'}
          value={value}
          onChangeText={setValue}
          onEndEditing={_onSubmitEditing}
          style={{ paddingRight: 30, width: '100%', color: 'black' }}
        />
      </View>
      <Touch hidden={!filter} onPress={props.onFilter} row alignCenter>
        <IconApp name={icon} size={20} style={{ marginLeft: 5 }} color={color} />
        <TextApp color={color}>{AppLang('loc')}</TextApp>
      </Touch>
      <TouchScale onPress={props.onRightAdd} hidden={props.hiddenRight} borderR={10} bg={AppColor('primary')} mid minH={30} padH={5} marL={10}>
        <TextApp color='#fff' size={13}>{AppLang('them_moi')}</TextApp>
      </TouchScale>
    </Block>
  )
}

const styles = StyleSheet.create({
  viewSearchBar: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 0.25,
    backgroundColor: '#eee',
    alignItems: 'center',
    paddingHorizontal: 5,
    flex: 1,
    height: 40,
  },
})