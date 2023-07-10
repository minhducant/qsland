import { ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import {
  InputBasic2,
  LoadingApp,
  ToastAppError,
} from '@components'
import { Block, } from '@mylib'
import { getStorage, setStorage } from 'src/lib/storage'
import { validatePassword } from '@utils/checkValidate'
import { Log } from '@utils'
import { AppLang } from '@assets/langs'
import { ButtonLogin, LayoutAuth, TitleAuth } from '../components'
import { AuthApi } from '@api/qsland'
import { Auth, UserData } from '@service/store'
import { useDispatch } from 'react-redux'

export default function ScreenResetPass({ route }: any) {
  const email = route.params.email
  Log.d('email', email)
  const refPass1 = useRef<any>(null)
  const refPass2 = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChangePass = async () => {
    if (isLoading) return
    let pass1 = refPass1.current.getValue()
    let pass2 = refPass2.current.getValue()
    if (pass1.trim() === '') return ToastAppError('Vui lòng nhập mật khẩu!')
    if (pass1.trim() === '') return ToastAppError('Vui lòng nhập mật khẩu!')
    if (pass1.trim() !== pass2.trim()) return ToastAppError('Vui lòng nhập mật khẩu khớp!')
    if (!validatePassword(pass1.trim())) return ToastAppError(AppLang('mat_khau_sai_dinh_dang'))

    LoadingApp.show()
    const token = await getStorage('token-forgot')
    const data = (await AuthApi.resetPassword({ token, email: route.params.email, pword: pass1 })).check()

    if (data) {
      const tokenNew = data.token
      await setStorage('token', tokenNew)
      const user = (await AuthApi.getInfo({})).getData('object');
      if (user) {
        dispatch(UserData.setDataUser(user))
        dispatch(Auth.setRole([]))
        dispatch(Auth.setStatusApp('2'))
        setStorage('roles', [])

      }
    }
    LoadingApp.hide()
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
        <TitleAuth title={AppLang('dat_lai_mat_khau')} back />
        <Block mid >
          <InputBasic2
            icon='lock-closed-outline'
            ref={refPass1}
            placeholder={AppLang('nhap_mk_moi')}
            look
          />
          <InputBasic2
            icon='lock-closed-outline'
            ref={refPass2}
            placeholder={AppLang('xac_nhan_mk_moi')}
            look
          />
          <Block marT={20} w100>
            <ButtonLogin onPress={handleChangePass} title={AppLang('tiep_theo')} style={{ marginTop: 30 }} />
          </Block>
        </Block>
      </ScrollView>
    </LayoutAuth>
  )
}
