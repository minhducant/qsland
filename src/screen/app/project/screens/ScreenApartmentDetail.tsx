import { Image, RefreshControl, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Block, IconC, ListData, Touch } from '@mylib'
import { AppImage } from '@assets/image'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { TextApp } from '@components/text'
import { ScrollView } from 'react-native'
import { AppColor } from '@assets/colors';
import ButtonApp from '@components/ButtonApp'
import { useDetailProduct, useDetailSalePolicy, useListBuilding, useListCategories, } from '@service/hook'
import { MappedItem } from '@utils/type/core'
import { moneyFormat } from '@utils/format'
import { Log } from '@utils/Log'
import { isArray, isEmpty } from 'underscore';
import { isArrayEmpty } from '@utils/array'
import { AppDate } from '@utils/date';
import { TouchScale } from '@mylib/UIKit';
import { Map, Record, is } from 'immutable'
import { TINH_TRANG_SAN_PHAM, NHOM_TINH_TRANG_SAN_PHAM, GIAI_DOAN_SAN_PHAM } from '@service/constant/constant'
import { MAU_SAN_PHAM, PRODUCTS_STATUS } from '../table'
import { BillDivider } from '@screen/app/transaction/screens/TabContractDetail'
import Card from '@components/Card'
import { ContentTransaction } from '../../transaction/components';


const Container = Block
const IconDola = ({ size }: { size?: number }) => <TextApp size={size} bold color={AppColor('txt_origin')}>{'$ '}</TextApp>
export default function ScreenApartmentDetail({ route }: any) {
    const _empty = AppLang('dang_cap_nhat2')
    const { id, building_id, category_id } = route.params
    const { data, loading, onRefresh } = useDetailProduct<MappedItem<typeof _keyData>>(id)
    const { dataKey: dataKeyCa } = useListCategories()
    const { dataKey: dataKeyBdc } = useListBuilding()
    const { data: policy } = useDetailSalePolicy<MappedItem<typeof sale_policy>>({ building_id, category_id })
    const [select1, setSelect1] = useState(Map<string, object>({}))
    const [select2, setSelect2] = useState(Map<string, object>({}))
    const Press = (type = 1, item: any) => {
        if (type == 1) {
            if (select1.has(`${item.id}`)) return setSelect1(select1.delete(`${item.id}`))
            return setSelect1(select1.set(`${item.id}`, item))
        }
        if (type == 2) {
            if (select2.has(`${item.id}`)) return setSelect2(select2.delete(`${item.id}`))
            return setSelect2(select2.set(`${item.id}`, item))
        }
    }
    const Active = (type = 1, item: any) => {
        if (type == 1) return select1.has(`${item.id}`)
        if (type == 2) return select2.has(`${item.id}`)
        return false
    }
    const thong_tin_san_pham = [
        { title: AppLang('so_tien_yeu_cau'), value: moneyFormat(data?.total, ' VND', _empty) },
        { title: AppLang('gia_tran'), value: moneyFormat(data?.gia_tran, ' VND', _empty) },
        { title: AppLang('gia_san'), value: moneyFormat(data?.gia_san, ' VND', _empty) },
        { title: AppLang('phi_dich_vu'), value: moneyFormat(data?.service_price, ' VND', _empty) },
        { title: AppLang('gia_niem_yet'), value: moneyFormat(data?.gia_niem_yet, ' VND', _empty) },
        { title: AppLang('ghi_chu_gai_niem_yet'), value: '', titleStyle: { color: AppColor('txt_origin'), fontStyle: 'italic', fontWeight: '300' } },
    ]
    const chi_tiet_san_pham = [
        { title: AppLang('so_tien_yeu_cau'), value: moneyFormat(data?.total, ' VND', _empty) },
        { title: AppLang('dien_tich_dat'), value: data?.dt_tim_tuong },
        { title: AppLang('dien_tich_san'), value: data?.dt_thong_thuy },
        { title: AppLang('gia_tim_tuong'), value: data?.gia_tim_tuong },
        { title: AppLang('gia_thong_thuy'), value: data?.gia_thong_thuy },
        { title: AppLang('goc'), value: data?.corner_unit },
        { title: AppLang('view'), value: data?.view },
        { title: AppLang('huong_cua'), value: data?.direction },
        { title: AppLang('huong_ban_cong'), value: data?.balcony_direction },
        { title: AppLang('so_phong_ngu'), value: data?.bedroom },
        { title: AppLang('so_phong_wc'), value: data?.toilet },
    ]
    return (
        <ScreenApp back title={data?.code ?? AppLang('chi_tiet')}>
            <Block flex1 bgW>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                    contentContainerStyle={{ paddingBottom: 400 }}>
                    <Container pad10>
                        <Header data={data} />
                        <BillDivider data={data} />
                        <Card title={AppLang('thong_tin_gia').toUpperCase()} containerStyle={{ borderRadius: 5 }} >
                            <ListData data={thong_tin_san_pham} renderItem={({ item }) =>
                                <ContentTransaction {...item} />}
                            />
                        </Card>
                        <Card title={AppLang('chinh_sach_ban_hang').toUpperCase()} containerStyle={{ borderRadius: 5 }}>
                            <Block   >
                                <TextApp bold primary>{policy?.title}</TextApp>
                                <TextApp  >
                                    {AppLang('ap_dung_tu').concat(': ')}
                                    {AppDate.format2(policy?.from_date)}
                                    {' '}{AppLang('den').toLowerCase()}{' '}
                                    {AppDate.format2(policy?.to_date)}
                                </TextApp>
                                <TextApp italic color={AppColor('txt_origin')}>{AppLang('vui_long_doc_chinh_sach')}</TextApp>
                                <TextApp color={AppColor('txt_origin')} style={{ marginBottom: 10 }}>{AppLang('huong_dan_chon_tieu_chi_chinh_sach').concat(': ')}</TextApp>
                            </Block>
                            <ListData
                                data={policy?.incentives}
                                renderItem={({ item }) => {
                                    const info: MappedItem<typeof _incentives> = item
                                    const active = Active(1, item)
                                    return (
                                        <TouchScale onPress={() => Press(1, item)}>
                                            <Block row  >
                                                <IconC name={active ? "checkbox-outline" : "square-outline"} />
                                                <TextApp>{info.title}</TextApp>
                                            </Block>
                                            <Block marL20>
                                                <TextApp bold>{AppLang('uu_dai').concat(': ')}{info?.total}{info?.type_payment == 0 ? ' %' : ' VND'}</TextApp>
                                            </Block>
                                        </TouchScale>
                                    )
                                }}
                            />
                        </Card>
                        <Card show={isArrayEmpty(policy?.process_payment)} title={AppLang('thanh_toan').toUpperCase()} containerStyle={{ borderRadius: 5 }}>
                            <TextApp color={AppColor('txt_origin')} style={{ marginBottom: 10 }}>{AppLang('huong_dan_chon_tieu_chi_thanh_toan').concat(': ')}</TextApp>
                            <ListData
                                data={policy?.process_payment}
                                renderItem={({ item }) => {
                                    const info: MappedItem<typeof _process_payment> = item
                                    const active = Active(2, item)
                                    // Log.e('active', active)
                                    return (
                                        <TouchScale onPress={() => Press(2, item)}>
                                            <Block row  >
                                                <IconC name={active ? "checkbox-outline" : "square-outline"} />
                                                <TextApp>{info.title}</TextApp>
                                            </Block>
                                            <Block marL20>
                                                <TextApp bold>{AppLang('uu_dai').concat(': ')}{info?.bonus}{info?.type_payment == 0 ? ' %' : ' VND'}</TextApp>
                                            </Block>
                                        </TouchScale>
                                    )
                                }
                                }
                            />
                        </Card>
                        <Card title={AppLang('chi_tiet_san_pham').toUpperCase()} containerStyle={{ borderRadius: 5 }} >
                            <ListData data={chi_tiet_san_pham} renderItem={({ item }) =>
                                <ContentTransaction {...item} />}
                            />
                            <Touch borderW1 marT20 pad10 borderR5 borderC={AppColor('primary')}>
                                <TextApp primary center>{'Xem thêm thông tin về dự án'}</TextApp>
                            </Touch>
                        </Card>
                        <ButtonApp style={{ marginTop: 30 }} title={AppLang('yeu_cau_look')} />
                    </Container>
                </ScrollView>
            </Block>
        </ScreenApp >
    )
}
/**
 * 
 */
