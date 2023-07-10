import React, { useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, ActivityIndicator, Animated, } from 'react-native';
import { navigate } from '@navigation';
import { HeaderSearch } from '@components/HeaderSearch'
import { useListDeny } from '@service/store';
import { CustomerApi } from '@api/qsland/index';
import { ItemCustomerDeny } from '../components/ItemCustomerDeny';
import { ListEmpty } from '@components';
import { ToastAppError, ToastAppSuccess } from '@components';
import ModalListDeny from '../components/ModalListDeny';
import { Log } from '@utils';
import { AnimatedList } from './ListAnimate';
import ModalSendDeny from '../components/ModalSendDeny';



const animateList = new AnimatedList()

export default function ListCustomerDeny() {


  const {
    data,
    params,
    count,
    onRefresh,
    loading,
    onLoadMore,
    loading_more,
    end_data,
    updateParamsRef,
  } = useListDeny();

  const _onSearch = async (e: any) => {
    updateParamsRef(e);
    onRefresh();
  };
  const activeFilter = () => {
    if (
      params?.status ||
      params?.source_id ||
      params?.campaign_id ||
      params?.to ||
      params?.from
    )
      return true;
    return false;
  };
  // Log.d1('params', params)
  const oncancelExplanation = async (item: any) => {
    let res: any = null;
    res = await CustomerApi.cancelExplanation({ id: item.id });
    if (res?.status) {
      ToastAppSuccess(res?.mess);
      onRefresh();
    } else {
      ToastAppError(res?.mess);
    }
  };
  const modalRef = useRef<any>(null)
  const modal2Ref = useRef<any>(null)
  const [selectedItem, setSelectedItem] = React.useState<object>({});

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
      </animateList.AnimateHeader >
      <FlatList
        data={data}
        refreshing={loading}
        onRefresh={onRefresh}
        onEndReached={onLoadMore}
        onScroll={animateList.onScroll}
        contentContainerStyle={{ flexGrow: 1, paddingTop: animateList.headerHeight, paddingBottom: 60, paddingHorizontal: 10 }}
        keyExtractor={(_item, index) => `${index}`}
        renderItem={({ item, index }: any) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index < 10 ? index * 80 : 1}
            useNativeDriver>
            <ItemCustomerDeny
              item={item}
              index={index}
              onSend={() => {
                setSelectedItem(item)
                // , setIsModalExplanation(true);
                modal2Ref.current?.open()
              }}
              onCancel={() => oncancelExplanation(item)}
              onPress={() => navigate('ScreenDenyDetail', { id: item.id })}
            />
          </Animatable.View>
        )}
        ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
        ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
      />
      <ModalListDeny ref={modalRef} onSelected={_onSearch} />
      <ModalSendDeny ref={modal2Ref} item={selectedItem} />
    </View>
  );
} 