import { Button, ScrollView, Text, View, Animated, Platform, UIManager, LayoutAnimation } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Block, IconApp, Touch } from '@lib/components';
import { InputText, InputRows, InputDate, InputSelect, InputRadio, Title, InputCCCD, styleInput, InputImage } from '../components';
import { Log, AppColor } from '@lib/utils';
import { useListCitiesStatic, useListWard, useListBuildingProject, useListCampaignProject } from '@service/hook';
import { useListDistricts } from '@service/hook';
import { COUNTY_LIST, GENDER_LIST, } from '../components/@Status';
import moment from 'moment';
import ButtonApp from '@lib/components/ButtonApp';
import { goBack, navigate } from '@navigation';
import { CustomerApi, TransactionApi } from '@api/qsland';
import { ValidateObject } from '@lib/utils/ValidateOb/object';
import { DatePost, } from '@lib/utils/date';
import { Dimensions } from 'react-native';
import { LoadingApp, TextApp, ToastAppError, ToastAppSuccess } from '@components';
import { isObject, isEqual } from 'underscore';
import { useListCategory, useListMe } from '@service/store';
import { useKeyboard } from '@react-native-community/hooks';
import ModalSelectCustomer from '../components/ModalSelectCustomer';
import { IconC } from '@mylib/UIKit';
import { AppLang } from '@assets/langs';
import InputSelectMore from '../components/FormCustomer/InputSelectMore';
import { useHookForm } from './hook';
import { convertDateApp } from '@utils/date';
import { decodeJson } from '@utils/array';
import { convertHttpToHttps } from '@utils/index';
import { TYPE_PAYMENT } from '@service/constant/constant';
import { Res } from '@utils/type';
import { moneyFormat } from '@utils/format';
//Them moiw khacsh hag
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Rest: any = {
  will_pay: { title: "Số tiền dự kiến thanh toán", placeholder: 'Nhập    ', required: true, keyboardType: 'number-pad' },
  type_payment: { title: 'Chọn hình thức thanh toán', placeholder: 'Chọn', required: true, keyboardType: "number-pad" },
  total: { title: 'Số tiền khách đóng (VND)', placeholder: 'Nhập', required: true, },
  file: { title: 'Ảnh xác minh thanh toán', placeholder: 'Chọn', required: true, },
  reason: { title: 'Ghi chú', placeholder: 'Nhập', },

}
/**
 * 
 * 
 */
export default function CampaignPayment({ total, body }: any) {
  const scrollRef = useRef<ScrollView>(null)
  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()


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
        total,
        type_payment: form.type_payment,
        file: _file[0]
      }

      Log.d1('transaction', transaction)
      let check = ValidateObject(transaction,
        {
          will_pay: ['empty'],
          reason: ['empty'],
        })
      Log.d1('check', check)
      if (!check) return


      LoadingApp.show()

      const create_bill: Res = await TransactionApi.addBookApartment(body)

      Log.d('create_bill', create_bill.data)
      if (create_bill.status && isObject(create_bill.data)) {
        const { id } = create_bill.data
        if (id) {
          transaction.bill_id = id
          const create_transaction: Res = await TransactionApi.addPaymentHistory(transaction)
          if (create_transaction.status) {
            Log.d('create_transaction', create_transaction.data)
            navigate('Bottom6')
          } else {
            ToastAppError(create_transaction.mess)
          }
        }

      } else ToastAppError(create_bill.mess)
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

        <Block padV10>
          <TextApp bold primary >{AppLang('so_tien_quy_dinh').concat(': ')}{moneyFormat(total, " VND")}</TextApp>
        </Block>
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

