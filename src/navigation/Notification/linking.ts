import messaging from '@react-native-firebase/messaging'
import { Alert, Linking } from 'react-native'
import { AlertOnMessage, Log, config, formatLINK, prefixes } from './api'
import store from '@service/store'
///
export const linking = {
  prefixes: prefixes,
  config: config,
  subscribe(listener: any) {

    //function detec
    const onReceiveURL = ({ url }: any) => listener(url)
    Linking.addEventListener('url', onReceiveURL)
    const HandleLink = (data: any) => {
      if (data) {
        //Kiểm tra app đã đăng nhập hay chưa
        const navigation = store.getState()?.Auth?.status
        Log.d('navigation ', navigation)
        Log.d('handle link: ', data)
        //navigation==2 đã đăng nhập
        Log.e('HandleLink formatLINK', formatLINK(data))
        if (navigation && navigation == '2') listener(formatLINK(data))
      }
    }
    //Nhận thông báo khi ở trong app
    const unsubscribe = messaging().onMessage(async message => {
      // const url = message?.data?.link
      const body = message?.notification?.body
      const title = message?.notification?.title || 'Thông báo'
      // Log.d('onMessage ==> ', message, url)
      const data = message?.data
      if (data) {
        // AlertOnMessage({ title, body, onPress: () => HandleLink(data) })
      }
    })
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        // const url = message?.data?.link
        const data = message?.data
        // Log.d('onNotificationOpenedApp ==> ', message, url)
        HandleLink(data)
      },
    )
    messaging()
      .getInitialNotification()
      .then(message => {
        // const url = message?.data?.link //
        const data = message?.data
        Log.d('messaging', message,)
        Log.d1('content', data)
        // Log.d1('url', url)
        if (data) {
          let handleCheck = async () => {
            const navigation = store.getState()?.Auth?.status
            if (navigation != '0') {
              HandleLink(data)
            } else {
              setTimeout(handleCheck, 1000)
            }
          }
          setTimeout(handleCheck, 1000)
        }
      })

    return () => {
      Linking.removeEventListener('url', onReceiveURL)
      unsubscribeNotification()
      unsubscribe()
    }
  },
}
