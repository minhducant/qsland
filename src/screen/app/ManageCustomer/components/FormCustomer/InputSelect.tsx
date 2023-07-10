import { RefreshControl, ScrollView, StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { useRef, useState } from 'react'
import { placeholderTextColor, styleInput } from './styleInput'
import InputTitle from './InputTitle';
import { AppValue, Block, IconApp, TextApp, Touch } from '@lib/components';
import BottomSheet from '@lib/components/BottomSheet';
import { arrayData, } from '@lib/utils';
import { isObject } from 'underscore';
import { LayoutApp } from '@components/layout';
import { Log } from '@utils/Log';
import { AppLang } from '@assets/langs';
type Props = {
  title?: string
  titleSelect?: string
  valueInit?: any
  data?: any[]
  required?: boolean
  keyString?: string
  onOpenModal?: () => void
  onSelected?: (item: any) => void
  placeholder?: string
  onRefreshData?: () => void
  containerStyle?: ViewProps['style']
}
const InputSelect = React.forwardRef<any, Props>(({ title, valueInit, placeholder, containerStyle,
  required, data, keyString = 'name', onOpenModal, onSelected, titleSelect, ...props }, ref) => {
  const [value, setValue] = useState<any>(null)
  const modalRef = useRef<any>(null)
  React.useImperativeHandle(ref, () => ({
    getValue: (keyString?: string) => {
      if (keyString && isObject(value)) return value[keyString]
      return value
    },
    setValue: (item: any) => setValue({ ...item, name: item[keyString] }),
    clearValue: () => setValue(null)
  }))
  const styleText = [
    { ...value && {} },
    { ...!value && { color: placeholderTextColor } }
  ]
  return (
    <View style={[styleInput.inputContainer, containerStyle]}>
      <InputTitle title={title} required={required} />
      <View style={styleInput.inputButton}>
        <Touch
          h={40}
          row
          centerBetween
          onPress={async () => {
            Log.d('onOpenModal',)
            if (onOpenModal) await onOpenModal()
            modalRef.current?.open()
          }}
          activeOpacity={0.5}>
          <Text style={styleText}>{value ? value?.name : (valueInit ? valueInit : placeholder)}</Text>
          <IconApp name="chevron-down-outline" alignSelf='auto' color='gray' />
        </Touch>
      </View>
      <BottomSheet height={AppValue.height * 0.75} ref={modalRef}>
        <LayoutApp styleBot={{ backgroundColor: '#fff' }} forceInset={{ vertical: 'never' }} forceInsetBot={{ bottom: 'always' }}>
          <Block background={'white'} flex1 padB={20}>
            <Block mid padV={10}>
              <TextApp bold>{titleSelect ?? AppLang('chon')}</TextApp>
            </Block>
            <ScrollView
              refreshControl={<RefreshControl refreshing={false} onRefresh={props.onRefreshData} />}
              contentContainerStyle={{ padding: 10, paddingBottom: 50 }} >
              {arrayData(data).map((item, key) =>
                <BottomItem
                  key={key}
                  name={item[keyString]}
                  onPress={() => {
                    setValue({ ...item, name: item[keyString] });
                    onSelected && onSelected(item)
                    modalRef.current?.close()
                  }}
                />
              )}
            </ScrollView>
            <Touch onPress={() => modalRef.current?.close()} borderW={1} marT={10} borderR={10} minH={50}
              pad={10} borderC="#ddd" mid mar={10}>
              <TextApp style={{ color: 'red' }} bold>{AppLang('huy')}</TextApp>
            </Touch>
          </Block>
        </LayoutApp>
      </BottomSheet>
    </View>
  )
})
export default InputSelect
const styles = StyleSheet.create({


})
const BottomItem = ({ name, onPress, icon = true, style }: any) => {
  return (
    <Touch onPress={onPress} row centerBetween borderW={1} marT={10} borderR={10} minH={50}
      pad={10} borderC="#ddd" styleBox={style}>
      <TextApp>{name}</TextApp>
      {icon && <IconApp name="chevron-forward-outline" />}
    </Touch>
  )
}