import React, { useEffect, useRef, useCallback, useState } from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useIsFocused, useRoute } from '@react-navigation/native'

import { AppColor } from '@lib/utils'
import { Block } from '@lib/components'
import { BottomAnimate } from '@screen/app/dashboard/container/BottomHome'

import Honor from '../components/Honor'
import HeaderImage from '../components/HeaderImage'
import UpcomingEvents from '../components/UpcomingEvents'
import ScreenDeveloper from '@screen/app/qsland/screens/ScreenDeveloper'
import { LayoutApp } from '@components/layout'
import { useListPermission } from '@service/store'
import { Log } from '@utils/Log'
import ButtonApp from '@components/ButtonApp'
import { navigate } from '@navigation/rootNavigation'



export default function ScreenHome() {
  const { name } = useRoute()
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // navigate('ScreenDeveloper')
    if (isFocused) {
      BottomAnimate.animate(name)
    }
  }, [isFocused])
  if (!__DEV__) return <ScreenDeveloper />
  const handleRefresh = async () => {
    setRefreshing(false)
  }
  const { data, groupID } = useListPermission()
  Log.d('useListPermission-groupID', groupID)
  // Log.d1('useListPermission2', data.group(({ staff_object_id }) => staff_object_id))

  return (
    <LayoutApp>
      <Block flex1 _background={'#e8e8e6'}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={refreshing}
              colors={[AppColor.primary]}
            />
          }>
          <Animatable.View animation='fadeInUp' delay={5} useNativeDriver>
            <HeaderImage />
            <UpcomingEvents />
            <Honor />
            {/* <ButtonApp title="News" onPress={() => navigate('ScreenNews')} />
            <ButtonApp title="Events" onPress={() => navigate('ScreenEvents')} /> */}
            <ButtonApp title="ScreenDeveloper" onPress={() => navigate('ScreenDeveloper')} />
          </Animatable.View>
        </ScrollView>
      </Block>
    </LayoutApp>
  )
}
