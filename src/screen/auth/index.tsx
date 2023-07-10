import screens from './screens'

import { createStackNavigator } from '@react-navigation/stack'
const { Screen, Navigator } = createStackNavigator()
import React from 'react'
export type NameScreenAuth = keyof typeof ScreenAuth
export const ScreenAuth = {
  ...screens
}
export default function Auth() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {Object.entries(ScreenAuth).map(([name, component]) => (
        <Screen key={name} component={component} name={name} />
      ))}
    </Navigator>
  )
}
