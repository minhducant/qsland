import messaging from '@react-native-firebase/messaging'
import { Log } from './LogColor'
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    // console.log('Authorization status:', authStatus)
  }
}
// const getFcmToken2 = async () => {
//   try {
//     const fcmToken = await messaging().getToken()
//     if (fcmToken) {
//       console.log('\x1b[34m', ' THE NEW GENRATED TOKEN-FIRE BASE::\n', fcmToken)
//     }
//   } catch (error) {
//   }
//   // } else {
//   // postTokenFirebase(_fcmToken)
//   // }
// }

/**
 * onListener Notify
 */
// export const notificationListener = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('Nofionbackground', remoteMessage.notification)
//   })
//   messaging().onMessage(async (remoteMessage: any) => {
//     Log.g1('notificationListener', remoteMessage)
//     // if (Platform.OS === 'android') Vibration.vibrate([1000, 2000, 3000])
//     DropDownHolderNotify.success(
//       remoteMessage.notification.title,
//       remoteMessage.notification.body,
//       {
//         onPress: () => navigate('screen_finance_details', { data: { id: 9200 } })
//       }
//     )
//   })
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log('Notifi2', remoteMessage.notification)
//       }
//     })
// }
