import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { useRef, useState } from 'react'
import { placeholderTextColor, styleInput } from './styleInput'
import InputTitle from './InputTitle';
import { Block, IconC, Touch } from '@mylib/UIKit';
import { arrayData, } from '@lib/utils';
import { isObject } from 'underscore';
import { ListEmpty, TextApp, } from '@components';
import { Log } from '@utils/Log';
import { AppLang } from '@assets/langs';
import { BottomSheet } from '@components/Sheet';
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
  hook: () => any
  type: 'category' | 'campaign' | 'customer' | 'building'
  init?: any
}
const InputSelectMore = React.forwardRef<any, Props>(({
  title,
  valueInit,
  placeholder,
  containerStyle,
  required,

  keyString = 'name',
  onOpenModal,
  onSelected,
  titleSelect,
  hook,
  type,
  init,
  ...props
}, ref) => {
  const [value, setValue] = useState<any>(null)
  const modalRef = useRef<any>(null)
  React.useImperativeHandle(ref, () => ({
    getValue: (keyString?: string) => {
      if (keyString && isObject(value)) return value[keyString]
      return value
    },
    setValue: (item: any) => setValue({ ...item, name: item[keyString] }),
    clearValue: () => {
      console.log('123213123213clearValue-=--')
      setValue(null)
    },
    updateParamsRef, onRefresh
  }))
  const styleText = [
    { ...value && {} },
    { ...!value && { color: placeholderTextColor } }
  ]
  const _onSearch = async (e: any) => {
    await updateParamsRef(e)
    await onRefresh()
  }
  const {
    data,
    updateParamsRef,
    onRefresh,
    loading,
    onLoadMore,
    loading_more,
  } = hook()
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
          <IconC name="chevron-down-outline" alignSelf='auto' color='gray' />
        </Touch>
      </View>
      <BottomSheet ref={modalRef} draggable={false} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
        <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
          <TextApp size18 bold center>{titleSelect ?? AppLang('chon')}</TextApp>
          <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { modalRef.current?.close() }} />
        </Block>
        {/* <Block h={50}>
           <HeaderSearch
            filter={false}
            onSearch={(e: any) => _onSearch({ key_search: e })}
            onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
            onRightAdd={() => {
              refRef.current?.close()
              navigate('ScreenCustomerAdd')
            }}
          // activeFilter={activeFilter()}
          /> 
        </Block>*/}
        <FlatList
          data={data}
          refreshing={loading ?? false}
          onRefresh={onRefresh}
          ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          // onScroll={animateList.onScroll}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          onEndReached={onLoadMore}
          keyExtractor={(_item, index) => `${index}`}
          renderItem={({ item, index }) => <Item item={item} index={index}
            type={type}
            onPress={() => {
              onSelected && onSelected(item?.id)
              setValue({ ...item, name: item[keyString] });
              modalRef.current?.close()
            }}
            keyString={keyString}
          />}
          ItemSeparatorComponent={() => <Block h={1} gray />}
          ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
        />
      </BottomSheet>
    </View>
  )
})
export default InputSelectMore
const Item = ({ item, onPress, type, keyString }: any) => {
  switch (type) {
    case 'category':
      return (
        <Touch pad10 onPress={onPress} >
          <Block>
            <TextApp bold>{item[keyString]}</TextApp>
          </Block>
        </Touch>
      )
    case 'campaign':
      return (
        <Touch pad10 onPress={onPress} >
          <Block>
            <TextApp bold>{item[keyString]}</TextApp>
          </Block>
        </Touch>
      )
    case 'customer':
      return (
        <Touch pad10 onPress={onPress} >
          <Block>
            <TextApp bold>{item[keyString]}</TextApp>
          </Block>
          <Block row marT5>
            <TextApp><IconC name={"call-outline"} size={14} />{' '}{item?.phone}</TextApp>
            <Block w={20} />
            <TextApp><IconC name={"mail-outline"} size={14} />{' '}{item?.email ?? AppLang('dang_cap_nhat2')}</TextApp>
          </Block>
        </Touch>
      )
    case 'building':
      return (
        <Touch pad10 onPress={onPress} >
          <Block>
            <TextApp bold>{item[keyString]}</TextApp>
          </Block>
        </Touch>
      )
    default:
      return null
  }

}
