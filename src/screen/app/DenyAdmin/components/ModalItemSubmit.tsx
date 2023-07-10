import React, { useRef, useState } from 'react'
import { BottomSheet } from '@components/Sheet';
import { Block, IconC, Touch } from '@mylib/UIKit';
import { TextApp } from '@components';
import { AppLang } from '@assets/langs';
import ButtonApp from '@components/ButtonApp';
import { AppColor } from '@assets/colors';
import { ScrollView } from 'react-native';
import { DenyAdminApi } from '@api/qsland';
import { ToastAppError, ToastAppSuccess } from '@components/Toast';
import { useDispatch } from 'react-redux';
import { ListAdDenyWait } from '@service/store';



const ModalItemSubmit = React.forwardRef<any, any>(({ item = {} }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...refRef.current }))
    const refRef = useRef<any>(null)
    const dispatch = useDispatch()
    const onSubmit = async (type: boolean) => {
        let res: any = {}
        if (type == true) {
            res = await DenyAdminApi.addDenyAdmin({ id: item?.id, status: 3 })
        }
        if (type == false) {
            res = await DenyAdminApi.addDenyAdmin({ id: item?.id, status: 4 })
        }
        if (res.status) {
            ToastAppSuccess(AppLang('thanh_cong'))
            const { id, status } = res?.data?.item
            id && dispatch(ListAdDenyWait.updateItem({ ...item, status }))
        }
        else ToastAppError(res.mess)

    }
    return (
        <BottomSheet ref={refRef} draggable={false} height={'75%'} forceInsetBot={{ bottom: 'always' }} styleLayout={{ paddingBottom: 10 }}>
            <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
                <TextApp size18 bold center>{AppLang('cho_duyet')}</TextApp>
                <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { refRef.current?.close() }} />
            </Block>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <TextApp bold>{AppLang('ly_do')}</TextApp>
                <Block pad10 bg="#eee" marV10 borderR={5}>
                    <TextApp>{item?.reason}</TextApp>
                </Block>
                <TextApp bold>{AppLang('noi_dung_giai_trinh_chi_tiet')}</TextApp>
                <Block pad10 bg="#eee" marV10 borderR={5}>
                    <TextApp>{item?.reason}</TextApp>
                </Block>
                <TextApp bold>{AppLang('anh_xac_minh')}</TextApp>
                <Block pad10 bg="#eee" marV10 borderR={5}>
                    <TextApp>{item?.reason}</TextApp>

                </Block>
            </ScrollView>
            <Block row justifyContent='flex-end' padH20 marT10 >
                <ButtonApp onPress={() => onSubmit(false)} title={AppLang('tu_choi')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} />
                <ButtonApp onPress={() => onSubmit(true)} title={AppLang('xac_nhan')} style={{ width: '30%' }} />
            </Block>
        </BottomSheet>
    )
})
export default ModalItemSubmit
