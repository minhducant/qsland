import { navigate } from '@navigation'
import React, { useRef, useState } from 'react'
import {
  View,
  Linking,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native'
import { HeaderSearch } from '@components/HeaderSearch'
import * as Animatable from 'react-native-animatable'
import { ListLoading } from '@components/Placeholder';
import { useListMe } from '@service/store'
import ModalListMe from '../components/ModalListMe'
import { ItemCustomerMe } from '../components/ItemCustomerMe'

import { AnimatedList, Animations } from './ListAnimate'
import { ListEmpty } from '@components/ListEmpty'

const animateList = new AnimatedList()

export default function ListCustomerMe() {
  const modalRef = useRef<any>(null)
  const _onSearch = async (e: any) => {
    await updateParamsRef(e)
    await onRefresh()
  }
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
  } = useListMe()
  const activeFilter = () => {
    if (
      params?.interactive_status ||
      params?.source_id ||
      params?.to ||
      params?.from ||
      params?.category_id
    )
      return true
    return false
  }

  return (
    <View>
      <animateList.AnimateHeader>
        <HeaderSearch
          onSearch={(e: any) => _onSearch({ key_search: e })}
          onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
          onFilter={() => modalRef.current?.open()}
          onRightAdd={() => navigate('ScreenCustomerAdd')}
          activeFilter={activeFilter()}
        />
      </animateList.AnimateHeader>
      <ListLoading show={loading && data.length == 0} />
      <FlatList
        data={data}
        refreshing={loading}
        onRefresh={onRefresh}
        ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={animateList.onScroll}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: animateList.headerHeight,
          paddingBottom: 60,
          paddingHorizontal: 10,
        }}
        onEndReached={onLoadMore}
        keyExtractor={(_item, index) => `${index}`}
        renderItem={({ item, index }) => {
          {
            const animation =
              Animations[Math.floor(Math.random() * Animations.length)]
            return (
              <Animatable.View
                key={index}
                animation={animation}
                delay={index < 10 ? index * 80 : 1}
                useNativeDriver>
                <ItemCustomerMe
                  item={item}
                  index={index}
                  onCall={() => Linking.openURL(`tel:${item?.phone}`)}
                  onPress={() =>
                    navigate('ScreenCustomerDetail', { id: item.id })
                  }
                />
              </Animatable.View>
            )
          }
        }}
        ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
      />
      <ModalListMe ref={modalRef} onSelected={_onSearch} />
    </View>
  )
}
