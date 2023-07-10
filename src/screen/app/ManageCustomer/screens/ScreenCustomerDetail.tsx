import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, } from '@lib/components'
import Swiper from 'react-native-swiper'
import ListCustomerSupport from '../tabs/ListCustomerSupport'
import TabTransactions from '../tabs/TabTransactions'
import TabAddCustomer from '../tabs/TabAddCustomer'
import { useDetailCustomer } from '@service/hook'
import TabBar from '@components/TabBar';
import ScreenApp from '@components/layout/ScreenApp';
import { AppLang } from '@assets/langs'

export default function ScreenCustomerDetail({ route }: any) {
  const id = route.params?.id
  const [active, setActive] = React.useState<number>(1);
  const pageRef = React.useRef<any>();
  const { data } = useDetailCustomer(id)
  return (
    <ScreenApp back
      title={AppLang('thong_tin_khach_hang')}
    >
      <Block flexOne bg='#fff'>
        <TabBar
          setActive1={value => {
            pageRef.current?.scrollTo(value - 1);
            setActive(value);
          }}
          namePage1={AppLang('cham_soc_khach_hang')}
          namePage2={AppLang('thong_tin')}
          namePage3={AppLang('giao_dich')}
          value={active}
        />
        {Object.keys(data).length > 0 &&
          <Swiper onIndexChanged={i => setActive(i + 1)} ref={pageRef} showsPagination={false} loop={false}>
            <ListCustomerSupport item={data} id={id} />
            <TabAddCustomer update={data} />
            <TabTransactions />
          </Swiper>
        }
        {Object.keys(data).length == 0 &&
          <ActivityIndicator />
        }
      </Block>
    </ScreenApp>
  )
}

