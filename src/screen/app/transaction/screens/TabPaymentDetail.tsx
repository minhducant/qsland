
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block } from '@mylib/UIKit';
import { ItemPaymentHistory } from '../components';
import { TextApp } from '@components/text';
import ButtonApp from '@components/ButtonApp';
import { AppLang } from '@assets/langs';
import { navigate } from '@navigation/rootNavigation';
import { Log } from '@utils/Log';
import { useDetailBill } from '@service/store';
import { arrayData } from '@utils/format';
import { isArray } from 'underscore';

export default function TabPaymentDetail({ id }: any) {
    Log.d('id', id)
    if (id === undefined) return null
    const { data: trans, onRefresh, permission } = useDetailBill()
    const { payment_history, bill } = trans
    if (!isArray(payment_history)) return null
    const AddPayment = () =>
        <Block >
            <ButtonApp
                hidden={!permission.yc_thanh_toan}
                onPress={() => navigate('ScreenBillAddPayment', { id: bill?.id })}
                title={AppLang('them_yeu_cau_thanh_toan')}
            />
        </Block >
    return (
        <Block flex1>
            <Block mar10>
                <TextApp bold lang="cac_dot_thanh_toan" />
            </Block>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
                data={payment_history}
                renderItem={({ item }) => <ItemPaymentHistory item={item} length={payment_history.length} bill={bill} />}
                ListFooterComponent={() => <AddPayment />}
                ListEmptyComponent={() => <AddPayment />}
            />
        </Block>
    )
}

const styles = StyleSheet.create({})
