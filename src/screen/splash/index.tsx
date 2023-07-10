import ScreenSplash from './screen_splash'
import {createStackNavigator} from '@react-navigation/stack'
const {Screen, Navigator} = createStackNavigator()
import React, {useEffect} from 'react'
export default function Splash () {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'ScreenSplash'} component={ScreenSplash} />
    </Navigator>
  )
}
