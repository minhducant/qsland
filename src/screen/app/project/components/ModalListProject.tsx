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
import { useListCitiesStatic, useListDistricts } from '@service/hook';
import { isEmpty } from 'underscore';
import { Log } from '@utils/Log';
import { LOAI_HINH_DU_AN, PHAN_KHUC_DU_AN } from '@service/constant/constant';
const initOptions = {
    city_id: { name: '', value: null },
    district_id: { name: '', value: null },
    type_project: { name: '', value: null },
    apartment_grid: { name: '', value: null },

}
const ModalListProject = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const [options, setOptions] = useState({ ...initOptions })
    const refRef = useRef<any>(null)
    const cityData = useListCitiesStatic()
    const cityRef = useRef<any>(null)
    const districtData = useListDistricts(options.city_id.value)
    const districtRef = useRef<any>(null)
    const typeData = Object.values(LOAI_HINH_DU_AN).map(item => ({ ...item, value: item.id }))
    const typeRef = useRef<any>(null)
    const apartmentData = Object.values(PHAN_KHUC_DU_AN).map(item => ({ ...item, value: item.id }))
    const apartmentRef = useRef<any>(null)
    const onSave = () => {
        onSelected({
            city_id: options.city_id.value,
            district_id: options.district_id.value,
            type_project: options.type_project.value,
            apartment_grid: options.apartment_grid.value,

        })
        refRef.current?.close()
    }
    const onCancel = () => {
        setOptions({ ...initOptions })
        onSelected && onSelected({
            city_id: null,
            district_id: null,
            type_project: null,
            apartment_grid: null,
        })
        setCategory([])
        refRef.current?.close()
    }
    const onSelectOption = (key: keyof typeof initOptions, data: any) => {

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
    function onCities(data: any) {
        Log.e('onCities', data)
        onSelectOption('city_id', { value: data?.value, name: data?.name })
        districtData.updateParamInit({ province_id: data?.value, })
        districtData.onRefresh()
    }
    function onDistrict(data: any) {
        onSelectOption('district_id', { value: data?.value, name: data?.name })
    }
    function onType(data: any) {
        onSelectOption('type_project', { value: data?.value, name: data?.name })
    }
    function onApartment(data: any) {
        onSelectOption('apartment_grid', { value: data?.value, name: data?.name })
    }
    return (
        <BottomSheet ref={refRef} draggable={false} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
            <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
                <TextApp size18 bold center>{AppLang('loc_du_an')}</TextApp>
                <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { refRef.current?.close() }} />
            </Block>
            <ScrollView>
                <Block pad10>
                    <ItemOption value={options.city_id.name} title={AppLang('loc_theo_tinh_tp')} onPress={() => cityRef.current?.open()} />
                    <ItemOption value={options.district_id.name} title={AppLang('loc_theo_quan_huyen')} onPress={() => districtRef.current?.open()} />
                    <ItemOption value={options.type_project.name} title={AppLang('loc_theo_loai_hinh')} onPress={() => typeRef.current?.open()} />
                    <ItemOption value={options.apartment_grid.name} title={AppLang('loc_theo_phan_khuc')} onPress={() => apartmentRef.current?.open()} />
                </Block>
            </ScrollView>
            <Block row justifyContent='flex-end' padH20 marT10 >
                <ButtonApp onPress={onCancel} title={AppLang('bo_qua')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} />
                <ButtonApp onPress={onSave} title={AppLang('xac_nhan')} style={{ width: '30%' }} />
            </Block>
            <ActionSheetIos
                onRefresh={cityData.onRefresh}
                onPressButton={onCities}
                options={cityData.data.map((item: any) => ({ ...item, name: item?.text }))}
                ref={cityRef}
                onCancel={() => cityRef.current?.close()}
                textCancel={AppLang('huy')} />
            <ActionSheetIos
                onRefresh={districtData.onRefresh}
                onPressButton={onDistrict}
                options={districtData.data.map((item: any) => ({ ...item, name: item?.text }))}
                ref={districtRef}
                onCancel={() => districtRef.current?.close()}
                textCancel={AppLang('huy')} />
            <ActionSheetIos
                onPressButton={onType}
                options={typeData}
                ref={typeRef}
                onCancel={() => typeRef.current?.close()}
                textCancel={AppLang('huy')} />
            <ActionSheetIos
                onPressButton={onApartment}
                options={apartmentData}
                ref={apartmentRef}
                onCancel={() => apartmentRef.current?.close()}
                textCancel={AppLang('huy')} />

        </BottomSheet>
    )
})
export default ModalListProject
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
