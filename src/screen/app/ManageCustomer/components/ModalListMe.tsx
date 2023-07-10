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
import { useListCategories, useListGroupCustomer, useListSourceCustomer } from '@service/hook';
import { Log } from '@utils';
import { STATUS_ME } from './@Status';
import { ModalDate } from '@components/selected/Dates/ModalDate'
import moment from 'moment';
import { isEmpty } from 'underscore';
const initOptions = {
    from: { name: '', value: null },
    to: { name: '', value: null },
    status: { name: '', value: null },
    source: { name: '', value: null },
    group: { name: '', value: null },
    category: { name: '', value: null },
}
const ModalListMe = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const refRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const groupRef = useRef<any>(null)
    const sourceRef = useRef<any>(null)
    const fromRef = useRef<any>(null)
    const toRef = useRef<any>(null)
    const categoryRef = useRef<any>(null)
    const { data: ListGroup, onRefresh: onRefreshGroup } = useListGroupCustomer()
    const { data: ListSource, onRefresh: onRefreshSource } = useListSourceCustomer()
    const { data: ListCategories, onRefresh: onRefreshListCategories } = useListCategories()

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
    const funcPropsIcon = (item: any) => {
        const active = activeCategory(item)
        return {
            color: AppColor('primary'),
            size: 23,
            name: active ? 'checkmark-circle' : 'none'//'radio-button-off-outline'
        }
    }
    const onCategory = (item: any) => {
        if (category.find(i => i?.id == item?.id)) return setCategory(prev => prev.filter(i => i?.id != item?.id))
        else return setCategory(prev => [...prev, { name: item?.name, id: item?.id }])
    }
    const onCategoryAccept = () => {
        if (category.length == 0) onSelectOption('category', { name: '', value: null })
        else {
            const name = category.length == 1 ? category[0]?.name : category.length + ' ' + 'Dự án'
            onSelectOption('category', { name: name, value: category.map(({ id }) => id) })
        }
        categoryRef.current?.close()
    }
    // Log.e1('options', options)
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
                    <ItemOption value={options.status.name} title={AppLang('loc_kh_theo_tinh_trang_cham_soc')} onPress={() => statusRef.current?.open()} />
                    <ItemOption value={options.source.name} title={AppLang('loc_kh_theo_nguon')} onPress={() => sourceRef.current?.open()} />
                    <ItemOption value={options.group.name} title={AppLang('loc_kh_theo_nhom_khach_hang')} onPress={() => groupRef.current?.open()} />
                    <ItemOption value={options.category.name} title={AppLang('loc_theo_du_an')} onPress={() => categoryRef.current?.open()} />
                </Block>
            </ScrollView>
            <Block row justifyContent='flex-end' padH20 marT10 >
                <ButtonApp onPress={onCancel} title={AppLang('bo_qua')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} />
                <ButtonApp onPress={onSave} title={AppLang('xac_nhan')} style={{ width: '30%' }} />
            </Block>
            <ActionSheetIos onPressButton={(value) => onSelectOption('status', { value: value?.id, name: value?.name })} options={ListStatus} ref={statusRef} onCancel={() => statusRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshSource} onPressButton={(value) => onSelectOption('source', { value: value?.id, name: value?.name })} options={ListSource} ref={sourceRef} onCancel={() => sourceRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos onRefresh={onRefreshGroup} onPressButton={(value) => onSelectOption('group', { value: value?.id, name: value?.name })} options={ListGroup} ref={groupRef} onCancel={() => groupRef.current?.close()} textCancel={AppLang('huy')} />
            <ActionSheetIos
                ref={categoryRef}
                onRefresh={onRefreshListCategories}
                onPressButton={(value) => {
                    onCategory(value)
                    // onSelectOption('category', { value: value?.id, name: value?.name })
                }
                }
                options={ListCategories}
                onCancel={onCategoryAccept}
                textCancel={AppLang('dong_y')}
                iconProps={{ show: true, funcProps: funcPropsIcon }}
                autoClose={false}
            />
            <ModalDate
                ref={fromRef}
                onCancel={() => fromRef.current.close()}
                onSelectDate={value => onSelectOption('from', { name: moment(value).format('DD-MM-YYYY'), value: moment(value).format('YYYY-MM-DD') })}
            />
            <ModalDate
                ref={toRef}
                onCancel={() => toRef.current.close()}
                onSelectDate={value => {
                    Log.e('=>>>>>>>>', value)
                    onSelectOption('to', { name: moment(value).format('DD-MM-YYYY'), value: moment(value).format('YYYY-MM-DD') })
                }}
            />
        </BottomSheet>
    )
})
export default ModalListMe
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
