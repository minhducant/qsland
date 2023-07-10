import { Button, ScrollView, Text, View, Animated, Platform, UIManager, LayoutAnimation } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Block, } from '@lib/components';
import { InputText, InputRows, InputDate, InputSelect, InputImage } from '../components';
import { Log, } from '@lib/utils';
import ButtonApp from '@lib/components/ButtonApp';
import { ValidateObject } from '@lib/utils/ValidateOb/object';
import { LoadingApp, TextApp, ToastAppError, ToastAppSuccess } from '@components';
import { isObject, isEqual } from 'underscore';
import { useKeyboard } from '@react-native-community/hooks';
import { AppLang } from '@assets/langs';
import { useHookForm } from './hook';
import { TYPE_PAYMENT } from '@service/constant/constant';
import { Res } from '@utils/type';
import { TransactionApi } from '@api/qsland';
import { goBack } from '@navigation';
import { EventApp } from '@service/hook/EventApp';
import { useDetailBill } from '@service/store';
//Them moiw khacsh hag
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Rest: any = {
  will_pay: { title: "Số tiền", placeholder: 'Nhập    ', required: true, keyboardType: 'number-pad' },
  type_payment: { title: 'Chọn hình thức thanh toán', placeholder: 'Chọn', required: true, keyboardType: "number-pad" },
  file: { title: 'Ảnh xác minh thanh toán', placeholder: 'Chọn', required: true, },
  reason: { title: 'Ghi chú', placeholder: 'Nhập', },

}
/**
 * 
 * 
 */
export default function BillAddPayment({ id }: any) {
  const scrollRef = useRef<ScrollView>(null)
  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()
  const { onRefresh } = useDetailBill(id)

  const [form, setForm] = useState({ type_payment: null })
  const { set, get, getAll, clear, clearMulti, clearAll, getName, Ref, setAll, handleFc } = useHookForm()
  /*********
   * 
   * 
   * 
   * 
   * 
   */
  async function submit() {
    try {

      Log.d('file', get('file', 'file'))
      let _file: any[] = get('file', 'file')
      if (_file.length == 0) return ToastAppError('Vui lòng chọn ảnh xác minh thanh toán')
      const transaction: any = {
        will_pay: get('will_pay'),
        note: get('reason'),
        type_payment: form.type_payment,
        file: _file[0]
      }

      Log.d1('transaction', transaction)
      let check = ValidateObject(transaction,
        {
          will_pay: ['empty'],
          type_payment: ['empty'],
        })
      Log.d1('check', check)
      if (!check) return
      LoadingApp.show()
      transaction.bill_id = id
      const create_transaction: Res = await TransactionApi.addPaymentHistory(transaction)
      if (create_transaction.status) {
        Log.d('create_transaction', create_transaction.data)
        // EventApp.emit('getDetailBill')
        onRefresh()
        goBack()
      } else {
        ToastAppError(create_transaction.mess)
      }

      LoadingApp.hide()
    } catch (error) {
    }
  }



  Log.d('form', form)
  return (
    <Block flex1 >
      <ScrollView ref={scrollRef}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: keyboardShown ? keyboardHeight * 2 : 80,
          paddingHorizontal: 20
        }}>

        <InputSelect
          ref={ref => Ref('type_payment', ref)}
          {...Rest["type_payment"]}
          data={TYPE_PAYMENT}
          onSelected={(item) => setForm({ type_payment: item?.id })}
          keyString="name"
        />
        <InputText ref={ref => Ref('will_pay', ref)} {...Rest["will_pay"]} />
        <InputImage ref={ref => Ref('file', ref)}{...Rest["file"]} />
        <InputRows ref={ref => Ref('reason', ref)} {...Rest["reason"]} />
        <ButtonApp title={AppLang('gui')} onPress={submit} marginOption={{ top: 30 }} />
      </ScrollView>
    </Block >
  )
}

