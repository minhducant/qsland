import { ActivityIndicator, Button, DevSettings, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Block } from '@mylib'
import { openDrawer } from '@navigation'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { useListBooking } from '@service/store'
import * as Animatable from 'react-native-animatable'
import { ListEmpty } from '@components/ListEmpty'
import { ItemListBooking, ModalListBooking } from '../components'
import { screen_width } from '@components/index'
import {
  useIsFocused,
  useNavigationState,
  useRoute,
} from '@react-navigation/native'
import { BottomAnimate } from '@screen/app/dashboard/container/BottomHome'
import { AnimatedList } from './ListAnimate'
import { navigate } from '@navigation/rootNavigation'
import { Map, List } from 'immutable'
import { Log } from '@utils/Log'

import ScreenDeveloper from '@screen/app/qsland/screens/ScreenDeveloper'
import { HeaderSearch } from '@components/HeaderSearch'
const animateList = new AnimatedList()

export default function ScreenListBooking() {
  const { name } = useRoute()
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      BottomAnimate.animate(name)
    }
  }, [isFocused])

  // if (!__DEV__) return <ScreenDeveloper />

  const {
    data,
    params,
    count,
    updateParamsRef,
    onRefresh,
    loading,
    onLoadMore,
    loading_more,
    end_data,
  } = useListBooking()
  const activeFilter = (params: any) => {
    const { category_id } = params
    return category_id != null
  }
  const _onSearch = async (e: any) => {
    await updateParamsRef(e)
    await onRefresh()
  }
  const modalRef = useRef<any>(null)

  return (
    <ScreenApp iconLeft='menu' onLeft={openDrawer} title={AppLang('booking')}>
      <Block flex1 bgW overHidden>
        <animateList.AnimateHeader>
          <HeaderSearch
            hiddenRight
            onFilter={() => modalRef.current?.open()}
            onSearch={(e: any) => _onSearch({ key_search: e })}
            // onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
            activeFilter={activeFilter(params)}
          />
        </animateList.AnimateHeader>

        <FlatList
          onScroll={animateList.onScroll}
          numColumns={2}
          data={data}
          // data={[...new Array(20).keys()].map(i => itemFake)}//{data}
          refreshing={loading}
          onRefresh={onRefresh}
          // onScroll={animateList.onScroll}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 60,
            paddingHorizontal: 10,
            paddingTop: animateList.headerHeight,
          }}
          onEndReached={onLoadMore}
          keyExtractor={(_item, index) => `${index}`}
          ItemSeparatorComponent={() => <Block h={10} />}
          renderItem={({ item, index }: any) => (
            <Animatable.View
              key={index}
              animation='fadeInUp'
              delay={index < 10 ? index * 80 : 1}
              useNativeDriver>
              <ItemListBooking
                width={(screen_width - 10 * 2) / 2}
                item={item}
                index={index}
                onPress={() =>
                  navigate('ScreenBookingDetail', {
                    id: item?.id,
                    category_id: item?.category_id,
                    building_id: item?.id,
                  })
                }
              />
            </Animatable.View>
          )}
          ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
          ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
        />
      </Block>
      <ModalListBooking ref={modalRef} onSelected={_onSearch} />
    </ScreenApp>
  )
}
const itemFake = {
  id: 21,
  code: 'codetotal_886287',
  name: 'dfasda',
  desc: 'dsadasdas',
  category_id: 2675,
  time_hold: 12313,
  company_id: 14,
  status: 1,
  image: 'http://devapi.qsland.s-tech.info//image/1687854754617.jpg',
  created_at: '2023-06-27 15:32:34',
  deleted_at: null,
  updated_at: '2023-06-27 15:32:34',
  total_product: 0,
}
