import * as React from 'react';
import Swiper from 'react-native-swiper';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import { useStoreApp } from '@service/store';
import ListEventA from './ListEventA';
import ListEventB from './ListEventB';
import ListEventC from './ListEventC';
import TabBar from '@components/TabBar';
export default function ScreenAdDenyHome({ route }: any) {
  const [active, setActive] = React.useState<number>(1);
  const pageRef = React.useRef<any>();
  React.useEffect(() => {
    if (route.params) {
      setActive(route.params.type || 1);
    }
  }, []);
  return (
    <ScreenApp back title={AppLang('su_kien')}    >
      <Block flex1 bgW>
        <TabBar
          namePage1={AppLang('sap_dien_ra')}
          namePage2={AppLang('dang_dien_ra')}
          namePage3={AppLang('da_ket_thuc')}
          setActive1={value => {
            pageRef.current.scrollTo(value - 1);
            setActive(value);
          }}
          value={active}
        />
        <Swiper onIndexChanged={i => setActive(i + 1)} ref={pageRef} showsPagination={false} loop={false}>
          <ListEventA />
          <ListEventB />
          <ListEventC />
        </Swiper>
      </Block>
    </ScreenApp>
  )
}
