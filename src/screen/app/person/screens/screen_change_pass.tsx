import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import React, { useRef } from 'react'
import {
  InputBasic2,
  screen_height,
  ToastAppError,
  ToastAppSuccess,

} from '@components'
import { Block } from '@mylib'
import { AppLang } from '@assets/langs'
import { AuthApi } from '@api/qsland'
import { onLogout } from '@screen/splash/logout'
import ScreenApp from '@components/layout/ScreenApp'
import ButtonApp from '@components/ButtonApp'
const ICON = 'lock-closed-outline'
export default function CHANGE_PASS() {
  const formRef = useRef<any>({})
  const handleChangePass = async () => {
    const state = {
      pass1: formRef.current['pass1']?.getValue() ?? '',
      pass2: formRef.current['pass2']?.getValue() ?? '',
      pass3: formRef.current['pass3']?.getValue() ?? '',
    }
    const { pass1, pass2, pass3 } = state
    if (!pass1.trim()) return ToastAppError('Mật khẩu cũ không được để trống')
    if (!pass2.trim()) return ToastAppError('Mật khẩu mới không được để trống')
    if (!pass3.trim()) return ToastAppError('Xác nhận mật khẩu không được để trống')
    if (pass2 != pass3) return ToastAppError('Xác nhận mật khẩu không trùng khớp')

    const res = (await AuthApi.changePassword({ oldPassword: state.pass1, password: state.pass2 })).getResponse()
    if (res.status) {
      ToastAppSuccess('Thay đổi mật khẩu thành công')
      ToastAppSuccess('Vui lòng đăng nhập lại vào ứng dụng')
      // goBack()
      setTimeout(() => {
        onLogout()
      }, 250);
    }
    else {
      ToastAppError(res.mess)
    }
  }
  return (
    <ScreenApp title={AppLang('thay_doi_mat_khau')} back    >
      <Block flex1 padH={20} bgW>
        <ScrollView>
          <Block minH={screen_height * 0.7} padV10>
            <InputBasic2
              icon={ICON}
              ref={ref => formRef.current['pass1'] = ref}
              placeholder={AppLang('nhap_mk_hien_tai')}
              look
            />
            <InputBasic2
              icon={ICON}
              ref={ref => formRef.current['pass2'] = ref}
              placeholder={AppLang('nhap_mk_moi')}
              look
            />
            <InputBasic2
              icon={ICON}
              ref={ref => formRef.current['pass3'] = ref}
              placeholder={AppLang('xac_nhan_mk_moi')}
              look
            />
          </Block>
          <ButtonApp
            title={AppLang('luu_lai').toUpperCase()}
            onPress={handleChangePass}
            style={{ paddingVertical: 15, borderRadius: 5 }}
          />
        </ScrollView>
      </Block>
    </ScreenApp>
  )
}
