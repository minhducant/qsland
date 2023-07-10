import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {StyleSheet, ScrollView, FlatList, Dimensions} from 'react-native';

import {
  useCountCustomerOverviewOfLead,
  useCountCustomerOverviewOfLeadSale,
  useCountCustomerOverviewOfLeadCompany,
} from '@service/store';
import {
  HeaderItemCustomerOverview,
  ItemCustomerOverview,
  FooterItemCustomerOverview,
} from './ItemCustomerOverview';
import {AppLang} from '@assets/langs';
import {useListStaff} from '@service/hook';
import InputDateTwo from '../components/InputDateTwo';
import {Block, TextApp, Touch} from '@lib/components';
import {formatFilterArray, formatOverviewList, getTotal} from '../utils/index';

const WIDTH = Dimensions.get('screen').width;

const CustomerOverview = (props: any, ref: any) => {
  const scrollRef = React.useRef<ScrollView>(null);
  const staffRef = React.useRef<any>(null);
  const staffSaleRef = React.useRef<any>(null);
  const staffCompanyRef = React.useRef<any>(null);
  const {data: ListStaff, onRefresh: onRefreshListStaff} = useListStaff();
  const {dataOverviewLead, updateParamsRef, onRefresh} =
    useCountCustomerOverviewOfLead();
  const {dataOverviewLeadSale, updateParamsLeadSaleRef, onRefreshLeadSale} =
    useCountCustomerOverviewOfLeadSale();
  const {
    dataOverviewLeadCompany,
    updateParamsLeadCompanyRef,
    onRefreshLeadCompany,
  } = useCountCustomerOverviewOfLeadCompany();

  const listOverview = formatOverviewList(dataOverviewLead, ListStaff);
  const listOverviewSale = formatOverviewList(dataOverviewLeadSale, ListStaff);
  const listOverviewCompany = formatOverviewList(
    dataOverviewLeadCompany,
    ListStaff,
  );

  const total = getTotal(listOverview, 'total');
  const totalPotential = getTotal(listOverview, 'total_potential');
  const totalSale = getTotal(listOverviewSale, 'total');
  const totalPotentialSale = getTotal(listOverviewSale, 'total_potential');
  const totalCompany = getTotal(listOverviewCompany, 'total');
  const totalPotentialCompany = getTotal(
    listOverviewCompany,
    'total_potential',
  );

  const [tabs, setTabs] = useState([
    {active: true, create_type: null, name: AppLang('tat_ca')},
    {active: false, create_type: 2, name: AppLang('sale_khai_thac')},
    {active: false, create_type: 1, name: AppLang('cong_ty')},
  ]);

  const onChangeTab = (activeTab: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: activeTab * (WIDTH - 40),
        y: 0,
        animated: true,
      });
      const tabFormat = [...tabs];
      tabFormat.forEach((it, idx) => {
        if (idx === activeTab) {
          it.active = true;
        } else {
          it.active = false;
        }
      });
      setTabs(tabFormat);
    }
  };

  const onChange = (dateFrom: any, dateTo: any) => {
    const {date, staff} = staffRef.current.getValue();
    updateParamsRef({
      from: moment(date.from).format('YYYY-MM-DD 00:00:00'),
      to: moment(date.to).format('YYYY-MM-DD 00:00:00'),
      user_id_sale: staff.value,
    });
    onRefresh();
  };

  const onChangeSale = (dateFrom: any, dateTo: any) => {
    const {date, staff} = staffSaleRef.current.getValue();
    updateParamsLeadSaleRef({
      from: moment(date.from).format('YYYY-MM-DD 00:00:00'),
      to: moment(date.to).format('YYYY-MM-DD 00:00:00'),
      user_id_sale: staff.value,
      create_type: 2,
    });
    onRefreshLeadSale();
  };

  const onChangeCompany = (dateFrom: any, dateTo: any) => {
    const {date, staff} = staffCompanyRef.current.getValue();
    updateParamsLeadCompanyRef({
      from: moment(date.from).format('YYYY-MM-DD 00:00:00'),
      to: moment(date.to).format('YYYY-MM-DD 00:00:00'),
      user_id_sale: staff.value,
      create_type: 1,
    });
    onRefreshLeadCompany();
  };

  React.useImperativeHandle(ref, () => ({
    onRefreshList() {
      onRefresh();
      onRefreshLeadCompany();
      onRefreshLeadSale();
    },
  }));

  const renderItem = ({item, index}: any) => {
    return <ItemCustomerOverview item={item} index={index} total={total} />;
  };

  const renderItemSale = ({item, index}: any) => {
    return <ItemCustomerOverview item={item} index={index} total={totalSale} />;
  };

  const renderItemCompany = ({item, index}: any) => {
    return (
      <ItemCustomerOverview item={item} index={index} total={totalCompany} />
    );
  };

  const headerList = () => {
    return <HeaderItemCustomerOverview />;
  };

  const footerList = () => {
    return (
      <FooterItemCustomerOverview
        total={total}
        totalPotential={totalPotential}
      />
    );
  };

  const footerListSale = () => {
    return (
      <FooterItemCustomerOverview
        total={totalSale}
        totalPotential={totalPotentialSale}
      />
    );
  };

  const footerListCompany = () => {
    return (
      <FooterItemCustomerOverview
        total={totalCompany}
        totalPotential={totalPotentialCompany}
      />
    );
  };

  return (
    <Block
      mar10
      pad10
      style={styles.viewCustomerStatus}
      background={['white']}
      borderR={10}>
      <TextApp bold>{AppLang('tong_quan_khach_hang')}</TextApp>
      <Block
        flex1
        row
        borderW={1}
        marT10
        borderR={10}
        _background={'#3CB588'}
        borderC="#0298B0">
        {tabs.map((item, idx) => (
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
        ))}
      </Block>
      <ScrollView
        scrollEnabled={false}
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}>
        <Block w={WIDTH - 40}>
          <InputDateTwo
            ref={staffRef}
            onChange={onChange}
            type="tat_ca_sale"
            listStaff={formatFilterArray(listOverview)}
          />
          <ScrollView horizontal>
            <FlatList
              scrollEnabled={false}
              data={listOverview}
              renderItem={renderItem}
              ListHeaderComponent={headerList}
              ListFooterComponent={footerList}
              keyExtractor={(_item, index) => `${index}`}
            />
          </ScrollView>
        </Block>
        <Block w={WIDTH - 40}>
          <InputDateTwo
            ref={staffSaleRef}
            onChange={onChangeSale}
            type="tat_ca_sale"
            listStaff={formatFilterArray(listOverviewSale)}
          />
          <ScrollView horizontal>
            <FlatList
              scrollEnabled={false}
              data={listOverviewSale}
              renderItem={renderItemSale}
              ListHeaderComponent={headerList}
              ListFooterComponent={footerListSale}
              keyExtractor={(_item, index) => `${index}`}
            />
          </ScrollView>
        </Block>
        <Block w={WIDTH - 40}>
          <InputDateTwo
            ref={staffCompanyRef}
            onChange={onChangeCompany}
            type="tat_ca_sale"
            listStaff={formatFilterArray(listOverviewCompany)}
          />
          <ScrollView horizontal>
            <FlatList
              scrollEnabled={false}
              data={listOverviewCompany}
              renderItem={renderItemCompany}
              ListHeaderComponent={headerList}
              ListFooterComponent={footerListCompany}
              keyExtractor={(_item, index) => `${index}`}
            />
          </ScrollView>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default React.forwardRef(CustomerOverview);

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
