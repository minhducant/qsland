import React, { useState } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';

import {
  useCountCustomerOverviewOfManager,
  useCountCustomerOverviewOfManagerSale,
  useCountCustomerOverviewOfManagerCompany,
} from '@service/store';
import {
  HeaderItemCustomerOverview,
  ItemCustomerOverview,
  FooterItemCustomerOverview,
} from './ItemCustomerOverview';
import { AppLang } from '@assets/langs';
import { getTotal, checkPermission, formatOverviewList } from '../utils/index';
import { useListGroupSale } from '@service/hook';
import InputDateTwo from '../components/InputDateTwo';
import { Block, TextApp, Touch } from '@lib/components';
import { usePagerView } from '@components/layout/PagerView';
import { STATUS_INTERACTIVE } from '@screen/app/ManageCustomer/components/@Status';
import { Log } from '@utils/Log';
import { useRef } from 'react';
import { AppColor } from '@assets/colors';

const WIDTH = Dimensions.get('screen').width;

const CustomerOverviewManager = (props: any, ref: any) => {
  const scrollRef = React.useRef<ScrollView>(null);
  const staffRef = React.useRef<any>(null);
  const staffSaleRef = React.useRef<any>(null);
  const staffCompanyRef = React.useRef<any>(null);
  const { data: ListGroupSale } = useListGroupSale();
  const { dataOverviewManager, updateParamsRef, onRefresh } =
    useCountCustomerOverviewOfManager();
  const {
    dataOverviewManagerSale,
    updateParamsManagerSaleRef,
    onRefreshManagerSale,
  } = useCountCustomerOverviewOfManagerSale();
  const {
    dataOverviewManagerCompany,
    updateParamsLeadCompanyRef,
    onRefreshManagerCompany,
  } = useCountCustomerOverviewOfManagerCompany();
  const listOverview: any = formatOverviewList(
    dataOverviewManager,
    ListGroupSale,
  );
  const listOverviewSale: any = formatOverviewList(
    dataOverviewManagerSale,
    ListGroupSale,
  );
  const listOverviewCompany: any = formatOverviewList(
    dataOverviewManagerCompany,
    ListGroupSale,
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
    { active: true, create_type: null, name: AppLang('tat_ca') },
    { active: false, create_type: 2, name: AppLang('sale_khai_thac') },
    { active: false, create_type: 1, name: AppLang('cong_ty') },
  ]);

  React.useImperativeHandle(ref, () => ({
    onRefreshList() {
      onRefresh();
      onRefreshManagerCompany();
      onRefreshManagerSale();
    },
  }));

  const onChange = (from: any, to: any, data: any) => {
    const { date } = staffRef.current.getValue();
    updateParamsRef({
      from: moment(date.from).format('YYYY-MM-DD 00:00:00'),
      to: moment(date.to).format('YYYY-MM-DD 00:00:00'),
      ...data,
    });
    onRefresh();
    updateParamsManagerSaleRef({
      from: moment(date.from).format('YYYY-MM-DD 00:00:00'),
      to: moment(date.to).format('YYYY-MM-DD 00:00:00'),
      create_type: 2,
      ...data,
    });
    onRefreshManagerSale();
    updateParamsLeadCompanyRef({
      from: moment(date.from).format('YYYY-MM-DD 00:00:00'),
      to: moment(date.to).format('YYYY-MM-DD 00:00:00'),
      create_type: 1,
      ...data,
    });
    onRefreshManagerCompany();
  };

  const renderItem = ({ item, index }: any) => {
    return <ItemCustomerOverview item={item} index={index} total={total} />;
  };

  const renderItemSale = ({ item, index }: any) => {
    return <ItemCustomerOverview item={item} index={index} total={totalSale} />;
  };

  const renderItemCompany = ({ item, index }: any) => {
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
  const translateX = useRef(new Animated.Value(0)).current;
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;

  return (
    <Block
      mar10
      pad10
      style={styles.viewCustomerStatus}
      background={['white']}
      borderR={10}>
      <TextApp bold>
        {AppLang('tong_quan_khach_hang') + (__DEV__ ? ' (Admin)' : '')}
      </TextApp>
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
      <InputDateTwo
        type={'filter'}
        ref={staffRef}
        dataPermissions={props.dataPermissions}
        onChange={onChange}
      />
      <Block>
        <ScrollView
          scrollEnabled={false}
          horizontal
          pagingEnabled
          ref={scrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          <Block w={WIDTH - 40}>
            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: translateX } } }],
                { useNativeDriver: true },
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                scrollEnabled={false}
                data={listOverview}
                renderItem={renderItem}
                ListHeaderComponent={headerList}
                ListFooterComponent={footerList}
                keyExtractor={(_item, index) => `${index}`}
                contentContainerStyle={{ paddingBottom: 15 }}
              />
            </Animated.ScrollView>
            <Animated.View
              style={[
                styles.horizontal,
                { transform: [{ translateX }] },
              ]}
            />
          </Block>
          <Block w={WIDTH - 40}>
            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: translateX1 } } }],
                { useNativeDriver: true },
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                scrollEnabled={false}
                data={listOverviewSale}
                renderItem={renderItemSale}
                ListHeaderComponent={headerList}
                ListFooterComponent={footerListSale}
                keyExtractor={(_item, index) => `${index}`}
                contentContainerStyle={{ paddingBottom: 15 }}
              />
            </Animated.ScrollView>
            <Animated.View
              style={[
                styles.horizontal,
                { transform: [{ translateX: translateX1 }] },
              ]}
            />
          </Block>
          <Block w={WIDTH - 40}>
            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: translateX2 } } }],
                { useNativeDriver: true },
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                scrollEnabled={false}
                data={listOverviewCompany}
                renderItem={renderItemCompany}
                ListHeaderComponent={headerList}
                ListFooterComponent={footerListCompany}
                keyExtractor={(_item, index) => `${index}`}
                contentContainerStyle={{ paddingBottom: 15 }}
              />
            </Animated.ScrollView>
            <Animated.View
              style={[
                styles.horizontal,
                { transform: [{ translateX: translateX2 }] },
              ]}
            />
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

export default React.forwardRef(CustomerOverviewManager);

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
  horizontal: {
    height: 4,
    width: Dimensions.get('screen').width * 0.2,
    backgroundColor: '#7CD858',
    borderRadius: 5,
  },
});
