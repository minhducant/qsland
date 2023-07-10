import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomSheet } from '@components/Sheet';
import { Block, IconC, Touch } from '@mylib/UIKit';
import { ListEmpty, TextApp } from '@components';
import { AppLang } from '@assets/langs';
import { useListMe } from '@service/store';
import { DefineItem, MappedItem } from '@utils/type/core';
import { HeaderSearch } from '@components/HeaderSearch'
import { navigate } from '@navigation/rootNavigation';

const ModalSelectCustomer = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const refRef = useRef<any>(null)
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
    const _onSearch = async (e: any) => {
        await updateParamsRef(e)
        await onRefresh()
    }
    // Log.e1('options', options)
    return (
        <BottomSheet ref={refRef} draggable={false} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
            <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
                <TextApp size18 bold center>{AppLang('chon_khach_hang')}</TextApp>
                <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { refRef.current?.close() }} />
            </Block>
            <Block h={50}>
                <HeaderSearch
                    filter={false}
                    onSearch={(e: any) => _onSearch({ key_search: e })}
                    onSubmitEditing={(e: any) => _onSearch({ key_search: e })}
                    onRightAdd={() => {
                        refRef.current?.close()
                        navigate('ScreenCustomerAdd')
                    }}
                // activeFilter={activeFilter()}
                />
            </Block>
            <FlatList
                data={data}
                refreshing={loading}
                onRefresh={onRefresh}
                ListFooterComponent={<>{loading_more && <ActivityIndicator />}</>}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                // onScroll={animateList.onScroll}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                onEndReached={onLoadMore}
                keyExtractor={(_item, index) => `${index}`}
                renderItem={({ item, index }) => <Item item={item} index={index} onPress={() => {
                    onSelected(item)
                    refRef.current?.close()
                }}
                />}
                ItemSeparatorComponent={() => <Block h={1} gray />}
                ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
            />
        </BottomSheet>
    )
})
export default ModalSelectCustomer
const Item = ({ item, onPress }: DefineItem<MappedItem<typeof _keyItem>>) => {
    return (
        <Touch pad10 onPress={onPress} >
            <Block>
                <TextApp bold>{item?.full_name}</TextApp>
            </Block>
            <Block row marT5>
                <TextApp><IconC name={"call-outline"} size={14} />{' '}{item?.phone}</TextApp>
                <Block w={20} />
                <TextApp><IconC name={"mail-outline"} size={14} />{' '}{item?.email ?? AppLang('dang_cap_nhat2')}</TextApp>
            </Block>
        </Touch>
    )
}

let _keyItem = ["id", "category_id", "user_id_sale", "city_id", "district_id", "ward_id", "cb_city_id", "cb_district_id", "cb_ward_id", "country", "code_area", "birthday", "sex", "customer_code", "cmt_full_name", "full_name", "phone", "email", "note", "create_date", "create_by", "address", "cb_address", "interactive_status", "interactive_form", "create_type", "status_allocation", "cmt_number", "source_id", "campaign_id", "group_customer_id", "created_at", "deleted_at", "updated_at", "images", "cmt_date", "cmt_address", "final_time_care", "exchange_name", "final_date", "allocation_date"] as const