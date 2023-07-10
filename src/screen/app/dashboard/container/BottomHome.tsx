import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { IconC } from '@mylib'
import { AppColor } from '@assets/colors'
import { AppLang } from '@assets/langs'
import { ScreenApp } from '@screen/app'
import { Animated, Easing, StyleSheet } from 'react-native'
import { Badge } from 'react-native-paper'
import { isNumber, isObject } from 'underscore'
import { SettingApp } from '@assets/common'
import { Log } from '@utils/Log'
const Tab = createBottomTabNavigator()

export type NameScreenBottom =
  | 'Bottom1'
  | 'Bottom2'
  | 'Bottom3'
  | 'Bottom4'
  | 'Bottom5'
  | 'Bottom6'
export interface BottomHome {
  component: any
  name: NameScreenBottom
  title: any
  icon: any
  icon_type?: any
}
const count = 0
export default function BottomHome() {
  const DATA_BOTTOM = [
    {
      component: ScreenApp['ScreenStatistic'], // ScreenApp['ScreenStatistic'],
      name: 'Bottom1',
      title: 'Thống kê',
      icon: 'cellular',
      icon_type: 'Ionicons',
    },
    {
      component: ScreenApp['ScreenManageCustomer'],
      name: 'Bottom2',
      title: 'CRM',
      icon: 'file-tray-full',
      icon_type: 'Ionicons',
    },
    {
      component: ScreenApp['ScreenHome'],
      name: 'Bottom3',
      title: 'Home',
      icon: 'home',
      icon_type: 'Ionicons',
    },
    {
      component: ScreenApp['ScreenListProject'],
      name: 'Bottom4',
      title: 'Dự án',
      icon: 'business',
      icon_type: 'Ionicons',
    },
    {
      component: ScreenApp['ScreenListBooking'],
      name: 'Bottom5',
      title: 'Booking',
      icon: 'gift',
      icon_type: 'Ionicons',
    },
    {
      component: ScreenApp['ScreenNews'],
      name: 'Bottom6',
      title: 'News',
      icon: 'newspaper',
      hidden: !__DEV__,
    },
    {
      component: ScreenApp['ScreenEvents'],
      name: 'Bottom7',
      title: 'Events',
      icon: 'calendar',
      hidden: !__DEV__,
    },
    {
      component: ScreenApp['ScreenTransaction'],
      name: 'Bottom8',
      title: 'HĐ',
      icon: 'server',
      hidden: !__DEV__,
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName={'Bottom3'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColor('primary'),
      }}>
      {DATA_BOTTOM.filter(i => i?.hidden !== true).map(
        ({ component, icon, name, icon_type, title }, key) => (
          <Tab.Screen
            {...{ key }}
            component={component}
            name={name}
            options={{
              tabBarLabel: ({ color, children, focused }) => {
                return (
                  <Animated.Text
                    numberOfLines={1}
                    style={{
                      color,
                      fontWeight: focused ? '600' : '400',
                      transform: [
                        // {
                        //   translateY: BottomAnimate.bottom[name].interpolate({
                        //     inputRange: [1, 1.3],
                        //     outputRange: [1, -5],
                        //   }),
                        // },
                      ],
                    }}>
                    {title}
                  </Animated.Text>
                )
              },
              tabBarIcon: ({ color, size, focused }) => {
                return (
                  <Animated.View
                    style={{
                      backgroundColor: '#fff',
                      borderTopLeftRadius: 100,
                      borderTopRightRadius: 100,
                      // borderTopWidth: focused ? 1 : 0,
                      // borderColor: '#eee',
                      transform: [
                        { scale: BottomAnimate.bottom[name] },
                        {
                          translateY: BottomAnimate.bottom[name].interpolate({
                            inputRange: [1, 1.3],
                            outputRange: [1, -2],
                          }),
                        },
                      ],
                    }}>
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFillObject,
                        { top: -5, left: -5, right: -5, bottom: -5 },
                        {
                          borderRadius: 1000,
                          // backgroundColor: '#00FBFF73',
                          opacity: BottomAnimate.bottom[name].interpolate({
                            inputRange: [1, 1.3],
                            outputRange: [0, 0.2],
                          }),
                        },
                      ]}></Animated.View>
                    <IconC
                      type={icon_type}
                      name={focused ? icon : icon + '-outline'}
                      color={color}
                      size={25}
                    />
                  </Animated.View>
                )
              },
            }}
          />
        ),
      )}
    </Tab.Navigator>
  )
}
export class BottomAnimate {
  static bottom: any = {
    Bottom1: new Animated.Value(1),
    Bottom2: new Animated.Value(1),
    Bottom3: new Animated.Value(1),
    Bottom4: new Animated.Value(1),
    Bottom5: new Animated.Value(1),
    Bottom6: new Animated.Value(1),
    Bottom7: new Animated.Value(1),
    Bottom8: new Animated.Value(1),
  }
  static animate(active: string, toValue = 1.5) {
    // Animated.parallel([
    //   Animated.spring(BottomAnimate.bottom[active], {
    //     toValue: toValue,
    //     // duration: 100,
    //     useNativeDriver: true,
    //   }),
    //   ...Object.keys(BottomAnimate.bottom)
    //     .filter(i => i != active)
    //     .map(key =>
    //       Animated.spring(BottomAnimate.bottom[key], {
    //         toValue: 1,
    //         useNativeDriver: true,
    //       }),
    //     ),
    // ]).start()

    Animated.sequence([
      Animated.timing(BottomAnimate.bottom[active], {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease
      }),
      Animated.timing(BottomAnimate.bottom[active], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.bounce
      }),
    ]
    ).start()
  }
}
