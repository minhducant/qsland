import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, Touch } from '@mylib';
import { stylesApp, TextApp } from '@components';
import ButtonApp from '@components/ButtonApp';
import { AppColor } from '@assets/colors';
import { DefineItem, MappedItem } from '@utils/type/core';
import { Log } from '@utils/Log';
import { AppLang } from '@assets/langs';
import { AppDate } from '@utils/date';
import moment from 'moment';
import { checkStatusCampaign } from '../api';
import { navigate } from '@navigation';
export default function ItemCampaign({ item, onPress }: DefineItem<MappedItem<typeof _data>>) {
    const active = item?.status == 1 ? checkStatusCampaign(item.time_start, item.time_end) : false
    const color = active ? undefined : 'gray'
    return (
        <Touch onPress={onPress} styleBox={styles.container} pad10 white padT20 >
            <TextApp toUpperCase size18 bold >{item.title}{__DEV__ && ` [${item.id}]`}</TextApp>
            <TextApp >{AppLang('so_cho_toi_da').concat(': ')}{item?.max}</TextApp>
            <TextApp >{AppLang('so_cho_con_lai').concat(': ')}{item?.vacant_position}</TextApp>
            <Block row centerBetween minH={50}>
                <TextApp >{AppLang('so_tien_yeu_cau').concat(': ')}{item.total}</TextApp>
                <ButtonApp
                    onPress={() => navigate('ScreenCampaignRegister', {
                        campaign_sale_id: item.id,
                        building_id: item.building_id,
                        category_id: item.category_id
                    })}
                    hidden={!active} title={AppLang('dat_cho')} background={color} />
            </Block>
            <TextApp >
                {AppLang('thoi_han').concat(': ')}
                {AppLang('tu').concat(' ')}
                {AppDate.format2(item?.time_start)}
                {' '}{AppLang('den').toLocaleLowerCase().concat(' ')}
                {AppDate.format2(item?.time_end)}
            </TextApp>
            <Block style={styles.triangle} />
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
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 25,
        borderBottomWidth: 25,
        borderLeftWidth: 25,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: AppColor('primary'),
        borderLeftColor: 'transparent',
        transform: [{ rotateZ: '-45deg' }],
        position: 'absolute',
        top: -4,
        left: -16
    },
})
let _data = ["id", "title", "max", "time_start", "time_end", "category_id", "total", "company_id", "building_id", "deleted_at", "updated_at", "created_at", "desc", "status", "vacant_position"] as const
