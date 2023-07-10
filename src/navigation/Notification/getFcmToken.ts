import messaging from '@react-native-firebase/messaging'
import { Log } from '@utils'
import { setStorage } from '@lib/storage'

export const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
      console.log('[fcmToken]', fcmToken)
      return fcmToken
    }
    return null
  } catch (error) {
    return null
  }
}
