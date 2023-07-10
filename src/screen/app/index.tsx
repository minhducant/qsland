import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack'
import dashboard from './dashboard'
import qsland from './qsland/screens'
import person from './person/screens'
import customer from './ManageCustomer/screens'
import statistic from './statistic/screens'
import DenyAdmin from './DenyAdmin/screens'
import notify from './notify/screens'
import project from './project/screens'
import booking from './booking/screens'
import home from './home/screens'
import news from './news/screens'
import transaction from './transaction/screens'
import { asyncApp } from '@screen/splash/asyncApp'
import HomeScreen from './qsland/screens/HomeScreen'
import DetailScreen from './qsland/screens/DetailScreen'
///
import { Easing } from 'react-native'
// const { Screen, Navigator } = createStackNavigator();
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
const { Screen, Navigator } = createSharedElementStackNavigator()
export type NameScreenApp = keyof typeof ScreenApp
export const ScreenApp = {
  ...dashboard,
  ...home,
  ...qsland,
  ...person,
  ...notify,
  ...project,
  ...booking,
  ...transaction,
  ...customer,
  ...statistic,
  ...DenyAdmin,
  ...news
}
const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }: any) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    }
  },
}

export default function App() {
  // useAppState();
  asyncApp()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {Object.entries(ScreenApp).map(([name, component]) => (
        <Screen
          key={name}
          component={component}
          name={name}
          options={{ gestureEnabled: true }}
        />
      ))}
      <Screen
        component={HomeScreen}
        name={'HomeScreen'}
      // options={() => ({
      //   gestureEnabled: true,
      //   transitionSpec: {
      //     open: {
      //       animation: 'spring', config: {
      //         stiffness: 1000,
      //         damping: 500,
      //         mass: 3,
      //         overshootClamping: true,
      //         restDisplacementThreshold: 0.01,
      //         restSpeedThreshold: 0.01,
      //       }
      //     },
      //     close: { animation: 'spring', config: { duration: 500, bounciness: 15, } },
      //   },
      //   cardOverlayEnabled: true,
      //   cardStyleInterpolator: ({ current: { progress } }) => {
      //     return {
      //       cardStyle: {
      //         opacity: progress
      //       }
      //     }
      //   },
      //   cardStyle: { backgroundColor: 'red' },
      //   animationTypeForReplace: 'push',
      //   gestureDirection: 'horizontal'
      // })}
      />
      <Screen
        component={DetailScreen}
        name={'DetailScreen'}
      // options={() => options}
      // options={{
      //   ...customTransition,
      // }}
      // options={{
      //   gestureDirection: 'vertical',
      //   cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      // }}
      // options={{
      //   gestureDirection: 'vertical-inverted',
      //   cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
      // }}
      // options={{
      //   gestureDirection: 'vertical',
      //   transitionSpec: {
      //     open: config,
      //     close: closeConfig,
      //   },
      //   cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      // }}
      />
    </Navigator>
  )
}
const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    }
  },
}
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
}
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}
