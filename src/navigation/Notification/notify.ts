import messaging from '@react-native-firebase/messaging'
import { DropDownHolderNotify, ToastAppSuccess } from '@components'
import { getCurrentRoute, navigate } from '@navigation'
import { Log, formatOnTap } from './api'
import { isObject } from 'underscore'
import { EventApp } from '@service/hook/EventApp'
import notifee, { EventType } from '@notifee/react-native';
export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    Log.g1('notification background', remoteMessage.notification)
    notifee.incrementBadgeCount();
  })
  messaging().onMessage(async (message: any) => {
    Log.g1('notificationListener', message)
    // const route = getCurrentRoute()
    const data = message?.data
    // if (isObject(data) && route.name == 'screen_work_detail') {
    //   const id_sender = data?.id_sender
    //   if (id_sender) {
    //     EventApp.emitUrl('DETAIL_TASK', {id: id_sender})
    //   }
    // }
    DropDownHolderNotify.success(
      message.notification.title,
      message.notification.body,
      {
        onPress: () => formatOnTap(data),
      },
    )
    notifee.incrementBadgeCount();
  })
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('notification', remoteMessage.notification)
      }
    })
}
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    // console.log('Authorization status:', authStatus)
  }
}
