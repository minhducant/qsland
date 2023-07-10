import { ActivityIndicator, Animated, FlatList, Image, StatusBar, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Block, } from '@mylib';
import ScreenApp from '@components/layout/ScreenApp';
import { AppLang } from '@assets/langs';
import { useListCategory } from '@service/store';
import * as Animatable from 'react-native-animatable';
import { ItemListProject, ListProjectPopular, ModalListProject } from '../components';
import { ListEmpty } from '@components/ListEmpty';
import { useRoute } from '@react-navigation/native';
import { BottomAnimate } from '@screen/app/dashboard/container/BottomHome';

import { useIsFocused } from "@react-navigation/native";
import { AnimatedList } from './ListAnimate';
import { HeaderSearch } from '@components/HeaderSearch'
import { navigate, openDrawer } from '@navigation';
import { TextApp } from '@components/text';
import { Log } from '@utils/Log';
const animateList = new AnimatedList()
class Test {
    a = {}

    setA(e: any) { this.a = e }
    getA() { return this.a }
}
const test = new Test()
export default function ScreenListProject() {
    const { name } = useRoute()
    const isFocused = useIsFocused();
    Log.d('name', name)
    useEffect(() => {
        if (isFocused) {
            BottomAnimate.animate(name)
        }
    }, [isFocused])

    // if (!__DEV__) return <ScreenDeveloper />

    const {
        data,
        params,
        updateParamsRef,
        onRefresh,
        loading,
        onLoadMore,
        loading_more,
    } = useListCategory();
    const activeFilter = (params: any) => {
        const { city_id, district_id, type_project, apartment_grid } = params
        if (city_id || district_id || type_project || apartment_grid)
            return true;
        return false;
    };
    const _onSearch = async (e: any) => {
        await updateParamsRef(e);
        await onRefresh();
    };
    const modalRef = useRef<any>(null)
    return (
        <ScreenApp
            iconLeft='menu'
            onLeft={openDrawer}
            title={AppLang('du_an')}
        >

            <Block flex1 bgW overHidden>
                <animateList.AnimateHeader >
                    <HeaderSearch
                        hiddenRight
                        onFilter={() => modalRef.current?.open()}
                        onSearch={(e: any) => _onSearch({ cb_title: e })}
                        onSubmitEditing={(e: any) => _onSearch({ cb_title: e })}
                        activeFilter={activeFilter(params)}
                    />
                </animateList.AnimateHeader>
                <FlatList
                    onScroll={animateList.onScroll}
                    ListHeaderComponent={<ListProjectPopular />}
                    data={data}
                    refreshing={loading}
                    onRefresh={onRefresh}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, paddingHorizontal: 10, paddingTop: animateList.headerHeight, }}
                    onEndReached={onLoadMore}
                    keyExtractor={(_item, index) => `${index}`}
                    ItemSeparatorComponent={() => <Block h={10} />}
                    renderItem={({ item, index }: any) => (
                        <Animatable.View
                            key={index}
                            animation="fadeInUp"
                            delay={index < 10 ? index * 80 : 1}
                            useNativeDriver>
                            <ItemListProject
                                item={item}
                                index={index}
                                onPress={() => navigate('ScreenProjectDetail', { id: item?.id })}
                            />
                        </Animatable.View>
                    )}
                    ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
                    ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
                />
            </Block>
            <ModalListProject ref={modalRef} onSelected={_onSearch} />
        </ScreenApp>
    )
}
