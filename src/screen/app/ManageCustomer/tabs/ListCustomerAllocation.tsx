import React, { useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { navigate } from '@navigation';
import { AppLinking } from '@lib/utils';
import { HeaderSearch } from '@components/HeaderSearch'
import { ListEmpty } from '@components';
import { ListLoading } from '@components/Placeholder';
import { ItemCustomerAllocation } from '../components/ItemCustomerAllocation';
import { useListAllocation } from '@service/store';
import ModalListAllocation from '../components/ModalListAllocation';
import { ALLOCATION_STATUS } from '../components/@Status';
import { AnimatedList } from './ListAnimate';

const animateList = new AnimatedList()
export default function ListCustomerAllocation() {
  const modalRef = useRef<any>(null)
  const _onSearch = async (e: any) => {
    await updateParamsRef(e);
    await onRefresh();
  };
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
  } = useListAllocation();
  const activeFilter = () => {
    if (
      params?.interactive_status ||
      params?.source_id ||
      params?.to ||
      params?.from
    )
      return true;
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      <animateList.AnimateHeader >
        <HeaderSearch
          hiddenRight
          onFilter={() => modalRef.current?.open()}
          onSearch={(e: any) => _onSearch({ key_search: e })}
          onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
          activeFilter={activeFilter()}
        />
      </animateList.AnimateHeader>
      <ListLoading show={loading && data.length == 0} />
      <FlatList
        data={data}
        refreshing={loading}
        onRefresh={onRefresh}
        onScroll={animateList.onScroll}
        contentContainerStyle={{ flexGrow: 1, paddingTop: animateList.headerHeight, paddingBottom: 60, paddingHorizontal: 10 }}
        onEndReached={onLoadMore}
        keyExtractor={(_item, index) => `${index}`}
        renderItem={({ item, index }: any) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index < 10 ? index * 80 : 1}
            useNativeDriver>
            <ItemCustomerAllocation
              item={item}
              index={index}
              onPress={() => {
                if (item.status_allocation === ALLOCATION_STATUS.da_phan_bo.id)
                  return navigate('ScreenAllocationDetail', { id: item?.id })
              }}
              onCall={() => AppLinking.call(item.phone)}
            />
          </Animatable.View>
        )}
        ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
        ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
      />
      <ModalListAllocation ref={modalRef} onSelected={_onSearch} />
    </View>
  );
}
