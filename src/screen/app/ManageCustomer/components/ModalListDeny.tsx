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
import { useListCampaignCustomer, useListGroupCustomer, useListSourceCustomer } from '@service/hook';
import { Log } from '@utils';
import { STATUS_DENY, STATUS_ME } from './@Status';
import { ModalDate } from '@components/selected/Dates/ModalDate'
import moment from 'moment';
import { isEmpty } from 'underscore';
import { ItemOption, ItemOptionDate } from './ModalListMe';
const initOptions = {
    from: { name: '', value: null },
    to: { name: '', value: null },
    status: { name: '', value: null },
    source: { name: '', value: null },
    group: { name: '', value: null },
    campaign: { name: '', value: null },
}
const ModalListDeny = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const refRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const sourceRef = useRef<any>(null)
    const campaignRef = useRef<any>(null)

    const fromRef = useRef<any>(null)
    const toRef = useRef<any>(null)
    // const { data: ListGroup, onRefresh: onRefreshGroup } = useListGroupCustomer()
    const { data: ListSource, onRefresh: onRefreshSource } = useListSourceCustomer()
    const { data: ListCampaign, onRefresh: onRefreshCampaign } = useListCampaignCustomer()


    const ListStatus = Object.entries(STATUS_DENY).map(([id, value]) => ({ id: Number(id), ...value }))
    const [options, setOptions] = useState({ ...initOptions })
    // Log.d('ListGroup', ListGroup)
    const onSave = () => {
        onSelected({
            from: options.from.value,
            to: options.to.value,
            status: options.status.value,
            source_id: options.source.value,
            // group_customer_id: options.group.value,
            campaign_id: options.campaign.value,
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
            // group_customer_id: null,
            campaign_id: null
        })
        refRef.current?.close()
    }
    const onSelectOption = (key: any, data: any) => {
        setOptions(prev => ({ ...prev, [key]: data }))
    }
    return (
        <BottomSheet ref={refRef} draggable={false} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
            <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
                <TextApp size18 bold center>{AppLang('loc_khach_hang')}</TextApp>
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
                    <ItemOption value={options.status.name} title={AppLang('loc_kh_theo_tinh_trang_vi_pham')} onPress={() => statusRef.current?.open()} />
                    <ItemOption value={options.source.name} title={AppLang('loc_kh_theo_nguon')} onPress={() => sourceRef.current?.open()} />
                    {/* <ItemOption value={options.group.name} title={AppLang('loc_kh_theo_nhom_khach_hang')}  onPress={() => sourceRef.current?.open()} /> */}
                    < ItemOption value={options.campaign.name} title={AppLang('loc_kh_theo_chien_dich')} onPress={() => campaignRef.current?.open()} />
                </Block>
            </ScrollView>
            <Block row justifyContent='flex-end' padH20 marT10 >
                <ButtonApp onPress={onCancel} title={AppLang('bo_qua')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} />
                <ButtonApp onPress={onSave} title={AppLang('xac_nhan')} style={{ width: '30%' }} />
            </Block>
            <ActionSheetIos onPressButton={(value) => onSelectOption('status', { value: value?.id, name: value?.name })} options={ListStatus} ref={statusRef} onCancel={() => statusRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshSource} onPressButton={(value) => onSelectOption('source', { value: value?.id, name: value?.name })} options={ListSource} ref={sourceRef} onCancel={() => sourceRef.current?.close()} textCancel={AppLang('huy')} />
            {/* <ActionSheetIos onRefresh={onRefreshSource} onPressButton={(value) => onSelectOption('source', { value: value?.id, name: value?.name })} options={ListSource} ref={sourceRef} onCancel={() => sourceRef.current?.close()} textCancel={AppLang('huy')} /> */}
            <ActionSheetIos onRefresh={onRefreshCampaign} onPressButton={(value) => onSelectOption('campaign', { value: value?.id, name: value?.name })} options={ListCampaign} ref={campaignRef} onCancel={() => campaignRef.current?.close()} textCancel={AppLang('huy')} />
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
export default ModalListDeny
