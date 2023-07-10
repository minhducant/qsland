import * as React from 'react';
import moment from 'moment';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';

import {AppLang} from '@assets/langs';
import {AppColor} from '@assets/colors';
import InputDateTwo from '../components/InputDateTwo';
import {Block, TextApp, Touch} from '@lib/components';
import {
  useStaticCusStatus,
  useSaleStaticCusStatus,
  useCompanyStaticCusStatus,
} from '@service/store';
import PieChart from './PieChart';
import CustomerStatusDetail from './CustomerStatusDetail';
import {STATUS_INTERACTIVE} from '@screen/app/ManageCustomer/components/@Status';

const WIDTH = Dimensions.get('screen').width;

const CustomerStatus = (props: any, ref: any) => {
  const scrollRef = React.useRef<ScrollView>(null);
  const {dataAll, updateParamsRef, onRefresh} = useStaticCusStatus();
  const {dataSale, updateParamsRefSale, onRefreshSale} =
    useSaleStaticCusStatus();
  const {dataCompany, updateParamsRefCompany, onRefreshCompany} =
    useCompanyStaticCusStatus();
  const pieChartDataAll = dataAll?.map((item: any) => ({
    status: STATUS_INTERACTIVE[item.status].label,
    color: STATUS_INTERACTIVE[item.status].color,
    count: item.count,
  }));
  const pieChartDataSale = dataSale?.map((item: any) => ({
    status: STATUS_INTERACTIVE[item.status].label,
    color: STATUS_INTERACTIVE[item.status].color,
    count: item.count,
  }));
  const pieChartDataCompany = dataCompany?.map((item: any) => ({
    status: STATUS_INTERACTIVE[item.status].label,
    color: STATUS_INTERACTIVE[item.status].color,
    count: item.count,
  }));
  const [typeDetail, setTypeDetail] = React.useState('chi_tiet');
  const [tab, setTab] = React.useState([
    {active: true, create_type: null, name: AppLang('tat_ca')},
    {active: false, create_type: 2, name: AppLang('sale_khai_thac')},
    {active: false, create_type: 1, name: AppLang('cong_ty')},
  ]);

  React.useImperativeHandle(ref, () => ({
    onRefreshList() {
      onRefresh();
      onRefreshSale();
      onRefreshCompany();
    },
  }));

  const onChangeTab = (activeTab: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: activeTab * (WIDTH - 40),
        y: 0,
        animated: true,
      });
      const tabFormat = [...tab];
      tabFormat.forEach((it, idx) => {
        if (idx === activeTab) {
          it.active = true;
        } else {
          it.active = false;
        }
      });
      setTab(tabFormat);
    }
  };

  const onScrollEnd = (event: {nativeEvent: {contentOffset: {x: any}}}) => {
    const x = event.nativeEvent.contentOffset.x;
    const activeTab = Math.round(x / WIDTH);
    const tabFormat = [...tab];
    tabFormat.forEach((it, idx) => {
      if (idx === activeTab) {
        it.active = true;
      } else {
        it.active = false;
      }
    });
    setTab(tabFormat);
  };

  const onChangeDate = (dateFrom: any, dateTo: any, option: any) => {
    updateParamsRef({
      from: moment(dateFrom).format('YYYY-MM-DD 00:00:00'),
      to: moment(dateTo).format('YYYY-MM-DD 00:00:00'),
      ...option,
    });
    onRefresh();
    updateParamsRefSale({
      from: moment(dateFrom).format('YYYY-MM-DD 00:00:00'),
      to: moment(dateTo).format('YYYY-MM-DD 00:00:00'),
      create_type: 2,
      ...option,
    });
    onRefreshSale();
    updateParamsRefCompany({
      from: moment(dateFrom).format('YYYY-MM-DD 00:00:00'),
      to: moment(dateTo).format('YYYY-MM-DD 00:00:00'),
      create_type: 1,
      ...option,
    });
    onRefreshCompany();
  };

  const onPress = () => {
    typeDetail === 'chi_tiet'
      ? setTypeDetail('bieu_do')
      : setTypeDetail('chi_tiet');
  };

  return (
    <Block
      mar10
      pad10
      style={styles.viewCustomerStatus}
      background={['white']}
      borderR={10}>
      <TextApp bold>{AppLang('tinh_trang_khach_hang')}</TextApp>
      <Block
        flex1
        row
        borderW={1}
        marT10
        borderR={10}
        _background={'#3CB588'}
        borderC="#0298B0">
        {tab.map((item, idx) => {
          return (
            <Touch
              key={idx + 1}
              borderR={10}
              onPress={() => onChangeTab(idx)}
              alignCenter
              justifyBetween
              flex1
              pad10
              _background={item.active ? 'white' : '#3CB588'}>
              <TextApp color={item.active ? 'black' : 'white'}>
                {item.name}
              </TextApp>
            </Touch>
          );
        })}
      </Block>
      <InputDateTwo
        onChange={onChangeDate}
        type={typeDetail}
        onChangeView={onPress}
        isManagersChart={props.isManagersChart}
        dataPermissions={props.dataPermissions}
      />
      <ScrollView
        scrollEnabled={true}
        horizontal
        pagingEnabled
        ref={scrollRef}
        onMomentumScrollEnd={onScrollEnd}
        showsHorizontalScrollIndicator={false}>
        <Block w={WIDTH - 40}>
          {typeDetail === 'chi_tiet' ? (
            <PieChart data={pieChartDataAll} />
          ) : (
            <CustomerStatusDetail data={pieChartDataAll} />
          )}
        </Block>
        <Block w={WIDTH - 40}>
          {typeDetail === 'chi_tiet' ? (
            <PieChart data={pieChartDataSale} />
          ) : (
            <CustomerStatusDetail data={pieChartDataSale} />
          )}
        </Block>
        <Block w={WIDTH - 40}>
          {typeDetail === 'chi_tiet' ? (
            <PieChart data={pieChartDataCompany} />
          ) : (
            <CustomerStatusDetail data={pieChartDataCompany} />
          )}
        </Block>
      </ScrollView>
    </Block>
  );
};
export default React.forwardRef(CustomerStatus);

const styles = StyleSheet.create({
  viewCustomerStatus: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
