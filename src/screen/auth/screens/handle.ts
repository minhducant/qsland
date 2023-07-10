import { navigate } from '@navigation'

export const HandleLogin = {
  forgot: () => navigate('screen_forgot'),
  submit: async (user_name: string, pass_word: string) => {
    await LoginApp(user_name, pass_word)
  },
}
import { setStorage } from '@lib/storage'
import store from '@service/store'
import { Auth, UserData } from '@service/store'
import { AuthApi } from '@api/qsland'
import { Log } from '@utils'
import { postTokenPush } from '@screen/splash/asyncAuth'

export const LoginApp = async (username: any, password: any) => {
  Log.d('LoginApp')
  const data = await AuthApi.login({ password, username })
  // Log.d('LoginApp123', data)
  if (data.check()) {
    const dataUser = data.getData('object')
    if (dataUser) {
      const { token, userInfo } = dataUser
      // Log.d('setDataUser', userInfo)
      store.dispatch(UserData.setDataUser(userInfo))
      store.dispatch(Auth.setStatusApp('2'))

      await setStorage('token', token)
      await setStorage('roles', [])
      await postTokenPush()
    }
  }
}
