import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native-animatable'
import { Block, IconC, Touch } from '@mylib';
import { stylesApp, TextApp } from '@components';
import { DefineItem, MappedItem } from '@utils/type/core';
import { useListCategories, useTimeCount } from '@service/hook';
import { AppLang } from '@assets/langs';
import { AppImage } from '@assets/image';
import { Log, uriImg } from '@utils/index';
import { AppColor } from '@assets/colors';
import { formatTime } from '@utils/date';

export default function ItemListBooking({ item, width, onPress }: DefineItem<MappedItem<typeof key_item>>) {
    const { dataKey } = useListCategories()
    const total = Number(item?.total_product) > 0 ? item?.total_product : ''


    return (
        <Touch onPress={onPress} styleBox={[styles.container, { width: width - 5, height: width }]}>
            <Image defaultSource={AppImage('logo_bg1')} source={uriImg(item?.image, AppImage('background'))} style={{ width: '100%', height: '55%', borderRadius: 10, }} />
            <Block flex1 pad5>
                <Block row centerH>
                    <IconC size={18} name="heart" color='red' />

                    <Block row alignCenter>
                        <TextApp size={14}>{formatTime(item?.time_hold * 60)}</TextApp>
                        <IconC size={18} name="timer-outline" color={AppColor('primary')} />
                    </Block>
                    <Block row alignCenter>
                        <TextApp>{total}{' '}</TextApp>
                        <IconC size={18} name="podium-outline" color='gray' />
                    </Block>
                </Block>
                <Block padT5>
                    <TextApp bold>{item?.name}</TextApp>
                    <TextApp size12 >{AppLang('du_an').concat(': ')}{dataKey[item?.category_id]?.name}</TextApp>
                </Block>
            </Block>
        </Touch>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 5 * 2,
        ...stylesApp.shawDow
    }
})
let key_item = ["total_product", "image", "id", "code", "name", "desc", "category_id", "time_hold", "company_id", "status", "created_at", "deleted_at", "updated_at"] as const