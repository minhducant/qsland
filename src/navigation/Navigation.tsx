import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './rootNavigation'
import SplashScreen from 'react-native-splash-screen'
/************************* */
import Auth from '@screen/auth'
import App from '@screen/app'
import Splash from '@screen/splash'
import Maintain from '@screen/maintain'
/************************* */
import NetConnect, { Network } from '@components/network'
import { SelectorRedux } from '@utils/type'
// import {linking} from './Notification'
import { notificationListener, requestUserPermission } from './Notification'
import { getFcmToken } from './Notification/getFcmToken'
import { useStoreApp } from '@service/store'
import notifee from '@notifee/react-native';




export default function Navigation() {
  useEffect(() => {
    SplashScreen.hide()
    requestUserPermission()
    notificationListener()
    getFcmToken()
    notifee.setBadgeCount(0)
  }, [])
  const navigation = useStoreApp(state => state.Auth.status)
  return (
    <NavigationContainer
      onReady={() => SplashScreen.hide()}
      ref={navigationRef}
      independent={true}
    // linking={linking}
    >
      {/* <App /> */}
      {navigation === _APP_.SPLASH && <Splash />}
      {navigation === _APP_.AUTH && <Auth />}
      {navigation === _APP_.APP && <App />}
      {navigation === _APP_.APP && <NetConnect ref={ref => Network.create(ref)} />}
      {navigation === _APP_.MAINTAIN && <Maintain />}
    </NavigationContainer>
  )
}


export class _APP_ {
  static SPLASH = '0'
  static AUTH = '1'
  static APP = '2'
  static MAINTAIN = '3'
}