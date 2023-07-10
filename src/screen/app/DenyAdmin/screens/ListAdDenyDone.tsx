import React, { useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { ListEmpty } from '@components';
import { useListAdDenyDone } from '@service/store';
import { HeaderSearch } from '@components/HeaderSearch'
import ItemDenyAdminDone from '../components/ItemDenyAdminDone';
import ModalListAdDeny, { activeFilter } from '../components/ModalListAdDeny';
import { navigate } from '@navigation';
import { Log } from '@utils';
import { AnimatedList } from './ListAnimate';
import { ListLoading } from '@components/Placeholder';

const animateList = new AnimatedList()

export default function ListAdDenyDone() {
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
    } = useListAdDenyDone();

    return (
        <View style={{ flex: 1 }}>
            <animateList.AnimateHeader >
                <HeaderSearch
                    hiddenRight
                    onFilter={() => modalRef.current?.open()}
                    onSearch={(e: any) => _onSearch({ key_search: e })}
                    onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
                    activeFilter={activeFilter(params)}
                /></animateList.AnimateHeader >
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
                        <ItemDenyAdminDone
                            item={item}
                            index={index}
                            onPress={() => navigate('ScreenAdDenyDetail', { id: item?.id })}
                        />
                    </Animatable.View>
                )}
                ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
                ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
            />
            <ModalListAdDeny type='done' ref={modalRef} onSelected={_onSearch} />
        </View>
    );
}
