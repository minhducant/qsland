import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import moment from 'moment';

import {AppLang} from '@assets/langs';
import {AppColor} from '@assets/colors';
import ModalFilterAdmin from './ModalFilterAdmin';
import ActionSheetIos from '@components/Sheet/ActionSheetIos';
import {Block, TextApp, Touch, IconApp} from '@lib/components';
import {ModalDateTwo} from '@components/selected/Dates/ModalDateTwo';

type Props = {
  dateInit?: {from: string; to: string};
  onChange: any;
  type?: string;
  onPress?: any;
  listStaff?: any;
  onChangeView?: any;
  listGroup?: any;
  create_type?: any;
  isManagersChart?: boolean;
  dataPermissions?: any;
};

const InputDateTwo = forwardRef(
  (
    {
      onChange,
      type,
      listStaff = [],
      onChangeView,
      isManagersChart,
      dataPermissions = [],
    }: Props,
    ref,
  ) => {
    const datePickerRef = useRef<any>(null);
    const modalRef = React.useRef<any>(null);
    const optionPickerRef = React.useRef<any>(null);
    const [date, setDate] = useState({
      from: moment().startOf('month').toISOString(),
      to: moment().endOf('month').toISOString(),
    });
    const [staff, setStaff] = useState({
      name: AppLang('tat_ca_sale'),
      value: null,
    });

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return {
          date,
          staff,
        };
      },
    }));

    const openDatePicker = () => {
      if (datePickerRef.current) {
        datePickerRef.current.open();
      }
    };

    const onSelectDate = async (dateFrom: any, dateTo: any) => {
      await setDate({
        from: moment(dateFrom).toISOString(),
        to: moment(dateTo).toISOString(),
      });
      onChange(dateFrom, dateTo);
    };

    const onSelectOption = async (key: any, data: any) => {
      await setStaff(data);
      const params = {user_id_sale: data.value};
      onChange(params);
    };

    const onSelectFilter = async (data: any) => {
      onChange(
        moment(date.from).toISOString(),
        moment(date.to).toISOString(),
        data,
      );
    };

    const onPress = () => {
      type === 'chi_tiet' || type === 'bieu_do'
        ? onChangeView()
        : type === 'tat_ca_sale'
        ? optionPickerRef.current?.open()
        : modalRef.current?.open();
    };
    const renderRight = () => {
      switch (type) {
        case 'chi_tiet':
          return (
            <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
              {AppLang('chi_tiet')} {'>>'}
            </TextApp>
          );
        case 'bieu_do':
          return (
            <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
              {AppLang('bieu_do')} {'>>'}
            </TextApp>
          );
        case 'tat_ca_sale':
          return (
            <>
              <TextApp style={{marginRight: 5}} color={AppColor('txt_origin')}>
                {staff.name}
              </TextApp>
              <IconApp
                name={'caret-down-outline'}
                size={18}
                color={AppColor('txt_origin')}
              />
            </>
          );
        case 'filter':
          return (
            <>
              <IconApp
                name={'filter'}
                size={18}
                color={AppColor('txt_origin')}
              />
              <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
                {AppLang('loc')}
              </TextApp>
            </>
          );
        default:
          return <Block />;
      }
    };
    const renderViewType = () => {
      switch (type) {
        case 'chi_tiet':
          return (
            <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
              {AppLang('chi_tiet')} {'>>'}
            </TextApp>
          );
        case 'bieu_do':
          return (
            <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
              {AppLang('bieu_do')} {'>>'}
            </TextApp>
          );
        default:
          return <Block />;
      }
    };

    return (
      <Block flex1 pad={10} marV5>
        <Block row style={{justifyContent: 'space-between'}}>
          <Touch row onPress={openDatePicker}>
            <IconApp
              name={'calendar-outline'}
              size={18}
              color={AppColor('primary')}
            />
            <TextApp style={{marginLeft: 5}} color={AppColor('primary')}>
              {moment(date.from).format('DD/MM/YYYY')} -{' '}
              {moment(date.to).format('DD/MM/YYYY')}
            </TextApp>
          </Touch>
          {isManagersChart ? (
            <Touch
              row
              onPress={() => modalRef.current?.open()}
              justifyContent="flex-end">
              <IconApp
                name={'filter'}
                size={18}
                color={AppColor('txt_origin')}
              />
              <TextApp style={{marginLeft: 5}} color={AppColor('txt_origin')}>
                {AppLang('loc')}
              </TextApp>
            </Touch>
          ) : (
            <Touch row onPress={onPress}>
              {renderRight()}
            </Touch>
          )}
        </Block>
        {isManagersChart && (
          <Touch
            row
            marV10
            padR={5}
            onPress={() => onChangeView()}
            justifyContent="flex-end">
            {renderViewType()}
          </Touch>
        )}
        <ModalDateTwo
          ref={datePickerRef}
          dateInit={date}
          onSelectDate={onSelectDate}
        />
        {type === 'tat_ca_sale' && (
          <ActionSheetIos
            onPressButton={value =>
              onSelectOption('staff', {
                value: value?.id,
                name: value?.full_name,
              })
            }
            keyValue="full_name"
            options={listStaff}
            ref={optionPickerRef}
            onCancel={() => optionPickerRef.current?.close()}
            textCancel={AppLang('huy')}
          />
        )}
        {(type === 'filter' || isManagersChart) && (
          <ModalFilterAdmin
            ref={modalRef}
            onSelected={onSelectFilter}
            dataPermissions={dataPermissions}
          />
        )}
      </Block>
    );
  },
);

export default InputDateTwo;
