import * as React from 'react';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import { useDetailDenyAdmin, useListCampaignCustomer } from '@service/hook';
import { TextApp } from '@components';
import { isEmpty } from 'underscore';
import { AppColor } from '@assets/colors';
import { ListImage, ListImageViewer } from '@lib/components/image';
import { arrayData } from '@utils/format';
import { AppDate } from '@utils/date';
import { RefreshControl, ScrollView } from 'react-native';
import { STATUS_ADMIN_DENY } from '../components/api';
import ButtonApp from '@components/ButtonApp';
import { Log } from '@utils';
import { DenyAdminApi } from '@api/qsland';
import { ToastAppError, ToastAppSuccess } from '@components/Toast';
import { useDispatch } from 'react-redux';
import { ListAdDenyWait, useListAdDenyDone, useListAdDenyWait } from '@service/store';
import { goBack } from '@navigation';
export default function ScreenAdDenyDetail({ route }: any) {
    const id = route?.params?.id
    const dispatch = useDispatch()
    const { data, onRefresh, loading } = useDetailDenyAdmin(id)
    const chien_dich = useListCampaignCustomer().dataKey
    const Status = Object.values(STATUS_ADMIN_DENY).find(({ id }) => id == data?.status)
    const dataInfo = {
        khach_hang: data?.full_name,
        nhan_vien: data?.name_sale,
        du_an: data?.name_category,
        chien_dich: chien_dich[data?.campaign_id]?.name,
        thu_hoi: AppDate.format3(data?.created_at),
        giai_trinh: AppDate.format3(data?.time_send_explanation),
        ngay_duyet: AppDate.format3(data?.updated_at),
    }
    const customerInformation = [
        { label: AppLang('khach_hang'), content: dataInfo.khach_hang },
        { label: AppLang('nhan_vien'), content: dataInfo.nhan_vien },
        { label: AppLang('thu_hoi'), content: dataInfo?.thu_hoi, },
        { label: AppLang('giai_trinh'), content: dataInfo.ngay_duyet },
        { label: AppLang('chien_dich'), content: dataInfo.chien_dich },
        { label: AppLang('du_an'), content: dataInfo.du_an },
    ];
    //nhuoc diem 
    const { onRefreshCount: onRefreshCount1, onRefresh: onRefresh1 } = useListAdDenyWait();
    const { onRefreshCount: onRefreshCount2, onRefresh: onRefresh2 } = useListAdDenyDone();

    const onSubmit = async (type: boolean) => {
        let res: any = {}
        if (type == true) {
            res = await DenyAdminApi.addDenyAdmin({ id, status: 3 })
        }
        if (type == false) {
            res = await DenyAdminApi.addDenyAdmin({ id, status: 4 })
        }
        if (res.status) {

            ToastAppSuccess(AppLang('thanh_cong'))
            const { id, status } = res?.data?.item
            id && dispatch(ListAdDenyWait.updateItem({ ...data, status }))
            id && onRefreshCount1()
            id && onRefreshCount2()
            id && onRefresh2()
            goBack()
        }
        else ToastAppError(res.mess)

    }
    return (
        <ScreenApp
            back
            title={AppLang('chi_tiet_vi_pham')}
        >
            <Block flex1>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }>
                    <Block>
                        {customerInformation.map((props, k) => (
                            <RowLabel key={k} {...props} />
                        ))}
                    </Block>
                    <Block h={10} bg="#ddd" />
                    {data.status !== STATUS_ADMIN_DENY.vi_pham.id &&
                        <Block pad10>
                            <TextApp size18 UPPER bold  >{AppLang('thong_tin_giai_trinh')}</TextApp>
                            <TextApp style={{ marginTop: 10 }} >{AppLang('mo_ta_giai_trinh')}</TextApp>
                            <Form data={data} title={Status?.label} color={Status?.color} />
                        </Block>
                    }

                    <Block pad={10} row styleBox={{ justifyContent: 'flex-end' }}>
                        {data.status == STATUS_ADMIN_DENY.cho_duyet.id &&
                            <>
                                <ButtonApp onPress={() => onSubmit(false)} title={AppLang('tu_choi')} background={AppColor('txt_gray')} />
                                <Block w={30} />
                                <ButtonApp onPress={() => onSubmit(true)} title={AppLang('xac_nhan')} background={AppColor('primary')} />
                            </>
                        }
                    </Block>
                </ScrollView>
            </Block>
        </ScreenApp>
    )
}
const RowLabel = ({ label, content }: any) => (
    <Block hidden={isEmpty(content)} row pad={10} centerH>
        <Block flex1>
            <TextApp>{label}{':'}</TextApp>
        </Block>
        <Block flex={2} borderBW={1} borderC="#ddd">
            <TextApp style={{ fontWeight: '400' }} color={AppColor('primary')}>
                {content}
            </TextApp>
        </Block>
    </Block>
);
const Form = ({ data, title, color }: any) => {
    const refViewer = React.useRef<any>(null)
    return (
        <Block borderW={1} minH={200} borderR={16} pad={10} marT={10} borderC="gray">
            <TextApp center bold color={color} size={16} >{title}</TextApp>
            <Block>
                <Block borderBW={0.5} borderC="#ddd" padT={10}>
                    <TextApp bold>{AppLang('ly_do')}:</TextApp>
                    <TextApp style={{ padding: 10 }}>{data.reason}</TextApp>
                </Block>
                <Block borderBW={0.5} borderC="#ddd" padT={10}>
                    <TextApp bold>{AppLang('noi_dung_giai_trinh')} :</TextApp>
                    <TextApp style={{ padding: 10 }}>{data.desc}</TextApp>
                </Block>
                <TextApp bold style={{ paddingVertical: 10 }}>
                    {AppLang('anh_xac_minh')} :
                </TextApp>
                <ListImage
                    hiddenCamera
                    hiddenClose
                    data={arrayData(data?.images).map(uri => ({ uri }))}
                    onPressItem={({ index }) => refViewer.current.openIndex(index)}
                    styleScrollView={{ paddingTop: 10 }}
                    styleContainer={{ marginRight: 15, overflow: 'visible' }}
                    styleImage={{ borderRadius: 5, borderWidth: 1, borderColor: '#ddd', overflow: 'hidden' }}

                />
                <ListImageViewer data={arrayData(data?.images).map(uri => ({ uri }))} ref={refViewer} />
            </Block>
        </Block>
    )
};
