import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, TextApp, Touch, IconApp, AppStyle } from '@lib/components'
import { isString } from 'underscore'
import ButtonApp from '@components/ButtonApp'
import { AppLang } from '@assets/langs'
import { AppColor } from '@assets/colors'
import moment from 'moment'
import { STATUS_DENY_ADMIN } from './api'
import { useListCampaignCustomer, useListStaff } from '@service/hook'
import { AppDate } from '@utils/date'
export default function ItemDenyAdminDone({
    item,
    index,
    onPress,
    onSend,
    onCancel,
}: any) {
    const chien_dich = useListCampaignCustomer().dataKey
    const { dataKey } = useListStaff()
    const STATUS = STATUS_DENY_ADMIN[item?.status]
    const styleContainer = StyleSheet.flatten([
        styles.container,
        {
            borderTopWidth: index == 0 ? 0.8 : 0.2,
            borderColor: STATUS?.color,
            shadowColor: STATUS?.color,
        },
    ])
    const data = {
        full_name: item?.full_name,
        sale_name: item?.name_sale ?? dataKey[item?.user_id_sale]?.full_name,
        thu_hoi: AppDate.format3(item?.created_at),
        giai_trinh: AppDate.format3(item?.time_send_explanation),
        chien_dich: chien_dich[item?.campaign_id]?.name,
        ngay_duyet: AppDate.format3(item?.updated_at),
    }
    return (
        <>
            {__DEV__ &&
                <TextApp color='red'>
                    {'user_id_sale'}{JSON.stringify(item?.user_id_sale)}
                    {'\nid='}{JSON.stringify(item?.id)}
                </TextApp>
            }
            <Touch row centerBetween styleBox={styleContainer} onPress={onPress}>
                <Block>
                    <TextApp style={AppStyle.title}>{index + 1}{'. '}{data.full_name}{__DEV__ ? `   [${item?.status}]` : ''}</TextApp>
                    <Info value={data.sale_name} label={AppLang('sale').concat(':')} />
                    <Info value={data.thu_hoi} label={AppLang('thu_hoi').concat(':')} />
                    <Info value={data.giai_trinh} label={AppLang('giai_trinh').concat(':')} />
                    <Info value={data.chien_dich} label={AppLang('chien_dich').concat(':')} color={AppColor('primary')} />
                </Block>
                <Block mid>
                    <TextApp bold color={STATUS?.color}>{STATUS?.label}</TextApp>
                    <TextApp style={{ marginTop: 10 }}>{data.ngay_duyet}</TextApp>
                </Block>
            </Touch>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        paddingRight: 20,
        marginBottom: 15,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 2,

        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.1,
        borderWidth: 0.5,
        borderColor: '#eee',
        borderLeftWidth: 5,
    },
})

const Info = ({
    value,
    icon,
    label,
    color,
    textStyle,
}: {
    textStyle?: any
    value: any
    icon?: any
    label?: string
    color?: string
}) => {
    return (
        <Block row alignCenter marT={2}>
            {isString(icon) && <IconApp name={icon} size={18} />}
            {isString(label) && <TextApp style={[AppStyle.content]}>{label}</TextApp>}
            <TextApp
                style={[AppStyle.content, { marginLeft: 5, color: color }, textStyle]}>
                {value || ''}
            </TextApp>
        </Block>
    )
}
