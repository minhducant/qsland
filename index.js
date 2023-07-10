/**
 * @format
 */

import {AppRegistry, Text} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import 'react-native-gesture-handler'
import {LogBox} from 'react-native'
LogBox.ignoreLogs(['Reanimated 2'])
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])
LogBox.ignoreLogs(['new NativeEventEmitter'])
LogBox.ignoreLogs(['Require cycle:'])
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
LogBox.ignoreAllLogs()
console.disableYellowBox = true
// import notifee, {EventType} from '@notifee/react-native'
// import messaging from '@react-native-firebase/messaging'

// // Your app's background handler for incoming remote messages
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('setBackgroundMessageHandler')
//   await notifee.incrementBadgeCount()
// })
// messaging().onNotificationOpenedApp(message => {
//   console.log('onNotificationOpenedApp')
// })
// messaging()
//   .getInitialNotification()
//   .then(message => {
//     console.log('getInitialNotification')
//   })
// notifee.onBackgroundEvent(async ({type, detail}) => {
//   const {notification, pressAction} = detail
//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//     // Decrement the count by 1
//     await notifee.decrementBadgeCount()

//     // Remove the notification
//     await notifee.cancelNotification(notification.id)
//   }
// })
//
// import messaging from '@react-native-firebase/messaging'
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage)
// })
//
import {startNetworkLogging} from 'react-native-network-logger'
startNetworkLogging()
import {SettingApp} from '@assets/common'
SettingApp.asyncSetting()

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => App)
