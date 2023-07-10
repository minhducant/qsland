import React, { useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { ListEmpty } from '@components';
import { useListAdDenyWait } from '@service/store';
import { ListLoading } from '@components/Placeholder';
import ItemDenyAdminWait from '../components/ItemDenyAdminWait';
import ModalListAdDeny, { activeFilter } from '../components/ModalListAdDeny';
import { navigate } from '@navigation';
import { Log } from '@utils';
import { AnimatedList } from './ListAnimate';
import { HeaderSearch } from '@components/HeaderSearch';



const animateList = new AnimatedList()
export default function ListAdDenyWait() {
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
    } = useListAdDenyWait();
    let Container = View
    return (
        <Container style={{ flex: 1 }}>
            <animateList.AnimateHeader >
                <HeaderSearch
                    hiddenRight
                    onFilter={() => modalRef.current?.open()}
                    onSearch={(e: any) => _onSearch({ key_search: e })}
                    onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
                    activeFilter={activeFilter(params)}
                />
            </animateList.AnimateHeader>
            <ListLoading show={loading && data.length == 0} />
            <FlatList
                data={data}
                refreshing={loading}
                onRefresh={onRefresh}
                onScroll={animateList.onScroll}
                contentContainerStyle={{ flex: 1, paddingTop: animateList.headerHeight, paddingBottom: 60, paddingHorizontal: 10 }}
                onEndReached={onLoadMore}
                keyExtractor={(_item, index) => `${index}`}
                renderItem={({ item, index }: any) => (
                    <Animatable.View
                        key={index}
                        animation="fadeInUp"
                        delay={index < 10 ? index * 80 : 1}
                        useNativeDriver>
                        <ItemDenyAdminWait
                            item={item}
                            index={index}
                            onPress={() => navigate('ScreenAdDenyDetail', { id: item?.id })}
                        />
                    </Animatable.View>
                )}
                ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
                ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
            />
            <ModalListAdDeny type='wait' ref={modalRef} onSelected={_onSearch} />
        </Container>
    );
}
