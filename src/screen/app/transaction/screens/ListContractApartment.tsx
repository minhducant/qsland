import React, { useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { ListEmpty } from '@components';
import { HeaderSearch } from '@components/HeaderSearch'
import { ListLoading } from '@components/Placeholder';
import { navigate } from '@navigation';
import { AnimatedList } from '@screen/app/DenyAdmin/screens/ListAnimate';
import { ItemContractApartment, ItemLockApartment, ModalListContract, activeFilter, ModalListLook } from '../components';
import { createArray } from '@utils/array';
import { Block } from '@mylib/UIKit';
import { useListLookBookApart } from '@service/hook';
import { Log } from '@utils/Log';


const animateList = new AnimatedList()
export default function ListLookApartment() {
    const modalRef = useRef<any>(null)
    const _onSearch = async (e: any) => {
        await updateParamInit(e);
        await onRefresh();
    };
    const {
        data,
        onRefresh,
        loading,
        onLoadMore,
        loadingEnd,
        updateParamInit,
        params,
    } = useListLookBookApart<any[]>();
    // Log.d1('data', data.length)
    // let Container = View
    return (
        <Block flex1 >
            <animateList.AnimateHeader >
                <HeaderSearch
                    placeholder='Tìm theo mã căn'
                    hiddenRight
                    onFilter={() => modalRef.current?.open()}
                    onSearch={(e: any) => _onSearch({ code: e })}
                    onSubmitEditing={(e: any) => _onSearch({ code: e })}
                    activeFilter={activeFilter(params)}
                />
            </animateList.AnimateHeader>
            <ListLoading show={loading && data.length == 0} />
            <Block flex1  >
                <FlatList
                    data={[...data, ...data]}
                    refreshing={loading}
                    onRefresh={onRefresh}
                    onScroll={animateList.onScroll}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingTop: animateList.headerHeight,
                        paddingBottom: animateList.headerHeight + 100,
                        paddingHorizontal: 10
                    }}
                    onEndReached={onLoadMore}
                    keyExtractor={(_item, index) => `${index}`}
                    renderItem={({ item, index }: any) => (
                        <Animatable.View
                            key={index}
                            animation="fadeInUp"
                            delay={index < 10 ? index * 80 : 1}
                            useNativeDriver>
                            <ItemContractApartment
                                item={item}
                                index={index}
                                onPress={() => navigate('ScreenContractDetail', { id: item?.id, })}
                            />
                        </Animatable.View>
                    )}
                    ListFooterComponent={<>{loadingEnd && <ActivityIndicator />}</>}
                    ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
                    ItemSeparatorComponent={() => <Block h={10} />}

                />
            </Block>
            <ModalListContract ref={modalRef} onSelected={_onSearch} />
        </Block>
    );
}
