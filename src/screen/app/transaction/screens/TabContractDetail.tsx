
import { Image, RefreshControl, StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import Card from '@components/Card'
import { Block, IconC, ListData, Touch } from '@mylib/UIKit';
import { AppLang } from '@assets/langs';
import ButtonApp from '@components/ButtonApp';
import { ScrollView } from 'react-native';
import { ContentTransaction, ModalApprove, ModalOtp, } from '../components';
import { AppColor } from '@assets/colors';
import { TextApp } from '@components/text';
import { screen_width, stylesApp, ToastAppError, ToastAppSuccess } from '@components';
import { useCampaignSaleDetail, useListCampaign, useListCategories, useListBuilding, } from '@service/hook';
import { BillDetail, CampaignDetail, PayDetail } from '@utils/type';
import { Log } from '@utils/Log';
import { PAYMENT_HISTORY, TINH_TRANG_HOP_DONG } from '@service/constant/constant';
import { decodeJson } from '@utils/array';
import { convertDateMoment } from '@utils/date';
import { isArray, keys } from 'underscore';
import { PopupApp } from '@components/Popup';
import { AppImage } from '@assets/image';
import { uriImg } from '@utils/index';
import { useDetailBill } from '@service/store';
import { isObject } from 'underscore';
import { TransactionApi } from '@api/qsland';
import { EventApp } from '@service/hook/EventApp';
import { navigate } from '@navigation/rootNavigation';

export default function TabContractDetail({ id }: any) {
    // Log.d('id', id)
    if (id === undefined) return null
    const { data: trans, onRefresh, permission } = useDetailBill(id)
    const { payment_history, bill } = trans

    Log.d('permission', permission)
    const { data: dataCampaign } = useCampaignSaleDetail<CampaignDetail>(bill?.campaign_sale_id)
    const tinh_trang = TINH_TRANG_HOP_DONG[bill?.status]
    const thong_tin_hop_dong = [
        { title: AppLang('ma_hop_dong'), value: bill?.code },
        { title: AppLang('san_pham'), value: bill?.cdt_code },
        { title: AppLang('chien_dich'), value: dataCampaign?.title },
        { title: AppLang('tong_gia_tri'), value: bill?.gia_niem_yet },
        { title: AppLang('so_tien_quy_dinh'), value: '###' },
        { title: AppLang('gia_tran'), value: (bill?.gia_tran ?? '') + ' VND' },
        { title: AppLang('gia_san'), value: (bill?.gia_san ?? '') + ' VND' },
        { title: AppLang('phi_dich_vu'), value: '###' },
        { title: AppLang('tinh_trang_hop_dong'), value: tinh_trang?.name, valueStyle: { color: AppColor('primary') } },
    ]
    const payment: PayDetail = isArray(payment_history) && payment_history.length > 0 ? payment_history[0] : {}
    const payment_status = PAYMENT_HISTORY[payment?.status]
    const thong_tin_thanh_toan = [
        { title: AppLang('so_tien_thanh_toan_gan_nhat'), value: payment?.will_pay },
        { title: AppLang('tinh_trang_xy_ly'), value: payment_status?.name },
        { title: AppLang('ly_do_tu_choi'), value: payment?.reason },
        { title: AppLang('tong_tien_ke_toan_thuc_thu'), value: bill?.paid },

    ]
    const chinh_sach_ban_hang = [
        { title: AppLang('chinh_sach_ban_hang'), value: '###' },

    ]
    const infoCustomer = decodeJson(bill?.info_customer, {})
    const thong_tin_khach_hang = [
        { title: AppLang('khach_hang'), value: infoCustomer?.full_name },
        { title: AppLang('dien_thoai'), value: infoCustomer?.phone },
        { title: AppLang('email'), value: infoCustomer?.email },
        { title: AppLang('so_CMND'), value: infoCustomer?.cmt_number },
        { title: AppLang('ngay_cap'), value: convertDateMoment(infoCustomer?.cmt_date).format('DD/MM/YYYY') },
        { title: AppLang('noi_cap'), value: infoCustomer?.cmt_address },
        { title: AppLang('dia_chi_thuong_tru'), value: infoCustomer?.cb_address },
        { title: AppLang('dia_chi_lien_he'), value: infoCustomer?.address },
        { title: AppLang('hinh_anh'), value: '###', valueStyle: { color: 'red' } },
    ]
    if (!isObject(trans) || Object.keys(trans).length == 0) return <></>

    /**** */
    const otpRef = useRef<typeof ModalOtp>()
    const approveRef = useRef<any>()
    /****
     * 
     * 
     * 
     * 
     * 
     * 
     */
    async function xacNhanHopDongTuVan() {
        const res = await TransactionApi.xacNhanHopDongTuVan({ bill_id: id, status: 'chap_thuan' })
        Log.e('xacNhanHopDongTuVan', res)
        if (res.status) {
            ToastAppSuccess('Hợp đồng đã được xác nhân')
            EventApp.emit('listBill')
            onRefresh()
        } else {
            ToastAppError(res.mess)
        }
    }
    async function xacNhanHuyHopDongTuVan() {
        const res = await TransactionApi.xacNhanHopDongTuVan({ bill_id: id, status: 'tu_choi' })
        Log.e('xacNhanHopDongTuVan', res)
        if (res.status) {
            ToastAppSuccess('Hợp đồng đã bị từ chối')
            EventApp.emit('listBill')
            onRefresh()
        } else {
            ToastAppError(res.mess)
        }
    }
    async function huyHopDongTuVan() {
        PopupApp.show(
            {
                title: 'Bạn có chắc chắn huỷ?',
                note: '',
                buttons: [
                    { title: 'Bỏ qua', bold: '300' },
                    { title: 'Đồng ý', color: 'red' },]
            })
    }
    const renderButton = () => {
        if (permission.yeu_cau_huy) return (
            <ButtonApp
                onPress={huyHopDongTuVan}
                title={AppLang('yeu_cau_huy')}
            />
        )
        if (permission.phe_duyet) return (
            <Block row centerBetween padH20>
                <ButtonApp
                    onPress={xacNhanHuyHopDongTuVan}
                    title={AppLang('tu_choi')}
                    background="#ddd"
                    color='#000'
                    style={{ flex: 1 }}
                />
                <Block w={20} />
                <ButtonApp
                    style={{ flex: 1 }}
                    onPress={xacNhanHopDongTuVan}
                    title={AppLang('xac_nhan')}
                />
            </Block>
        )
        return null
    }
    /****
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    */
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ padding: 10, paddingBottom: 100 }}>
            <Block hidden={!__DEV__}>
                <TextApp>id={bill?.id}</TextApp>
                <TextApp >status={bill?.status}</TextApp>
            </Block>
            <BillDivider data={bill} />
            <Card title={AppLang('thong_tin_hop_dong').toUpperCase()}>
                <ListData data={thong_tin_hop_dong} renderItem={({ item }) =>
                    <ContentTransaction {...item} />}
                />
                <Touch row alignItems='flex-end' marT10>
                    <IconC name="receipt-outline" color={AppColor('primary')} />
                    <TextApp lang='xem_hop_dong' primary bold />
                </Touch>
            </Card>
            <Card title={AppLang('chinh_sach_ban_hang').toUpperCase()} onPressRight={() => navigate('ScreenBillAddPolicy')}>
                <ListData data={chinh_sach_ban_hang} renderItem={({ item }) =>
                    <ContentTransaction {...item} />}
                />
            </Card>
            <Card title={AppLang('thong_tin_thanh_toan').toUpperCase()}>
                <ListData data={thong_tin_thanh_toan} renderItem={({ item }) =>
                    <ContentTransaction {...item} />}
                />
            </Card>
            <Card title={AppLang('thong_tin_khach_hang').toUpperCase()}>
                <ListData data={thong_tin_khach_hang} renderItem={({ item }) =>
                    <ContentTransaction {...item} />}
                />
                {/* <ListImage data={}/> */}
            </Card>
            {renderButton()}
            <ButtonApp
                hidden={!__DEV__}
                onPress={() => otpRef.current?.open()}
                title={AppLang('ModalOtp')}
                background="pink"
            />
            <ButtonApp
                hidden={!__DEV__}
                onPress={() => approveRef.current?.open()}
                title={AppLang('ModalApprove')}
                background="pink"
            />
            <ModalOtp ref={otpRef} />
            <ModalApprove ref={approveRef} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({})


export const BillDivider = ({ data, style }: { data: any, style?: ViewProps['style'] }) => {
    const { building_id, category_id, cdt_code } = data ?? {}
    const { dataKey } = useListCategories()
    const { dataKey: dataKeyBdc } = useListBuilding()
    const category = dataKey[category_id]
    const building_name = dataKeyBdc[building_id]?.name ?? "Toà k thấy"
    return (
        <Block row alignCenter marV10 borderR5 pad10 style={[{ borderWidth: 1, borderLeftWidth: 5, borderColor: "#ddd", borderLeftColor: AppColor('primary') }, style]}>
            <Image defaultSource={AppImage('logo_bg1')}
                source={uriImg(category?.image, AppImage('logo_bg1'))}
                style={{ width: screen_width * 0.15, height: screen_width * 0.15, borderRadius: 10 }}
            />
            <Block marL10>
                <TextApp>{AppLang('so_bds_thuc_te').concat(': ')}{cdt_code}{'###'}</TextApp>
                <TextApp>{AppLang('toa').concat(': ')}{building_name}</TextApp>
                <TextApp>{AppLang('du_an').concat(': ')}{category?.name}</TextApp>
            </Block>
        </Block>
    )
}