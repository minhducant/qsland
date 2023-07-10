import React, {useEffect, useRef, useCallback, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useIsFocused, useRoute} from '@react-navigation/native';

import {openDrawer} from '@navigation';
import {AppColor} from '@lib/utils';
import {AppLang} from '@assets/langs';
import {checkPermission} from '../utils/index';
import {useGetListPermission} from '@service/store';
import ScreenApp from '@components/layout/ScreenApp';
import LineChartComponent from '../components/LineChart';
import CustomerNumber from '../components/CustomersNumber';
import CustomerStatus from '../components/CustomerStatus';
import CustomerOverview from '../components/CustomerOverview';
import {BottomAnimate} from '@screen/app/dashboard/container/BottomHome';
import CustomerOverviewManager from '../components/CustomerOverviewManager';

const ScreenStatistic = ({route}: any) => {
  const {dataPermissions, onRefresh} = useGetListPermission();
  const {name} = useRoute();
  const isFocused = useIsFocused();
  const lineChartRef = useRef<any>();
  const customerNumberRef = useRef<any>();
  const customerStatusRef = useRef<any>();
  const customerOverviewRef = useRef<any>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      BottomAnimate.animate(name);
      handleRefresh();
    }
  }, [isFocused]);

  const handleRefresh = async () => {
    onRefresh();
    await lineChartRef.current.onRefreshList();
    if (customerNumberRef.current) {
      customerNumberRef.current.onRefreshList();
    }
    if (customerOverviewRef.current) {
      customerOverviewRef.current.onRefreshList();
    }
    await customerStatusRef.current.onRefreshList();
    setRefreshing(false);
  };

  const renderCustomerNumber = useCallback(() => {
    if (dataPermissions.length === 1 && dataPermissions[0].id === null) {
      return <></>;
    }
    const hasPermission =
      (checkPermission(dataPermissions, 'giamdocsan') === 'khong_quyen' &&
        checkPermission(dataPermissions, 'truongphong') === 'khong_quyen' &&
        checkPermission(dataPermissions, 'truongnhom') === 'khong_quyen') ||
      dataPermissions.length === 0;
    if (hasPermission) {
      return <CustomerNumber ref={customerNumberRef} sale />;
    }
    return null;
  }, [dataPermissions]);

  const renderCustomerOverviewManager = useCallback(() => {
    const hasPermission =
      checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
      checkPermission(dataPermissions, 'truongphong') === 'co_quyen' ||
      checkPermission(dataPermissions, 'truongnhom') === 'co_quyen';
    if (hasPermission) {
      return (
        <CustomerOverviewManager
          ref={customerOverviewRef}
          dataPermissions={dataPermissions}
        />
      );
    }
    return null;
  }, [dataPermissions]);

  return (
    <ScreenApp iconLeft="menu" onLeft={openDrawer} title={AppLang('thong_ke')}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            colors={[AppColor.primary]}
          />
        }>
        <Animatable.View animation="fadeInUp" delay={5} useNativeDriver>
          <LineChartComponent
            ref={lineChartRef}
            dataPermissions={dataPermissions}
          />
          {renderCustomerNumber()}
          {renderCustomerOverviewManager()}
          <CustomerStatus
            ref={customerStatusRef}
            isManagersChart={
              checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
              checkPermission(dataPermissions, 'truongphong') === 'co_quyen' ||
              checkPermission(dataPermissions, 'truongnhom') === 'co_quyen'
            }
            dataPermissions={dataPermissions}
            data
          />
        </Animatable.View>
      </ScrollView>
    </ScreenApp>
  );
};

export default ScreenStatistic;
