import * as React from 'react';
import Swiper from 'react-native-swiper';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import { useStoreApp } from '@service/store';
import ListAdDenyWait from './ListAdDenyWait';
import { Log } from '@utils';
import ListAdDenyNone from './ListAdDenyNone';
import ListAdDenyDone from './ListAdDenyDone';
import TabBar from '@components/TabBar';
export default function ScreenAdDenyHome({ route }: any) {
    const [active, setActive] = React.useState<number>(1);
    const count1 = useStoreApp(state => state.ListAdDenyWait.count)
    const count2 = useStoreApp(state => state.ListAdDenyDone.count)
    const count3 = useStoreApp(state => state.ListAdDenyNone.count)
    Log.d('count3', count3)
    const pageRef = React.useRef<any>();
    React.useEffect(() => {
        if (route.params) {
            setActive(route.params.type || 1);
        }
    }, []);
    return (
        <ScreenApp
            back
            title={AppLang('kiem_duyet_giai_trinh')}
        >
            <Block flex1 bgW>
                <TabBar
                    namePage1={AppLang('cho_xu_ly')}
                    namePage2={AppLang('da_xu_ly')}
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
                    <ListAdDenyWait />
                    <ListAdDenyDone />
                    <ListAdDenyNone />
                </Swiper>
            </Block>
        </ScreenApp>
    )
}
