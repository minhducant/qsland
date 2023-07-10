import React, {useRef, useState, useImperativeHandle} from 'react';
import moment from 'moment';
import {isEmpty} from 'underscore';

import {
  useListExchange,
  useListGroupSale,
  useListStaffByGroupId,
} from '@service/hook';
import {BottomSheet} from '@components/Sheet';
import {Block, IconC, Touch} from '@mylib/UIKit';
import {TextApp} from '@components';
import {AppLang} from '@assets/langs';
import ButtonApp from '@components/ButtonApp';
import {AppColor} from '@assets/colors';
import {ScrollView} from 'react-native';
import ActionSheetIos from '@components/Sheet/ActionSheetIos';
import {ModalDate} from '@components/selected/Dates/ModalDate';
import {checkPermission} from '../utils/index';

const initOptions = {
  staff: {name: '', value: null},
  exchange: {name: '', value: null},
  groupSale: {name: '', value: null},
};

interface ModalListAdDenyProps {
  onSelected: (e: any) => any;
  type?: 'wait' | 'done' | 'none';
  dataPermissions?: any;
}
const ModalFilterAdmin = React.forwardRef<any, ModalListAdDenyProps>(
  ({onSelected, type, dataPermissions}, ref) => {
    React.useImperativeHandle(ref, () => ({...refRef.current}));
    const refRef = useRef<any>(null);
    const groupSaleRef = useRef<any>(null);
    const fromRef = useRef<any>(null);
    const toRef = useRef<any>(null);
    const staffRef = useRef<any>(null);
    const exchangeRef = useRef<any>(null);
    const [options, setOptions] = useState({...initOptions});
    const ListExchange = useListExchange();
    const ListGroupSale = useListGroupSale();
    const dataGroupSale =
      checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
      checkPermission(dataPermissions, 'truongphong') === 'co_quyen'
        ? Array.from(ListGroupSale.data).filter(
            (i: any) => i.exchange_id == options.exchange?.value,
          )
        : filterList(ListGroupSale.data, dataPermissions, 'group');
    const group_sale_id = options.groupSale?.value ?? null;
    const ListStaffByGroup = useListStaffByGroupId(group_sale_id);

    const onSave = () => {
      onSelected({
        user_id_sale: options.staff.value,
        exchange_id: options.exchange.value,
        group_sale_id: options.groupSale.value,
      });
      refRef.current?.close();
    };

    const onCancel = () => {
      setOptions({...initOptions});
      onSelected &&
        onSelected({
          user_id_sale: null,
          exchange_id: null,
          group_sale_id: null,
        });
      refRef.current?.close();
    };

    const onSelectOption = (key: any, data: any) => {
      if (key == 'exchange') {
        return setOptions(prev => ({
          ...prev,
          [key]: data,
          groupSale: initOptions.groupSale,
          staff: initOptions.staff,
        }));
      }
      if (key == 'groupSale') {
        return setOptions(prev => ({
          ...prev,
          [key]: data,
          staff: initOptions.staff,
        }));
      }
      return setOptions(prev => ({...prev, [key]: data}));
    };

    const onPressGroup = () => {
      checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
      checkPermission(dataPermissions, 'truongphong') === 'co_quyen'
        ? dataGroupSale.length > 0 && groupSaleRef.current?.open()
        : groupSaleRef.current?.open();
    };

    const onPressStaff = () => {
      checkPermission(dataPermissions, 'giamdocsan') === 'khong_quyen' &&
      checkPermission(dataPermissions, 'truongphong') === 'khong_quyen' &&
      options.groupSale.value
        ? (ListStaffByGroup.updateParamInit({group_sale_id}),
          ListStaffByGroup.onRefresh(),
          staffRef.current?.open())
        : options.exchange?.value && options.groupSale.value
        ? (ListStaffByGroup.updateParamInit({group_sale_id}),
          ListStaffByGroup.onRefresh(),
          staffRef.current?.open())
        : null;
    };

    return (
      <BottomSheet
        ref={refRef}
        draggable={false}
        height={'75%'}
        forceInsetBot={{bottom: 'always'}}
        styleLayout={{paddingBottom: 10}}>
        <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
          <TextApp size18 bold center>
            {AppLang('tong_quan_khach_hang')}
          </TextApp>
          <IconC
            name="close-outline"
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              refRef.current?.close();
            }}
          />
        </Block>
        <ScrollView>
          <Block pad10>
            {(checkPermission(dataPermissions, 'giamdocsan') === 'co_quyen' ||
              checkPermission(dataPermissions, 'truongphong') ===
                'co_quyen') && (
              <ItemOption
                value={options.exchange.name}
                title={AppLang('san_phong_kinh_doanh')}
                onPress={() => exchangeRef.current?.open()}
              />
            )}
            <ItemOption
              value={options.groupSale.name}
              title={AppLang('nhom_kinh_doanh')}
              onPress={onPressGroup}
            />
            <ItemOption
              value={options.staff.name}
              title={AppLang('nhan_vien')}
              onPress={onPressStaff}
            />
          </Block>
        </ScrollView>
        <Block row justifyContent="flex-end" padH20 marT10>
          <ButtonApp
            onPress={onCancel}
            title={AppLang('bo_qua')}
            style={{marginRight: 10, width: '30%'}}
            background={AppColor('bg_gray')}
          />
          <ButtonApp
            onPress={onSave}
            title={AppLang('xac_nhan')}
            style={{width: '30%'}}
          />
        </Block>
        {/* // */}
        <ActionSheetIos
          onRefresh={ListExchange.onRefresh}
          onPressButton={value =>
            onSelectOption('exchange', {value: value?.id, name: value?.name})
          }
          options={filterList(ListExchange.data, dataPermissions, 'department')}
          ref={exchangeRef}
          onCancel={() => exchangeRef.current?.close()}
          textCancel={AppLang('huy')}
        />
        <ActionSheetIos
          onRefresh={ListGroupSale.onRefresh}
          onPressButton={value =>
            onSelectOption('groupSale', {value: value?.id, name: value?.name})
          }
          options={dataGroupSale}
          ref={groupSaleRef}
          onCancel={() => groupSaleRef.current?.close()}
          textCancel={AppLang('huy')}
        />
        <ActionSheetIos
          onRefresh={ListStaffByGroup.onRefresh}
          onPressButton={value =>
            onSelectOption('staff', {
              value: value?.user_id,
              name: value?.full_name,
            })
          }
          keyValue="full_name"
          options={ListStaffByGroup.data}
          ref={staffRef}
          onCancel={() => staffRef.current?.close()}
          textCancel={AppLang('huy')}
        />
        <ModalDate
          ref={fromRef}
          onCancel={() => fromRef.current.close()}
          onSelectDate={value =>
            onSelectOption('from', {
              name: moment(value).format('DD-MM-YYYY'),
              value: moment(value).format('YYYY-MM-DD'),
            })
          }
        />
        <ModalDate
          ref={toRef}
          onCancel={() => toRef.current.close()}
          onSelectDate={value =>
            onSelectOption('to', {
              name: moment(value).format('DD-MM-YYYY'),
              value: moment(value).format('YYYY-MM-DD'),
            })
          }
        />
      </BottomSheet>
    );
  },
);
export default ModalFilterAdmin;
export const ItemOption = ({title, value, onPress}: any) => (
  <Block marT10>
    <Block>
      <TextApp bold>{title}</TextApp>
    </Block>
    <Touch
      onPress={onPress}
      minH={45}
      bg="#eee"
      pad5
      marT10
      borderR={5}
      row
      centerH
      padH10>
      {!isEmpty(value) && (
        <TextApp bold color={AppColor('primary')}>
          {value}
        </TextApp>
      )}
      {isEmpty(value) && <TextApp color="gray">{AppLang('chon')}</TextApp>}
      <IconC name="chevron-down-outline" />
    </Touch>
  </Block>
);
export const ItemOptionDate = ({
  title,
  value1,
  value2,
  onPress1,
  onPress2,
}: any) => (
  <Block marT10>
    <Block>
      <TextApp bold>{title}</TextApp>
    </Block>
    <Block minH={45} marT10 row centerH>
      <Touch
        onPress={onPress1}
        flex1
        centerH
        row
        bg="#eee"
        h100
        padH10
        borderR={5}>
        <TextApp>{AppLang('tu')}</TextApp>
        <TextApp bold color={AppColor('primary')}>
          {value1}
        </TextApp>
        <IconC name="calendar-outline" />
      </Touch>
      <Block w={10} />
      <Touch
        onPress={onPress2}
        flex1
        centerH
        row
        bg="#eee"
        h100
        padH10
        borderR={5}>
        <TextApp>{AppLang('den')}</TextApp>
        <TextApp bold color={AppColor('primary')}>
          {value2}
        </TextApp>
        <IconC name="calendar-outline" />
      </Touch>
    </Block>
  </Block>
);

export function filterList(
  ListExchange: any,
  dataPermissions: any,
  scope_type: string,
) {
  const departmentIds = dataPermissions
    ?.filter(
      (permission: {scope_type: string}) =>
        permission.scope_type === scope_type,
    )
    ?.map((permission: {scope_id: any}) => permission.scope_id);

  const filteredListExchange = ListExchange?.filter((exchange: {id: any}) =>
    departmentIds?.includes(exchange.id),
  );

  return filteredListExchange;
}
