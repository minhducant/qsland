
import * as React from 'react'
import { AppLang } from '@lib/utils';
import { Block } from '@lib/components';
import TabAddCustomer from '../tabs/TabAddCustomer';
import ScreenApp from '@components/layout/ScreenApp';

export default function ScreenCustomerAdd() {
  return (
    <ScreenApp back
    title={AppLang.them_khach_hang}
  >
      <Block flex1 bg="#fff">
        <TabAddCustomer />
      </Block>
    </ScreenApp>
  )
}

