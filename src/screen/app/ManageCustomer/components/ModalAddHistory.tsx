import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Block, IconApp, InputRows, ScreenWidth, TextApp, Touch } from '@lib/components';
import { STATUS_INTERACTIVE_LIST, TYPE_INTERACTIVE, TYPE_RECEIPT } from '../components';
import { Dimensions } from 'react-native';
import BottomSheet from '@lib/components/BottomSheet';
import { useRef, useEffect } from 'react';
import ButtonApp from '@lib/components/ButtonApp';
import { TouchableOpacity } from 'react-native';
import { AppAlert } from '@lib/components/AppAlert';
import { useKeyboard } from '@react-native-community/hooks';
import { ListColumn } from '@lib/components/ListView';
import { ToastAppError, ToastAppSuccess } from '@components';
import { useListAllocation, useListMe } from '@service/store';
import { CustomerApi } from '@api/qsland';

const ModalAddHistory = React.forwardRef(({ customer_id, onRefresh }: any, ref) => {
  const { onRefresh: onRefreshListAllocation } = useListAllocation();
  const { onRefresh: onRefreshListMe } = useListMe()

  React.useImperativeHandle(ref, () => ({
    open: () => addRef.current?.open(),
    close: () => addRef.current?.close(),
  }))
  const addRef = useRef<any>(null)
  const noteRef = useRef<any>(null)
  const smsRef = useRef<any>(null)
  const statusRef = useRef<any>(null)
  const onSave = async () => {
    const body = {
      customer_id: customer_id,
      interactive_form: smsRef.current?.getValue(),
      interactive_status: statusRef.current?.getValue(),
      note: noteRef.current?.getValue()
    }
    let check = 0
    Object.entries(body).forEach(([key, value]) => {
      if (!value) check++
    })
    if (check > 0) return AppAlert('Vui lòng điền đầy đủ thông tin')

    const res: any = await CustomerApi.addSaleCustomerCampaignHistoryTakeCare(body)
    // Log.d('res', res)

    if (res.status) {
      ToastAppSuccess('Thêm nhật ký thành công')
      onRefresh()
      onSkip()
      onRefreshListMe()
      onRefreshListAllocation()
    }
    else {
      ToastAppError(res.mess)
    }
  }
  const onSkip = async () => {
    addRef.current?.close()
  }
  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()
  const scrollRef = useRef<ScrollView>(null)
  useEffect(() => {
    if (keyboardShown) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true })
      }, 250);
    }
  }, [keyboardShown])
  return (
    <BottomSheet ref={addRef} draggable={false} height={Dimensions.get('screen').height * 0.80}  >

      <Block flex1    >
        <Block mid paddingOption={{ all: 10, bottom: 20 }}  >
          <TextApp bold size={20}>{'Thêm nhật ký'}</TextApp>
          <IconApp onPress={() => addRef.current?.close()} name='close' styleContainer={{ position: 'absolute', right: 0 }} />
        </Block>
        <Block flex1>


          <ScrollView
            keyboardDismissMode='none'
            // keyboardShouldPersistTaps='always'
            ref={scrollRef} style={{ flex: 1 }}
            contentContainerStyle={{
              padding: 10,
              paddingBottom: keyboardShown ? keyboardHeight + 60 : 20
            }}>

            <Block marT={10}>
              <TextApp bold>{'Hình thức tương tác'}<TextApp bold color='red'>{'(*):'}</TextApp></TextApp>
              <Radio ref={smsRef} />

            </Block>
            <Block marT={10}>
              <TextApp bold>{'Chọn tình trạng khách hàng'}<TextApp bold color='red'>{'(*):'}</TextApp></TextApp>
              <Radio2 ref={statusRef} />
            </Block>
            <Block marT={10}>
              <TextApp bold>{'Mô tả chi tiết '}<TextApp bold color='red'>{'(*):'}</TextApp></TextApp>
              <Text></Text>
              <InputRows hiddenIcon ref={noteRef} placeholder='Nhập ghi chú' />
            </Block>
            <Block row mid marT={20}>
              <ButtonApp title='Bỏ qua' onPress={onSkip} background="gray" />
              <ButtonApp title='Thêm nhật ký' onPress={onSave} style={{ marginLeft: 20 }} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    </BottomSheet>
  )
})
export default ModalAddHistory
const Radio = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getValue: () => valued,
    clear: () => setValued(null)
  }))
  const [valued, setValued] = useState<any>(null)
  return (
    <ListColumn
      styleContainer={{ paddingVertical: 10 }}
      numberColumn={2}
      data={Object.entries(TYPE_INTERACTIVE).map(([id, value]) => ({ id, label: value?.label }))}
      keyExtractor={(i, j) => j.toString()}
      renderItem={({ item }) => {
        const active = valued === item?.id ? true : false
        const icon = active ? 'radio-button-on-outline' : 'radio-button-off-outline'
        return (
          <Touch marB={5} row alignCenter w={ScreenWidth * 0.5} onPress={() => setValued(item?.id)}  >
            <IconApp name={icon} />
            <TextApp >{item?.label}</TextApp>
          </Touch>
        )
      }}
    />

  )
})
const Radio2 = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getValue: () => valued,
    clear: () => setValued(null)
  }))
  const [valued, setValued] = useState<any>(null)
  return (
    <Block padV={10}>
      {STATUS_INTERACTIVE_LIST.map(({ id, label }) => {
        const active = valued === id ? true : false
        const icon = active ? 'radio-button-on-outline' : 'radio-button-off-outline'
        return (
          <TouchableOpacity key={id} onPress={() => setValued(id)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
            <IconApp name={icon} />
            <TextApp>{label}</TextApp>
          </TouchableOpacity>
        )
      }
      )}
    </Block>
  )
})