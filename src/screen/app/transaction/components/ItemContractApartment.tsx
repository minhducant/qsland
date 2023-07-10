import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, IconC, Touch } from '@mylib';
import { stylesApp, TextApp } from '@components';
import ButtonApp from '@components/ButtonApp';
import { AppColor } from '@assets/colors';
import { DefineItem, MappedItem } from '@utils/type/core';
import { useListCategories } from '@service/hook';
import { Log } from '@utils/Log';
import { uriImg } from '@utils/index';
import { AppImage } from '@assets/image';
import { TINH_TRANG_HOP_DONG } from '@service/constant/constant';
import { AppDate } from '@utils/date';
const _key = [
    "id", "parent_id",
    "status", "title", "code", "user_sale_id",
    "note", "type", "deleted_at", "updated_at",
    "created_at", "customer_id", "product_id",
    "campaign_sale_id", "category_id", "building_id",
    "file", "opt", "wish", "info_customer"
] as const
export default function ItemContractApartment({ item, onPress }: DefineItem<MappedItem<typeof _key>>) {
    const { dataKey } = useListCategories()
    const category_name = dataKey[item?.category_id]?.name ?? "Dự án k thấy"
    const category_image = dataKey[item?.category_id]?.image
    const trang_thai = TINH_TRANG_HOP_DONG[item.status]
    return (
        <Touch onPress={onPress} styleBox={styles.container} pad10 white padT20 row>
            <Block  >
                <Image defaultSource={AppImage('logo_bg1')}
                    source={uriImg(category_image, AppImage('logo_bg1'))}
                    style={{ width: 50, height: 50, borderRadius: 5 }} />
            </Block>
            <Block flex1 marL10>
                <TextApp toUpperCase bold ellipsizeMode='middle' numberOfLines={1}>{item?.code}</TextApp>
                <TextApp >{category_name}</TextApp>
                {__DEV__ && <TextApp red>id={item.id}</TextApp>}
                {__DEV__ && <TextApp red>user_sale_id={item?.user_sale_id}</TextApp>}
            </Block>
            <Block alignItems='flex-end'>
                <TextApp bold primary>{trang_thai?.name}</TextApp>
                <TextApp style={{ marginTop: 5 }}>{AppDate.format3(item?.created_at)}</TextApp>
            </Block>
        </Touch>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderTopWidth: 0.5,
        borderColor: '#eee',
        ...stylesApp.shawDow
    },

})