const Header = ({ data }: { data: MappedItem<typeof _keyData> }) => {
    const tinh_trang = NHOM_TINH_TRANG_SAN_PHAM[TINH_TRANG_SAN_PHAM[data?.p_status]?.step]
    const giai_doan = GIAI_DOAN_SAN_PHAM[data?.stage]
    return (
        <Block row centerBetween pad10 >
            <Block flex1 row>
                <TextApp lang='tinh_trang' />
                <Block square={20} marH5 background={tinh_trang?.color} borderW1 borderC={'gray'} />
                <TextApp >{tinh_trang?.name}</TextApp>
            </Block>
            <Block row>
                <TextApp lang='giai_doan' />
                <TextApp bold>{'\t'}{giai_doan?.name}</TextApp>
            </Block>
        </Block>
    )
}
const Info = ({ title, value }: any) =>
    <Block row centerBetween marT10>
        <TextApp  >{title}</TextApp>
        <TextApp bold>{value}</TextApp>
    </Block>
let sale_policy = ["id", "title", "code", "building_id", "category_id", "create_date", "create_by", "status", "from_date", "to_date", "updated_at", "created_at", "deleted_at", "process_payment", "incentives"] as const
let _keyData = ["service_price", "id", "code", "cdt_code", "company_id", "p_status", "type", "status", "floor", "location", "apartment_number", "lot_number", "road", "bedroom", "toilet", "direction", "balcony_direction", "view", "corner_unit", "dt_thong_thuy", "dt_tim_tuong", "dt_san_vuon", "gia_thong_thuy", "gia_tim_tuong", "gia_san", "gia_tran", "gia_niem_yet", "gi_chu_niem_yet", "gia_ban_chua_vat", "don_gia_co_vat", "don_gia_chua_vat", "thue_vat", "maintain_price", "stage", "loai_dat_cho", "total", "lock_member", "open_sale", "note", "building_id", "category_id", "cart_id", "updated_at", "created_at", "deleted_at", "scope_type"] as const
let _incentives = ['id', 'payment_progress_id', 'sale_policy_id', 'expired_time_paid', 'desc', 'type_payment', 'total', 'type', 'title', 'note', 'from_type', 'updated_at', 'created_at', 'deleted_at',] as const
let _process_payment = ['id', 'code', 'sale_policy_id', 'title', 'type_bonus', 'bonus', 'updated_at', 'created_at', 'deleted_at',]

