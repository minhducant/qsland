import * as React from 'react';
import { FlatList } from 'react-native';

import { AppLang } from '@assets/langs';
import { Block, TextApp } from '@lib/components';

const CustomerStatusDetail = ({ data }: any) => {
  const total = data.reduce(
    (sum: any, item: { count: any }) => sum + item.count,
    0,
  );
  const renderItem = ({ item, index }: any) => {
    return (
      <Block row borderBW={1} pad={10} borderC="gray">
        <Block row alignCenter marB={5} key={item.status} flex={4}>
          <Block h={10} w={10} _background={item.color} marR={5} borderR={5} />
          <TextApp>{item.status}</TextApp>
        </Block>
        <Block flex={3} alignCenter>
          <TextApp>{item.count}</TextApp>
        </Block>
        <Block flex={3} alignCenter>
          <TextApp>
            {parseFloat(((item.count / total) * 100).toFixed(2))}%
          </TextApp>
        </Block>
      </Block>
    );
  };
  const headerList = () => {
    return (
      <Block row borderBW={1} pad={10} borderC="gray">
        <Block row alignCenter marB={5} flex={4}>
          <TextApp bold>{AppLang('tinh_trang')}</TextApp>
        </Block>
        <Block flex={3} alignCenter>
          <TextApp bold>{AppLang('so_luong')}</TextApp>
        </Block>
        <Block flex={3} alignCenter>
          <TextApp bold>{AppLang('ty_le')}</TextApp>
        </Block>
      </Block>
    );
  };

  const footerList = () => {
    return (
      <Block row pad={10}>
        <Block row alignCenter marB={5} flex={4}>
          <TextApp bold>{AppLang('tong_cong')} :</TextApp>
        </Block>
        <Block flex={3} alignCenter>
          <TextApp bold>{total}</TextApp>
        </Block>
        <Block flex={3} />
      </Block>
    )
  }
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      keyExtractor={(_item, index) => `${index}`}
      renderItem={renderItem}
      ListHeaderComponent={headerList}
      ListFooterComponent={footerList}
      contentContainerStyle={{ minHeight: 200 }}
    />
  );
};

export default CustomerStatusDetail;
