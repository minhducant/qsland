import * as React from 'react';
import TabBar from '@components/TabBar';
import { ListCustomerMe, ListCustomerDeny, ListCustomerAllocation } from '../tabs';
import Swiper from 'react-native-swiper';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import { useStoreApp } from '@service/store';
import { TextApp } from '@components';
import { navigate, openDrawer } from '@navigation';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { BottomAnimate } from '@screen/app/dashboard/container/BottomHome';

export default function CustomerManagement({ route }: any) {


    const { name } = useRoute()
    const isFocused = useIsFocused();
    React.useEffect(() => {
        if (isFocused) {
            BottomAnimate.animate(name)
        }
    }, [isFocused])
    const [active, setActive] = React.useState<number>(1);
    const count1 = useStoreApp(state => state.ListMe.count)
    const count2 = useStoreApp(state => state.ListAllocation.count)
    const count3 = useStoreApp(state => state.ListDeny.count)

    const pageRef = React.useRef<any>();
    React.useEffect(() => {
        if (route.params) {
            setActive(route.params.type || 1);
        }
    }, []);
    return (
        <ScreenApp
            iconLeft='menu'
            onLeft={openDrawer}
            title={AppLang('quan_ly_khach_hang')}
        // renderRight={
        //     <Touch hidden={!__DEV__} onPress={() => navigate('ScreenApiHistory')}
        //         mid positionOption={{ right: 10, top: 10 }} bg="#fff" borderCircle pad={5}>
        //         <TextApp size={12} color="red">API</TextApp>
        //     </Touch>
        // }
        >
            <Block flex1 bgW>
                <TabBar
                    namePage1={AppLang('cua_toi')}
                    namePage2={AppLang('phan_bo')}
                    namePage3={AppLang('vi_pham')}
                    setActive1={value => {
                        pageRef.current.scrollTo(value - 1);
                        setActive(value);
                    }}
                    value={active}
                    count1={count1}
                    count2={count2}
                    count3={count3}
                />
                <Swiper onIndexChanged={i => setActive(i + 1)} ref={pageRef} showsPagination={false} loop={false}>
                    <ListCustomerMe />
                    <ListCustomerAllocation />
                    <ListCustomerDeny />
                </Swiper>
            </Block>
        </ScreenApp>
    );
}
