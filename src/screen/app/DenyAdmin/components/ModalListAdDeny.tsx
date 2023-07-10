import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomSheet } from '@components/Sheet';
import { Block, IconC, Touch } from '@mylib/UIKit';
import { TextApp } from '@components';
import { AppLang } from '@assets/langs';
import ButtonApp from '@components/ButtonApp';
import { AppColor } from '@assets/colors';
import { ScrollView } from 'react-native';
import ActionSheetIos from '@components/Sheet/ActionSheetIos';
import { useListCampaignCustomer, useListCategories, useListExchange, useListGroupCustomer, useListSourceCustomer, useListStaff } from '@service/hook';
import { Log } from '@utils';
import { STATUS_DENY_ADMIN } from './api';
import { ModalDate } from '@components/selected/Dates/ModalDate'
import moment from 'moment';
import { isEmpty } from 'underscore';
const initOptions = {
    from: { name: '', value: null },
    to: { name: '', value: null },
    status: { name: '', value: null },
    source: { name: '', value: null },
    group: { name: '', value: null },
    campaign: { name: '', value: null },
    staff: { name: '', value: null },
    exchange: { name: '', value: null },
    category: { name: '', value: null },
}
export const activeFilter = (params: any) => {
    if (
        params?.from ||
        params?.to ||
        params?.status ||
        params?.source_id ||
        params?.campaign_id ||
        params?.user_id_sale ||
        params?.exchange_id ||
        params?.category_id
    )
        return true;
    return false;
};
interface ModalListAdDenyProps {
    onSelected: (e: any) => any
    type?: "wait" | 'done' | 'none'
}
const ModalListAdDeny = React.forwardRef<any, ModalListAdDenyProps>(({ onSelected, type }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const refRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const groupRef = useRef<any>(null)
    const sourceRef = useRef<any>(null)
    const campaignRef = useRef<any>(null)
    const fromRef = useRef<any>(null)
    const toRef = useRef<any>(null)
    const staffRef = useRef<any>(null)
    const exchangeRef = useRef<any>(null)
    const categoryRef = useRef<any>(null)

    const { data: ListGroup, onRefresh: onRefreshGroup } = useListGroupCustomer()
    const { data: ListExchange, onRefresh: onRefreshListExchange } = useListExchange()
    const { data: ListStaff, onRefresh: onRefreshListStaff } = useListStaff()
    const { data: ListCategories, onRefresh: onRefreshListCategories } = useListCategories()
    const { data: ListCampaign, onRefresh: onRefreshCampaign } = useListCampaignCustomer()

    const ListStatus = Object.entries(STATUS_DENY_ADMIN).map(([id, value]: any) => {
        switch (type) {
            case 'wait':
                if (Number(id) == 2) return { id: Number(id), ...value }
                return null
            case 'done':
                if ([3, 4, 5, 6].includes(Number(id))) return { id: Number(id), ...value }
                return null
            case 'none':
                if (Number(id) == 1) return { id: Number(id), ...value }
                return null
            default:
                return null
        }
    }).filter(i => i != null)
    const [options, setOptions] = useState({ ...initOptions })
    // Log.d1('ListStaff', ListStaff)
    const onSave = () => {
        onSelected({
            from: options.from.value,
            to: options.to.value,
            status: JSON.stringify([options.status.value]),
            source_id: options.source.value,
            campaign_id: options.campaign.value,
            user_id_sale: options.staff.value,
            exchange_id: options.exchange.value,
            category_id: options.category.value,
        })
        refRef.current?.close()
    }
    const onCancel = () => {
        setOptions({ ...initOptions })
        onSelected && onSelected({
            from: null,
            to: null,
            status: null,
            source_id: null,
            campaign_id: null,
            user_id_sale: null,
            exchange_id: null,
            category_id: null
        })
        refRef.current?.close()
    }
    const onSelectOption = (key: any, data: any) => {
        setOptions(prev => ({ ...prev, [key]: data }))
    }
    return (
        <BottomSheet ref={refRef} draggable={false} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
            <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
                <TextApp size18 bold center>{AppLang('loc_khach_hang_vi_pham')}</TextApp>
                <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { refRef.current?.close() }} />
            </Block>
            <ScrollView>
                <Block pad10>
                    <ItemOptionDate
                        title={AppLang('loc_kh_theo_thoi_gian_tao')}
                        value1={options.from.name}
                        value2={options.to.name}
                        onPress1={() => fromRef.current?.open()}
                        onPress2={() => toRef.current?.open()}
                    />
                    <ItemOption value={options.staff.name} title={AppLang('loc_theo_nhan_vien')} onPress={() => staffRef.current?.open()} />
                    <ItemOption value={options.exchange.name} title={AppLang('loc_theo_san')} onPress={() => exchangeRef.current?.open()} />
                    {type == "done" && <ItemOption value={options.status.name} title={AppLang('loc_theo_tinh_trang_vi_pham')} onPress={() => statusRef.current?.open()} />}
                    <ItemOption value={options.campaign.name} title={AppLang('loc_theo_chien_dich')} onPress={() => campaignRef.current?.open()} />
                    {/* <ItemOption value={options.category.name} title={AppLang('loc_theo_du_an')} onPress={() => categoryRef.current?.open()} /> */}
                </Block>
            </ScrollView>
            <Block row justifyContent='flex-end' padH20 marT10 >
                <ButtonApp onPress={onCancel} title={AppLang('bo_qua')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} />
                <ButtonApp onPress={onSave} title={AppLang('xac_nhan')} style={{ width: '30%' }} />
            </Block>
            {/* // */}
            <ActionSheetIos onRefresh={onRefreshListStaff} onPressButton={(value) => onSelectOption('staff', { value: value?.id, name: value?.full_name })} keyValue="full_name" options={ListStaff} ref={staffRef} onCancel={() => staffRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshListExchange} onPressButton={(value) => onSelectOption('exchange', { value: value?.id, name: value?.name })} options={ListExchange} ref={exchangeRef} onCancel={() => exchangeRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onPressButton={(value) => onSelectOption('status', { value: value?.id, name: value?.name })} options={ListStatus} ref={statusRef} onCancel={() => statusRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshCampaign} onPressButton={(value) => onSelectOption('campaign', { value: value?.id, name: value?.name })} options={ListCampaign} ref={campaignRef} onCancel={() => campaignRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshListCategories} onPressButton={(value) => onSelectOption('category', { value: value?.id, name: value?.name })} options={ListCategories} ref={categoryRef} onCancel={() => categoryRef.current?.close()} textCancel={AppLang('huy')} />
            <ModalDate
                ref={fromRef}
                onCancel={() => fromRef.current.close()}
                onSelectDate={value => onSelectOption('from', { name: moment(value).format('DD-MM-YYYY'), value: moment(value).format('YYYY-MM-DD') })}
            />
            <ModalDate
                ref={toRef}
                onCancel={() => toRef.current.close()}
                onSelectDate={value => onSelectOption('to', { name: moment(value).format('DD-MM-YYYY'), value: moment(value).format('YYYY-MM-DD') })}
            />
        </BottomSheet>
    )
})
export default ModalListAdDeny
export const ItemOption = ({ title, value, onPress }: any) =>
    <Block marT10>
        <Block>
            <TextApp bold>{title}</TextApp>
        </Block>
        <Touch onPress={onPress} minH={45} bg="#eee" pad5 marT10 borderR={5} row centerH padH10>
            {!isEmpty(value) && <TextApp bold color={AppColor('primary')}>{value}</TextApp>}
            {isEmpty(value) && <TextApp color='gray'>{AppLang('chon')}</TextApp>}
            <IconC name="chevron-down-outline" />
        </Touch>
    </Block>
export const ItemOptionDate = ({ title, value1, value2, onPress1, onPress2 }: any) =>
    <Block marT10>
        <Block>
            <TextApp bold>{title}</TextApp>
        </Block>
        <Block minH={45} marT10 row centerH  >
            <Touch onPress={onPress1} flex1 centerH row bg="#eee" h100 padH10 borderR={5}>
                <TextApp  >{AppLang('tu')}</TextApp>
                <TextApp bold color={AppColor('primary')}>{value1}</TextApp>
                <IconC name="calendar-outline" />
            </Touch>
            <Block w={10} />
            <Touch onPress={onPress2} flex1 centerH row bg="#eee" h100 padH10 borderR={5}>
                <TextApp  >{AppLang('den')}</TextApp>
                <TextApp bold color={AppColor('primary')}>{value2}</TextApp>
                <IconC name="calendar-outline" />
            </Touch>
        </Block>
    </Block>
