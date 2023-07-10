import React, { useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { ListEmpty } from '@components';
import { HeaderSearch } from '@components/HeaderSearch'
import { ListLoading } from '@components/Placeholder';
import { navigate } from '@navigation';
import { AnimatedList } from '@screen/app/DenyAdmin/screens/ListAnimate';
import { ItemLockApartment, ModalListLook } from '../components';
import { createArray } from '@utils/array';
import { Block } from '@mylib/UIKit';
import { useListLookBookApart } from '@service/hook';
import { Log } from '@utils/Log';


const animateList = new AnimatedList()
export default function ListLookApartment() {
    const modalRef = useRef<any>(null)
    const _onSearch = async (e: any) => {
        // await updateParamsRef(e);
        // await onRefresh();
    };
    const {
        data,
        onRefresh,
        loading,
        onLoadMore,
        loadingEnd
    } = useListLookBookApart<any[]>();
    // Log.d('data', data)
    let Container = View
    return (
        <Container style={{ flex: 1 }}>
            <animateList.AnimateHeader >
                <HeaderSearch
                    hiddenRight
                    onFilter={() => modalRef.current?.open()}
                // onSearch={(e: any) => _onSearch({ key_search: e })}
                // onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
                // activeFilter={activeFilter(params)}
                />
            </animateList.AnimateHeader>
            <ListLoading show={loading && data.length == 0} />
            <FlatList
                data={data}
                refreshing={loading}
                onRefresh={onRefresh}
                onScroll={animateList.onScroll}
                contentContainerStyle={{ paddingTop: animateList.headerHeight, paddingBottom: 60, paddingHorizontal: 10 }}
                onEndReached={onLoadMore}
                keyExtractor={(_item, index) => `${index}`}
                renderItem={({ item, index }: any) => (
                    <Animatable.View
                        key={index}
                        animation="fadeInUp"
                        delay={index < 10 ? index * 80 : 1}
                        useNativeDriver>
                        <ItemLockApartment
                            item={item}
                            index={index}
                            onPress={() => navigate('ScreenLookDetail', { id: item?.id })}
                        />
                    </Animatable.View>
                )}
                ListFooterComponent={<>{loadingEnd && <ActivityIndicator />}</>}
                ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
                ItemSeparatorComponent={() => <Block h={10} />}

            />
            <ModalListLook ref={modalRef} onSelected={_onSearch} />
        </Container>
    );
}
