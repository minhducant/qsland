import { AuthApi } from '@api/qsland'
import Device from 'react-native-device-info'
import CodePush from 'react-native-code-push'
import { Platform } from 'react-native'
import moment from 'moment'
import { getStorage, setStorage } from '@lib/storage'
import store from '@service/store'
import { Auth, UserData } from '@service/store'
import { Log } from '@utils'
import { getFcmToken } from '@navigation/Notification/getFcmToken'
import { ToastAppError } from '@components';
export const asyncAuth = async () => {
  Log.d('asyncAuth')
  const infoCheck = await asyncInfoApp()
  const token = await getStorage('token')
  const roles = await getStorage('roles')
  if (token && infoCheck && roles) {
    Log.d1('', { token, infoCheck, roles })
    const res = (await AuthApi.getInfo({}))
    const data = res.getData('object')
    // Log.d1('dataInfo', data)
    if (res.check() && data) {
      store.dispatch(UserData.setDataUser(data))
      store.dispatch(Auth.setRole(roles))
      store.dispatch(Auth.setStatusApp('2'))
      await postTokenPush()
      return
    }
  }
  return store.dispatch(Auth.setStatusApp('1'))
}
export const asyncInfoApp = async () => {
  const info = await getStorage('info')
  if (info) {
    const js_ver = (await CodePush.getUpdateMetadata())?.label.replace('v', '') ?? '0'
    store.dispatch(Auth.setInfoApp({ ...info, ...js_ver && { js_ver } }))
    Log.d1('info+++', { ...info, ...js_ver && { js_ver } })
    return true
  } else {
    const js_ver = (await CodePush.getUpdateMetadata())?.label.replace('v', '') ?? '0'
    const infoData = {
      ['client_id']: `BOV3-${generateNumber(4)}-${generateNumber(
        4,
      )}-${moment().format('HHDD')}-${moment().format('MMYY')}`,
      ['build']: Device.getBuildNumber(),
      ['device_name']: Device.getDeviceId(),
      ['native_ver']: Device.getVersion(),
      ['os']: Platform.OS,
      ['os_ver']: Device.getSystemVersion(),
      ['bundle_id']: Device.getBundleId(),
      ['type']: 'user',
      ['js_ver']: js_ver
    }
    setStorage('info', infoData)
    Log.d1('info', infoData)
    store.dispatch(Auth.setInfoApp(infoData))
    return false
  }
}
export const generateNumber = (amount: number) => {
  let number = ''
  for (let i = 0; i < amount; i++) {
    number += Math.floor(Math.random() * 10)
  }
  return number
}

export const postTokenPush = async () => {
  let token_push = await getFcmToken()
  if (token_push) {
    let res: any = await AuthApi.addFirebaseTokenPush({ token_push })
    if (!res.status) {
      ToastAppError(res.mess)
    }
  }
}