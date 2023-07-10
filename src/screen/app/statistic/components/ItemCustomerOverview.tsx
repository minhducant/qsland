import React from 'react';
import {Block, TextApp} from '@lib/components';

import {AppLang} from '@assets/langs';

type Props = {
  item?: any;
  index?: any;
  total?: any;
  totalPotential?: any;
};

export function ItemCustomerOverview({item, index, total}: Props) {
  return (
    <Block row borderBW={1} borderC="gray" key={index}>
      <Block w={150} borderRW={1} borderC="gray" pad={10} row alignCenter>
        {/* <Block w={10} h={10} _background={item.color} marR={10} borderR={5} /> */}
        <TextApp style={{width: 100}}>{item.full_name || item.name}</TextApp>
      </Block>
      <Block w={250} borderRW={1} borderC="gray" padV={10}>
        <TextApp bold style={{alignSelf: 'center'}}>
          {item.total} (
          {total === 0 ? 0 : ((item.total / total) * 100).toFixed(2)}
          %)
        </TextApp>
        <Block
          h={7}
          w={(item.total / total) * 250}
          _background={
            item.total / total === 0 || total === 0 ? 'white' : item.color
          }
          marT={5}
        />
      </Block>
      <Block w={250} padV={10}>
        <TextApp bold style={{alignSelf: 'center'}}>
          {item.total_potential} (
          {item.total === 0
            ? 0
            : ((item.total_potential / item.total) * 100).toFixed(2)}
          %)
        </TextApp>
        <Block
          h={7}
          w={(item.total_potential / item.total) * 250}
          _background={
            item.total_potential / item.total === 0 || item.total === 0
              ? 'white'
              : item.color
          }
          marT={5}
        />
      </Block>
    </Block>
  );
}

export function FooterItemCustomerOverview({total, totalPotential}: Props) {
  return (
    <Block row borderBW={1} borderC="gray">
      <Block alignCenter w={150} borderRW={1} borderC="gray" pad={10}>
        <TextApp bold>{AppLang('tong_cong')}:</TextApp>
      </Block>
      <Block alignCenter w={250} borderRW={1} borderC="gray" pad={10}>
        <TextApp bold>{total}</TextApp>
      </Block>
      <Block alignCenter w={250} pad={10}>
        <TextApp bold>{totalPotential}</TextApp>
      </Block>
    </Block>
  );
}

export function HeaderItemCustomerOverview({total, totalPotential}: Props) {
  return (
    <Block row borderBW={1} borderTW={1} borderC="gray">
      <Block alignCenter w={150} borderRW={1} borderC="gray" pad={10}>
        <TextApp bold>{AppLang('don_vi')}</TextApp>
      </Block>
      <Block alignCenter w={250} borderRW={1} borderC="gray" pad={10}>
        <TextApp bold>{AppLang('tong_phat_sinh')}</TextApp>
      </Block>
      <Block alignCenter w={250} pad={10}>
        <TextApp bold>{AppLang('khach_hang_tiem_nang')}</TextApp>
      </Block>
    </Block>
  );
}
