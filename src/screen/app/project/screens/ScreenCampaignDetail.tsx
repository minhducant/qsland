import React from 'react'
import { Block, Touch } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { createArray2 } from '@utils/array';
import { ItemCampaign } from '../components'
import { navigate } from '@navigation/rootNavigation'
import ButtonApp from '@components/ButtonApp'
import { TextApp } from '@components/text'
import { stylesApp } from '@components/index'
import { AppColor } from '@assets/colors'
import { useCampaignSaleDetail, useListBuilding, useListCategories, useListExchange, useProjectDetail } from '@service/hook'
import { Log } from '@utils/Log'
import { MappedItem } from '@utils/type/core';
import { AppDate } from '@utils/date'
import { checkStatusCampaign } from '../api'
let key_data = ["id", "title", "max", "time_start", "time_end", "category_id", "total", "company_id", "building_id", "deleted_at", "updated_at", "created_at", "desc", "status"] as const
export default function ScreenCampaignDetail({ route }: any) {
    const { id } = route.params
    const { data, onRefresh, loading } = useCampaignSaleDetail<MappedItem<typeof key_data>>(id)
    // const dataKey = useListExchange()
    const { dataKey } = useListCategories()
    const { dataKey: dataKeyBuilding } = useListBuilding()
    // Log.d1('data', data)
    // Log.d1('dataKey', dataKey)
    const active = data?.status == 1 ? checkStatusCampaign(data?.time_start, data?.time_end) : false
    const building_name = dataKeyBuilding[data?.building_id]?.name
    const category_name = dataKey[data?.category_id]?.name
    const campaign_name = data?.title
    const onRegister = () => {
        navigate('ScreenCampaignRegister',
            {
                campaign_sale: { title: campaign_name, id: data?.id },
                building: { cb_title: building_name, id: data?.building_id },
                category: { name: category_name, id: data?.category_id },
                total: data?.total
            })
    }
    return (
        <ScreenApp back title={campaign_name ?? AppLang('thong_tin_chien_dich')}>
            <Block flex1 bgW>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={{ paddingBottom: 400 }}>
                    <Touch pad10 white padT20 styleBox={styles.container} mar10 >
                        <TextApp toUpperCase size18 bold >{campaign_name}</TextApp>
                        <Block style={styles.triangle} />
                    </Touch>
                    <Block mar10>
                        <TextApp toUpperCase lang="mo_ta"></TextApp>
                        <TextApp  >{data?.desc}</TextApp>
                    </Block>
                    <Block pad10 >
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="chi_tiet" toUpperCase size16></TextApp>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="so_cho_toi_da"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{data?.max}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="so_tien_yeu_cau"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{data?.total}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="thoi_gian_bat_dau"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{AppDate.format2(data?.time_start)}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="thoi_gian_ket_thuc"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{AppDate.format2(data?.time_end)}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="du_an"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{category_name}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="toa"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{building_name}</TextApp>
                            </Block>
                        </Block>
                    </Block>
                    <Block hidden={!active} mid pad10 marT={50}>
                        <ButtonApp toUpperCase
                            onPress={onRegister}

                            style={{ width: '100%', height: 45 }} title={AppLang('dat_cho')} />
                    </Block>
                </ScrollView>
            </Block>
        </ScreenApp>
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