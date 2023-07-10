import { Image, LayoutAnimation, Platform, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { useState } from 'react'
import { Block, IconC, ListData, Touch } from '@mylib/UIKit';
import { TextApp } from '@components';
import { AppLang } from '@assets/langs';
import ContentTransaction from './ContentTransaction';
import { MappedItem, DefineItem } from '@utils/type/core';
import { PAYMENT_HISTORY, TYPE_PAYMENT } from '@service/constant/constant';
import { useListExchange, useListStaff } from '@service/hook';
import { AppDate } from '@utils/date';
import { AppImage } from '@assets/image';
import { uriImg } from '@utils/index';
import { PayDetail } from '@utils/type';
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
export default function ItemPaymentHistory({ item, length, }: DefineItem<PayDetail>) {
    const transaction = PAYMENT_HISTORY[item?.status]
    const type_payment = TYPE_PAYMENT[item?.status]
    const dataStaff = useListStaff().dataKey
    const { dataKey } = useListExchange()
    const data = [
        { title: AppLang('ma_giao_dich'), value: item?.code },
        { title: AppLang('tinh_trang'), value: transaction?.name },
        { title: AppLang('ly_do_tu_choi'), value: item?.reason },
        { title: AppLang('so_tien_yeu_cau'), value: item?.will_pay },
        { title: AppLang('phuong_thuc'), value: type_payment?.name },
        { title: AppLang('thoi_gian_thanh_toan'), value: item?.payment_date },
        { title: AppLang('noi_dung_thanh_toan'), value: item?.desc },
        { title: AppLang('so_tien_ghi_nhan'), value: item?.will_pay },
        { title: AppLang('thoi_gian_duyet'), value: AppDate.format2(item?.confirm_date) },
        { title: AppLang('nhan_vien_yeu_cau'), value: dataStaff[item?.user_id_sale]?.full_name },
        { title: AppLang('phong_ban'), value: dataKey[item?.exchange_id]?.name },
        { title: AppLang('ghi_chu'), value: item?.note },
        { title: AppLang('hinh_anh'), value: '' },
    ]
    const [window, setWindow] = useState(length == 1 ? true : false)
    const switchWindow = () => {
        setWindow(p => !p)
        LayoutAnimation.easeInEaseOut()
    }

    return (
        <Block pad10 marB10 borderR5 borderW1 borderC="#ddd">
            <Touch onPress={switchWindow} h={40} row centerBetween >
                <TextApp bold primary>{AppLang('giao_dich_thanh_toan').concat(' ')}{item.code}</TextApp>
                <IconC name={window ? 'chevron-up-outline' : 'chevron-down-outline'} color="gray" />
            </Touch>
            <Block hidden={!window} h={1} background="#ddd" w100 marB10 />
            <Block h={window ? undefined : 1} overHidden>
                <ListData data={data} renderItem={({ item }) =>
                    <ContentTransaction title={item.title} value={item.value} />}
                />
                <Image
                    defaultSource={AppImage('logo_bg1')}
                    source={uriImg(item?.image, AppImage('logo_bg1'))}
                    style={{ width: 200, height: 200, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                />
            </Block>
        </Block >
    )
}

