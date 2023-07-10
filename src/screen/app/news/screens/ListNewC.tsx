import { ListEmpty } from '@components/ListEmpty';
import { Block } from '@mylib/UIKit';
import { navigate } from '@navigation/rootNavigation';
import { useListNews } from '@service/hook';
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { ItemEvent } from '../components';
import { TYPE_NEWS } from '@service/constant/constant';

export default function ListNewC() {
  const { data, loading, onRefresh, onLoadMore, loadingEnd } = useListNews<any>({ type: TYPE_NEWS.sk_mo_ban.id })
  return (
    <FlatList
      // onScroll={animateList.onScroll}
      // ListHeaderComponent={<ListProjectPopular data={data} />}
      data={data}
      refreshing={loading}
      onRefresh={onRefresh}
      // contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, paddingHorizontal: 10, paddingTop: animateList.headerHeight, }}
      onEndReached={onLoadMore}
      keyExtractor={(item, index) => `${index}`}
      ItemSeparatorComponent={() => <Block h={10} />}
      renderItem={({ item, index }: any) => (
        <Animatable.View
          key={index}
          animation="fadeInUp"
          delay={index < 10 ? index * 80 : 1}
          useNativeDriver>
          <ItemEvent
            item={item}
            index={index}
            onPress={() => navigate('ScreenEventDetail', { id: item?.id })}
          />
        </Animatable.View>
      )}
      ListFooterComponent={<>{loadingEnd && <ActivityIndicator />}</>}
      ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
    />
  )
}

const styles = StyleSheet.create({})
