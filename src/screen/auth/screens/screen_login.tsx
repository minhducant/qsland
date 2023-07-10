import { ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { navigate } from '@navigation'
import { InputBasic2, LoadingApp, ToastAppError } from '@components'
import { AppLang } from '@assets/langs'
import { Block } from '@mylib'
import { isStringNull, Log } from '@utils'
import { _APP_ } from '@navigation/Navigation'
import ActionSheetIos from '@components/Sheet/ActionSheetIos'
import { HandleLogin } from './handle'
import { TitleAuth, LayoutAuth, ButtonLogin } from '../components'
const SUGGEST_ACC = __DEV__
  ? {
    username: 'hapham',
    password: '123456',
  }
  : {}
export default function ScreenLogin() {
  const refSuggest = useRef<any>(null)
  const formRef = React.useRef<any>({})
  const onLogin = async () => {
    try {
      LoadingApp.show()
      let username = formRef.current.username?.getValue() ?? ''
      let password = formRef.current.password?.getValue() ?? ''
      if (!isStringNull(username) || !isStringNull(password))
        return ToastAppError(AppLang('ban_chua_nhap_du'))
      // if (!validatePassword(password.trim()))
      //   return ToastAppError(AppLang('mat_khau_sai_dinh_dang'))
      await HandleLogin.submit(username, password)
    } catch (error) {
      LoadingApp.hide()
    } finally {
      LoadingApp.hide()
    }
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
        <TitleAuth
          title={AppLang('dang_nhap')}
          onTitle={() => refSuggest.current?.open()}
        />
        <Block>
          <InputBasic2
            icon='person'
            ref={ref => (formRef.current['username'] = ref)}
            placeholder={AppLang('ten_dang_nhap')}
            valueInit={SUGGEST_ACC['username']}
            onEndEditing={() => formRef.current['password']?.focus()}
            returnKeyType='go'
            keyboardType='email-address'
          />
          <InputBasic2
            icon='lock-closed'
            ref={ref => (formRef.current['password'] = ref)}
            placeholder={AppLang('mat_khau')}
            look
            valueInit={SUGGEST_ACC['password']}
            forgot
            onForgot={() => navigate('screen_forgot')}
          />
          <ButtonLogin
            onPress={onLogin}
            title={AppLang('dang_nhap')}
            style={{ marginTop: 30 }}
          />
          <Block height={100} />
        </Block>
      </ScrollView>
      <ActionSheetIos
        ref={refSuggest}
        options={SuggestAccount}
        keyValue='username'
        onPressButton={({ username, password }) => {
          HandleLogin.submit(username, password)
          refSuggest.current.close()
        }}
        onCancel={() => refSuggest.current.close()}
        getTitle={item => `${item?.username} / ${item?.password}`}
      />
    </LayoutAuth>
  )
}
const ListAcc = [
  { 'adminqsland': '999999' },
  { 'sale': '123456' },
  { 'thuky': '123456' },
  { 'dev1': '123456' },
  { 'Cuctt@qsland': '123456' },
  { 'nv23@stech': '123456' },
  { 'hapham': '123456' },
  { 'NGATTT@QSL': '123456' },
  { 'NV1@STECH': '123456' },
  { 'NV2@STECH': '123456' },
  { 'NV3@STECH': '123456' },
  { 'NV4@STECH': '123456' },
  { 'NV5@STECH': '123456' },
  { 'NV6@STECH': '123456' },
  { 'NV8@STECH': '123456' },
  { 'NV9@STECH': '123456' },
  { 'NV10@STECH': '123456' },
  { '999999': '123456' },

]
const SuggestAccount = ListAcc.map((item) => ({
  username: Object.keys(item)[0],
  password: Object.values(item)[0]
}))
