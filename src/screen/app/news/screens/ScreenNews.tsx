import * as React from 'react';
import Swiper from 'react-native-swiper';
import { AppLang } from '@assets/langs';
import { Block } from '@mylib/UIKit';
import ScreenApp from '@components/layout/ScreenApp';
import { useStoreApp } from '@service/store';
import ListNewA from './ListNewA';
import ListNewB from './ListNewB';
import ListNewC from './ListNewC';
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
    <ScreenApp back title={AppLang('tin_tuc')}    >
      <Block flex1 bgW>
        <TabBar
          namePage1={AppLang('tin_noi_bo')}
          namePage2={AppLang('tin_du_an')}
          namePage3={AppLang('lich_mo_ban')}
          setActive1={value => {
            pageRef.current.scrollTo(value - 1);
            setActive(value);
          }}
          value={active}
        />
        <Swiper onIndexChanged={i => setActive(i + 1)} ref={pageRef} showsPagination={false} loop={false}>
          <ListNewA />
          <ListNewB />
          <ListNewC />
        </Swiper>
      </Block>
    </ScreenApp>
  )
}
