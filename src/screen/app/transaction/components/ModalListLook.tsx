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
import { useListGroupCustomer, useListSourceCustomer } from '@service/hook';
import { Log } from '@utils';
import { isEmpty } from 'underscore';
import { STATUS_ME } from '../../ManageCustomer/components/@Status';
const initOptions = {
    from: { name: '', value: null },
    to: { name: '', value: null },
    status: { name: '', value: null },
    source: { name: '', value: null },
    group: { name: '', value: null },
    category: { name: '', value: null },
}
const ModalListLook = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const refRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const groupRef = useRef<any>(null)
    const sourceRef = useRef<any>(null)
    const categoryRef = useRef<any>(null)
    const { data: ListGroup, onRefresh: onRefreshGroup } = useListGroupCustomer()
    const { data: ListSource, onRefresh: onRefreshSource } = useListSourceCustomer()

    const ListStatus = Object.entries(STATUS_ME).map(([id, value]) => ({ id: Number(id), ...value }))
    const [options, setOptions] = useState({ ...initOptions })

    const onSave = () => {
        onSelected({
            from: options.from.value,
            to: options.to.value,
            interactive_status: options.status.value,
            source_id: options.source.value,
            group_customer_id: options.group.value,
            category_id: options.category.value,
        })
        refRef.current?.close()
    }
    const onCancel = () => {
        setOptions({ ...initOptions })
        onSelected && onSelected({
            from: null,
            to: null,
            interactive_status: null,
            source_id: null,
            group_customer_id: null,
            category_id: null
        })
        setCategory([])
        refRef.current?.close()
    }
    const onSelectOption = (key: any, data: any) => {

        setOptions(prev => ({ ...prev, [key]: data }))
    }
    const [category, setCategory] = useState<any[]>([])
    const activeCategory = (item: any) => {
        if (category.find(i => i?.id == item?.id)) return true
        else return false
    }


    return (
        <BottomSheet ref={refRef} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
            <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
                <TextApp size18 bold center>{AppLang('Loc yeu cau')}</TextApp>
                <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { refRef.current?.close() }} />
            </Block>
            <ScrollView>
                <Block pad10>
                    {/* <ItemOption value={options.status.name} title={AppLang('loc_theo_tinh_tp')} onPress={() => statusRef.current?.open()} />
                    <ItemOption value={options.status.name} title={AppLang('loc_theo_quan_huyen')} onPress={() => statusRef.current?.open()} />
                    <ItemOption value={options.source.name} title={AppLang('loc_theo_loai_hinh')} onPress={() => sourceRef.current?.open()} />
                    <ItemOption value={options.group.name} title={AppLang('loc_theo_phan_khuc')} onPress={() => groupRef.current?.open()} /> */}
                </Block>
            </ScrollView>
            <Block mid marT10 padH20>
                {/* <ButtonApp onPress={onCancel} title={AppLang('bo_qua')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} /> */}
                <ButtonApp onPress={onSave} title={AppLang('dong_y')} style={{ width: '100%', height: 45 }} />
            </Block>
            <ActionSheetIos onPressButton={(value) => onSelectOption('status', { value: value?.id, name: value?.name })} options={ListStatus} ref={statusRef} onCancel={() => statusRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshSource} onPressButton={(value) => onSelectOption('source', { value: value?.id, name: value?.name })} options={ListSource} ref={sourceRef} onCancel={() => sourceRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshGroup} onPressButton={(value) => onSelectOption('group', { value: value?.id, name: value?.name })} options={ListGroup} ref={groupRef} onCancel={() => groupRef.current?.close()} textCancel={AppLang('huy')} />

        </BottomSheet>
    )
})
export default ModalListLook
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
