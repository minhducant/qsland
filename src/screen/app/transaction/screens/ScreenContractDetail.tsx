import * as React from 'react';
import Swiper from 'react-native-swiper';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import { useDetailBill, useStoreApp } from '@service/store';
import TabBar from '@components/TabBar';
import { Log } from '@utils';
import TabPaymentDetail from './TabPaymentDetail';
import TabContractDetail from './TabContractDetail';

export default function ScreenContractDetail({ route }: any) {
    const id = route.params?.id
    const [active, setActive] = React.useState<number>(1);
    // const count1 = useStoreApp(state => state.ListAdDenyWait.count)
    // const count2 = useStoreApp(state => state.ListAdDenyDone.count)
    const pageRef = React.useRef<any>();
    const { data } = useDetailBill(id)
    // Log.d1('data,', data)
    return (
        <ScreenApp
            back
            title={AppLang('chi_tiet_hop_dong')}
        >
            <Block flex1 bgW>
                <TabBar
                    namePage1={AppLang('hop_dong')}
                    namePage2={AppLang('thanh_toan')}
                    setActive1={value => {
                        pageRef.current.scrollTo(value - 1);
                        setActive(value);
                    }}
                    value={active}
                // count1={count1}
                // count2={count2}
                />
                <Swiper onIndexChanged={i => setActive(i + 1)} ref={pageRef} showsPagination={false} loop={false}>
                    <TabContractDetail id={data?.bill?.id} />
                    <TabPaymentDetail id={id} />
                </Swiper>
            </Block>
        </ScreenApp>
    )
}
