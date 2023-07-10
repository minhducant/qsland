import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import moment from 'moment';

import {AppLang} from '@assets/langs';
import {AppColor} from '@assets/colors';
import {checkPermission} from '../utils/index';
import ModalInputMonth from './ModalInputMonth';
import ModalFilterAdmin from './ModalFilterAdmin';
import {Block, TextApp, Touch, IconApp} from '@lib/components';

type Props = {
  onFilter?: any;
  onPress?: any;
  dataPermissions?: any;
};

const MonthSelectorComponent = forwardRef(
  ({onFilter, onPress, dataPermissions}: Props, ref) => {
    const modalRef = React.useRef<any>(null);
    const monthSelectorRef = useRef<any>(null);
    const [selectedMonth, setSelectedMonth] = useState<Date | string>(
      new Date(),
    );

    const handleSelectMonth = (selectedDate: Date) => {
      setSelectedMonth(selectedDate);
      onFilter(selectedDate);
    };

    const handleOpenMonthSelector = () => {
      if (monthSelectorRef.current) {
        monthSelectorRef.current.open();
      }
    };

    const onSelectFilter = async (data: any) => {
      onFilter(selectedMonth, data);
    };

    return (
      <Block flex1 pad={10}>
        <Block row style={{justifyContent: 'space-between'}}>
          <Touch row onPress={handleOpenMonthSelector}>
            <IconApp
              name={'calendar-outline'}
              size={18}
              color={AppColor('primary')}
            />
            <TextApp style={{marginLeft: 5}} color={AppColor('primary')}>
              Tháng {moment(selectedMonth).format('MM')} năm{' '}
              {moment(selectedMonth).format('YYYY')}
            </TextApp>
          </Touch>
          {(checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
            checkPermission(dataPermissions, 'truongphong') === 'co_quyen' ||
            checkPermission(dataPermissions, 'truongnhom') === 'co_quyen') && (
            <Touch
              row
              onPress={() => {
                modalRef.current?.open();
              }}>
              <IconApp
                name={'filter'}
                size={18}
                color={AppColor('txt_origin')}
              />
              <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
                {AppLang('loc')}
              </TextApp>
            </Touch>
          )}
        </Block>
        {(checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
          checkPermission(dataPermissions, 'truongphong') === 'co_quyen' ||
          checkPermission(dataPermissions, 'truongnhom')) && (
          <ModalFilterAdmin
            ref={modalRef}
            onSelected={onSelectFilter}
            dataPermissions={dataPermissions}
          />
        )}
        <ModalInputMonth
          ref={monthSelectorRef}
          onChangeDate={handleSelectMonth}
        />
      </Block>
    );
  },
);

export default MonthSelectorComponent;
