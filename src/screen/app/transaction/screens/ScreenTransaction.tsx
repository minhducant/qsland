import * as React from 'react';
import Swiper from 'react-native-swiper';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import TabBar from '@components/TabBar';
import ListLookApartment from './ListLookApartment';
import ListContractApartment from './ListContractApartment';
import TabDEV from './TabDEV';

export default function ScreenTransaction() {
    const [active, setActive] = React.useState<number>(1);
    const pageRef = React.useRef<any>();
    return (
        <ScreenApp
            // back
            title={AppLang('yeu_cau_hop_dong')}
        >
            <Block flex1 bgW>
                <TabBar
                    namePage1={AppLang('yeu_cau')}
                    namePage2={AppLang('hop_dong')}
                    namePage3={AppLang('TabDEV')}
                    setActive1={value => {
                        pageRef.current.scrollTo(value - 1);
                        setActive(value);
                    }}
                    value={active}

                />
                <Swiper containerStyle={{ flex: 1 }} onIndexChanged={i => setActive(i + 1)} ref={pageRef} showsPagination={false} loop={false}>
                    <ListLookApartment />
                    <ListContractApartment />
                    <TabDEV />
                </Swiper>
            </Block>
        </ScreenApp>
    )
}
