import { ListEmpty } from '@components/ListEmpty';
import { Block } from '@mylib/UIKit';
import { navigate } from '@navigation/rootNavigation';
import { useListEvents } from '@service/hook';
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { ItemEvent, ItemEventA } from '../components';

export default function ListEventB() {
  const { data, loading, onRefresh, onLoadMore, loadingEnd } = useListEvents<any>({})
  return (
    <FlatList
      // onScroll={animateList.onScroll}
      // ListHeaderComponent={<ListProjectPopular data={data} />}
      data={data}
      refreshing={loading}
      onRefresh={onRefresh}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, paddingHorizontal: 10, paddingTop: 10 }}
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
