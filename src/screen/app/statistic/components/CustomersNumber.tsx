import * as React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {AppLang} from '@assets/langs';
import {Block, TextApp, Touch} from '@lib/components';
import {useCountAllottedCustomersOfSale} from '@service/store';

const CustomerNumber = (props: any, ref: any) => {
  const {count, onRefresh} = useCountAllottedCustomersOfSale();
  const customerInformation = [
    {label: AppLang('khach_hang_duoc_phan_bo'), qty: count?.allottedCustomers},
    {
      label: AppLang('yeu_cau_giai_trinh'),
      qty: count?.askForExplanation,
    },
    {
      label: AppLang('giao_dich_dang_xu_ly'),
      qty: count?.transactionsAreProcessed,
    },
  ];

  React.useImperativeHandle(ref, () => ({
    onRefreshList() {
      onRefresh();
    },
  }));

  return (
    <Block>
      {customerInformation?.map((item: any, index: number) => (
        <Touch key={index} disabled>
          <Block
            borderW={1}
            marH10
            pad10
            borderR={10}
            borderC="#6A95CF"
            marB={20}>
            <TextApp>{item.label}</TextApp>
          </Block>
          <LinearGradient
            colors={['#0298B0', '#7CD858']}
            style={styles.viewQty}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TextApp color="white" size={15}>
              {item.qty || 0}
            </TextApp>
          </LinearGradient>
        </Touch>
      ))}
    </Block>
  );
};

export default React.forwardRef(CustomerNumber);

const styles = StyleSheet.create({
  viewQty: {
    bottom: 16.5,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99999999,
  },
});
