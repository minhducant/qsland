import { Keyboard, ScrollView, View } from 'react-native'
import React, { useRef } from 'react'
import { InputBasic2, LoadingApp, TextApp, ToastAppError } from '@components'
import { navigate } from '@navigation'
import { AppLang } from '@assets/langs'
import { validateEmail } from '@utils/checkValidate'
import { Block, IconC, Touch } from '@mylib'
import { TitleAuth, LayoutAuth, ButtonLogin } from '../components'
import { Log } from '@utils'
import { AuthApi } from '@api/qsland'
import { setStorage } from '@lib/storage'
const SUGGEST_ACC = __DEV__
  ? {
    email: 'haptq@dxmb.vn',
  }
  : {}

export default function ScreenForgot() {
  const accountRef = useRef<any>(null)
  /**# Forgot email */
  const onPressForgot = async () => {
    const account = accountRef.current?.getValue() ?? ''
    if (account.trim() === '') return ToastAppError('Không được bỏ trống email hoặc tên đăng nhập')
    let body: any = {
      email: null,
      username: null
    }
    if (validateEmail(account)) body.email = account
    else body.username = account
    LoadingApp.show()
    const res = (await AuthApi.forgot(body)).check()
    LoadingApp.hide()
    if (res && res?.token) {
      Log.d('res', res)
      if (body.email == null) body.email = res?.email
      setStorage('token-forgot', res?.token)
      if (body.email == null) return ToastAppError('Server không trả email')
      return navigate('screen_verify_code', { email: body.email })
    }
    Log.e1('onPressForgot', res)
  }
  return (
    <LayoutAuth>
      <ScrollView
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          flex: 1,
        }}>
        <TitleAuth title={AppLang('quen_mat_khau')} back />
        <Touch h={50} onPress={() => Keyboard.dismiss()} />
        <Block flex1  >
          <InputBasic2
            ref={accountRef}
            placeholder={AppLang('nhap_email_hoac_ten_dang_nhap')}
            valueInit={SUGGEST_ACC.email}
            keyboardType='email-address'
          />
          <Touch activeOpacity={1} onPress={() => Keyboard.dismiss()} row alignCenter pad10 >
            <TextApp  >{'Hình thức nhận mã'}</TextApp>
            <Block row alignCenter marL10>
              <IconC name='radio-button-on-outline' size={18} />
              <TextApp  >{'Email'}</TextApp>
            </Block>
          </Touch>
        </Block>
        <Block flex5  >
          <ButtonLogin onPress={onPressForgot} title={AppLang('nhan_otp')} />
        </Block>
      </ScrollView>
    </LayoutAuth>
  )
}
